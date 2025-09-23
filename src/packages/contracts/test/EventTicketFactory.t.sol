// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/EventTicketFactory.sol";
import "../src/EventTicket.sol";

contract EventTicketFactoryTest is Test {
    EventTicketFactory public factory;
    address public platformFeeRecipient;
    address public organizer;
    address public buyer;

    event EventContractDeployed(
        uint256 indexed eventId,
        address indexed organizer,
        address contractAddress,
        string eventName,
        uint256 totalSupply
    );

    function setUp() public {
        platformFeeRecipient = makeAddr("platformFeeRecipient");
        organizer = makeAddr("organizer");
        buyer = makeAddr("buyer");

        factory = new EventTicketFactory(platformFeeRecipient);
    }

    function testFactoryInitialization() public {
        assertEq(factory.platformFeeRecipient(), platformFeeRecipient);
        assertEq(factory.platformFeeBps(), 250);
        assertEq(factory.nextEventId(), 1);
        assertTrue(factory.implementation() != address(0));
    }

    function testCreateEvent() public {
        vm.startPrank(organizer);

        string memory eventName = "Test Concert";
        string memory eventSymbol = "TCKT";
        uint256 totalSupply = 100;
        uint256 ticketPrice = 0.1 ether;
        uint256 saleStart = block.timestamp + 1 hours;
        uint256 saleEnd = block.timestamp + 1 weeks;
        uint256 eventDate = block.timestamp + 2 weeks;
        string memory baseTokenURI = "https://api.passmint.com/metadata/";

        vm.expectEmit(true, true, false, true);
        emit EventContractDeployed(
            1,
            organizer,
            address(0), // We don't know the address beforehand
            eventName,
            totalSupply
        );

        address eventContract = factory.createEvent(
            eventName,
            eventSymbol,
            totalSupply,
            ticketPrice,
            saleStart,
            saleEnd,
            eventDate,
            baseTokenURI
        );

        vm.stopPrank();

        // Verify contract was deployed and initialized correctly
        assertTrue(eventContract != address(0));
        assertEq(factory.eventContracts(1), eventContract);
        
        address[] memory organizerEvents = factory.getOrganizerEvents(organizer);
        assertEq(organizerEvents.length, 1);
        assertEq(organizerEvents[0], eventContract);

        // Check event contract initialization
        EventTicket eventTicket = EventTicket(eventContract);
        assertEq(eventTicket.name(), eventName);
        assertEq(eventTicket.symbol(), eventSymbol);
        assertEq(eventTicket.owner(), organizer);
        assertEq(eventTicket.totalSupply(), totalSupply);
        assertEq(eventTicket.ticketPrice(), ticketPrice);
    }

    function testCreateEventInvalidInputs() public {
        vm.startPrank(organizer);

        // Test empty event name
        vm.expectRevert("Event name required");
        factory.createEvent(
            "",
            "TCKT",
            100,
            0.1 ether,
            block.timestamp + 1 hours,
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        // Test invalid total supply (too high)
        vm.expectRevert("Invalid total supply");
        factory.createEvent(
            "Test Event",
            "TCKT",
            20000,
            0.1 ether,
            block.timestamp + 1 hours,
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        // Test invalid sale period
        vm.expectRevert("Invalid sale period");
        factory.createEvent(
            "Test Event",
            "TCKT",
            100,
            0.1 ether,
            block.timestamp + 1 weeks,
            block.timestamp + 1 hours, // Sale end before start
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        // Test event before sale ends
        vm.expectRevert("Event must be after sale ends");
        factory.createEvent(
            "Test Event",
            "TCKT",
            100,
            0.1 ether,
            block.timestamp + 1 hours,
            block.timestamp + 2 weeks,
            block.timestamp + 1 weeks, // Event before sale ends
            "https://api.passmint.com/metadata/"
        );

        vm.stopPrank();
    }

    function testMultipleEvents() public {
        vm.startPrank(organizer);

        // Create first event
        address event1 = factory.createEvent(
            "Event 1",
            "EVT1",
            100,
            0.1 ether,
            block.timestamp + 1 hours,
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        // Create second event
        address event2 = factory.createEvent(
            "Event 2",
            "EVT2",
            200,
            0.2 ether,
            block.timestamp + 2 hours,
            block.timestamp + 2 weeks,
            block.timestamp + 3 weeks,
            "https://api.passmint.com/metadata/"
        );

        vm.stopPrank();

        assertEq(factory.nextEventId(), 3);
        assertEq(factory.eventContracts(1), event1);
        assertEq(factory.eventContracts(2), event2);

        address[] memory organizerEvents = factory.getOrganizerEvents(organizer);
        assertEq(organizerEvents.length, 2);
        assertEq(organizerEvents[0], event1);
        assertEq(organizerEvents[1], event2);
    }

    function testSetPlatformFee() public {
        // Only owner can set platform fee
        vm.prank(organizer);
        vm.expectRevert();
        factory.setPlatformFee(500);

        // Owner can set platform fee
        factory.setPlatformFee(500);
        assertEq(factory.platformFeeBps(), 500);

        // Cannot set fee too high
        vm.expectRevert("Fee too high");
        factory.setPlatformFee(1500); // 15% > 10% max
    }

    function testSetPlatformFeeRecipient() public {
        address newRecipient = makeAddr("newRecipient");

        // Only owner can set recipient
        vm.prank(organizer);
        vm.expectRevert();
        factory.setPlatformFeeRecipient(newRecipient);

        // Owner can set recipient
        factory.setPlatformFeeRecipient(newRecipient);
        assertEq(factory.platformFeeRecipient(), newRecipient);

        // Cannot set zero address
        vm.expectRevert("Invalid recipient");
        factory.setPlatformFeeRecipient(address(0));
    }

    function testGetImplementation() public {
        address impl = factory.getImplementation();
        assertTrue(impl != address(0));
        
        // Should be an EventTicket contract
        EventTicket implContract = EventTicket(impl);
        assertEq(implContract.owner(), address(0)); // Implementation should not be initialized
    }
}