// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/EventTicketFactory.sol";
import "../src/EventTicket.sol";
import "../src/ProofOfAttendance.sol";

contract EventTicketTest is Test {
    EventTicketFactory public factory;
    EventTicket public eventTicket;
    address public platformFeeRecipient;
    address public organizer;
    address public buyer;
    address public buyer2;

    uint256 constant TICKET_PRICE = 0.1 ether;
    uint256 constant TOTAL_SUPPLY = 100;

    function setUp() public {
        platformFeeRecipient = makeAddr("platformFeeRecipient");
        organizer = makeAddr("organizer");
        buyer = makeAddr("buyer");
        buyer2 = makeAddr("buyer2");

        // Give test accounts some ETH
        vm.deal(buyer, 10 ether);
        vm.deal(buyer2, 10 ether);
        vm.deal(organizer, 1 ether);

        factory = new EventTicketFactory(platformFeeRecipient);

        // Create an event through the factory
        vm.prank(organizer);
        address eventContract = factory.createEvent(
            "Test Concert",
            "TCKT",
            TOTAL_SUPPLY,
            TICKET_PRICE,
            block.timestamp, // Sale starts now
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        eventTicket = EventTicket(eventContract);
    }

    function testInitialization() public {
        assertEq(eventTicket.name(), "Test Concert");
        assertEq(eventTicket.symbol(), "TCKT");
        assertEq(eventTicket.owner(), organizer);
        assertEq(eventTicket.totalSupply(), TOTAL_SUPPLY);
        assertEq(eventTicket.ticketPrice(), TICKET_PRICE);
        assertEq(eventTicket.tokenCounter(), 1);
        assertEq(eventTicket.availableTickets(), TOTAL_SUPPLY);
    }

    function testMintTicket() public {
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        assertEq(eventTicket.balanceOf(buyer), 1);
        assertEq(eventTicket.ownerOf(1), buyer);
        assertEq(eventTicket.tokenCounter(), 2);
        assertEq(eventTicket.availableTickets(), TOTAL_SUPPLY - 1);
    }

    function testMintMultipleTickets() public {
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE * 3}(3);

        assertEq(eventTicket.balanceOf(buyer), 3);
        assertEq(eventTicket.ownerOf(1), buyer);
        assertEq(eventTicket.ownerOf(2), buyer);
        assertEq(eventTicket.ownerOf(3), buyer);
        assertEq(eventTicket.tokenCounter(), 4);
    }

    function testMintInsufficientPayment() public {
        vm.prank(buyer);
        vm.expectRevert(EventTicket.InsufficientPayment.selector);
        eventTicket.mint{value: TICKET_PRICE - 1}(1);
    }

    function testMintExcessPaymentRefunded() public {
        uint256 initialBalance = buyer.balance;
        uint256 excessPayment = TICKET_PRICE + 0.01 ether;

        vm.prank(buyer);
        eventTicket.mint{value: excessPayment}(1);

        assertEq(eventTicket.balanceOf(buyer), 1);
        assertEq(buyer.balance, initialBalance - TICKET_PRICE); // Excess refunded
    }

    function testMintSaleNotActive() public {
        // Create event with future sale start
        vm.prank(organizer);
        address futureEventContract = factory.createEvent(
            "Future Concert",
            "FCKT",
            100,
            TICKET_PRICE,
            block.timestamp + 1 days, // Sale starts in 1 day
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        EventTicket futureEvent = EventTicket(futureEventContract);

        vm.prank(buyer);
        vm.expectRevert(EventTicket.SaleNotActive.selector);
        futureEvent.mint{value: TICKET_PRICE}(1);
    }

    function testMintMaxSupplyExceeded() public {
        // Create event with small supply
        vm.prank(organizer);
        address smallEventContract = factory.createEvent(
            "Small Concert",
            "SCKT",
            2, // Only 2 tickets
            TICKET_PRICE,
            block.timestamp,
            block.timestamp + 1 weeks,
            block.timestamp + 2 weeks,
            "https://api.passmint.com/metadata/"
        );

        EventTicket smallEvent = EventTicket(smallEventContract);

        // Mint 2 tickets successfully
        vm.prank(buyer);
        smallEvent.mint{value: TICKET_PRICE * 2}(2);

        // Try to mint 1 more - should fail
        vm.prank(buyer2);
        vm.expectRevert(EventTicket.MaxSupplyExceeded.selector);
        smallEvent.mint{value: TICKET_PRICE}(1);
    }

    function testMaxTicketsPerWallet() public {
        // Mint 5 tickets (default max)
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE * 5}(5);

        // Try to mint 1 more - should fail
        vm.prank(buyer);
        vm.expectRevert(EventTicket.MaxTicketsPerWalletExceeded.selector);
        eventTicket.mint{value: TICKET_PRICE}(1);
    }

    function testCheckIn() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Fast forward to event date
        vm.warp(block.timestamp + 2 weeks);

        // Check in ticket
        vm.prank(buyer);
        eventTicket.checkIn(1);

        assertTrue(eventTicket.ticketUsed(1));
        assertFalse(eventTicket.isTicketValid(1)); // Used tickets are not valid
    }

    function testCheckInNotOwner() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Fast forward to event date
        vm.warp(block.timestamp + 2 weeks);

        // Try to check in someone else's ticket
        vm.prank(buyer2);
        vm.expectRevert(EventTicket.NotTokenOwner.selector);
        eventTicket.checkIn(1);
    }

    function testCheckInTooEarly() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Try to check in before event date
        vm.prank(buyer);
        vm.expectRevert(EventTicket.EventNotStarted.selector);
        eventTicket.checkIn(1);
    }

    function testCheckInAlreadyUsed() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Fast forward to event date
        vm.warp(block.timestamp + 2 weeks);

        // Check in ticket
        vm.prank(buyer);
        eventTicket.checkIn(1);

        // Try to check in again
        vm.prank(buyer);
        vm.expectRevert(EventTicket.TicketAlreadyUsed.selector);
        eventTicket.checkIn(1);
    }

    function testOrganizerCheckIn() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Fast forward to event date
        vm.warp(block.timestamp + 2 weeks);

        // Organizer can check in any ticket
        vm.prank(organizer);
        eventTicket.organizerCheckIn(1);

        assertTrue(eventTicket.ticketUsed(1));
    }

    function testWithdraw() public {
        // Mint some tickets to generate revenue
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE * 3}(3);

        vm.prank(buyer2);
        eventTicket.mint{value: TICKET_PRICE * 2}(2);

        uint256 totalRevenue = TICKET_PRICE * 5;
        uint256 platformFee = (totalRevenue * 250) / 10000; // 2.5%
        uint256 organizerAmount = totalRevenue - platformFee;

        // Cannot withdraw before event date
        vm.prank(organizer);
        vm.expectRevert(EventTicket.WithdrawalTooEarly.selector);
        eventTicket.withdraw();

        // Fast forward past event date
        vm.warp(block.timestamp + 2 weeks + 1 days);

        uint256 organizerBalanceBefore = organizer.balance;
        uint256 platformBalanceBefore = platformFeeRecipient.balance;

        // Withdraw proceeds
        vm.prank(organizer);
        eventTicket.withdraw();

        assertEq(organizer.balance, organizerBalanceBefore + organizerAmount);
        assertEq(platformFeeRecipient.balance, platformBalanceBefore + platformFee);
        assertEq(address(eventTicket).balance, 0);
    }

    function testPauseUnpause() public {
        // Only organizer can pause
        vm.prank(buyer);
        vm.expectRevert();
        eventTicket.pause();

        // Organizer can pause
        vm.prank(organizer);
        eventTicket.pause();

        // Cannot mint when paused
        vm.prank(buyer);
        vm.expectRevert();
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Organizer can unpause
        vm.prank(organizer);
        eventTicket.unpause();

        // Can mint after unpause
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);
        assertEq(eventTicket.balanceOf(buyer), 1);
    }

    function testProofOfAttendanceMinting() public {
        // Mint ticket
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Fast forward to event date
        vm.warp(block.timestamp + 2 weeks);

        // Check in ticket (should also mint POA)
        vm.prank(buyer);
        eventTicket.checkIn(1);

        // Verify POA was minted
        ProofOfAttendance poa = eventTicket.proofOfAttendance();
        assertEq(poa.balanceOf(buyer), 1);
        assertEq(poa.ownerOf(1), buyer);

        // Verify mapping
        (bool exists, uint256 poaTokenId) = poa.getPOAForTicket(1);
        assertTrue(exists);
        assertEq(poaTokenId, 1);
        assertEq(poa.getOriginalTicketId(poaTokenId), 1);
    }

    function testTokenURI() public {
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        string memory uri = eventTicket.tokenURI(1);
        assertEq(uri, "https://api.passmint.com/metadata/1");
    }

    function testIsTicketValid() public {
        vm.prank(buyer);
        eventTicket.mint{value: TICKET_PRICE}(1);

        // Initially valid
        assertTrue(eventTicket.isTicketValid(1));

        // Fast forward and check in
        vm.warp(block.timestamp + 2 weeks);
        vm.prank(buyer);
        eventTicket.checkIn(1);

        // No longer valid after use
        assertFalse(eventTicket.isTicketValid(1));
    }
}