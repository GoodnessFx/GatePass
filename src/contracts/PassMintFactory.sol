// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./PassMintTicket.sol";

/**
 * @title PassMintFactory
 * @dev Factory contract for deploying PassMint event ticket contracts
 * Uses minimal proxy pattern for gas-efficient deployments
 */
contract PassMintFactory is Ownable, ReentrancyGuard {
    using Clones for address;

    // Events
    event EventCreated(
        address indexed eventContract,
        address indexed organizer,
        string name,
        uint256 eventDate
    );
    event ImplementationUpdated(address indexed newImplementation);
    event PlatformFeeUpdated(uint256 newFee);

    // State variables
    address public implementation;
    uint256 public platformFee = 0.001 ether; // Fee for creating events
    uint256 public totalEvents;
    
    mapping(address => address[]) public organizerEvents;
    mapping(address => bool) public isPassMintEvent;
    address[] public allEvents;

    struct EventInfo {
        address contractAddress;
        address organizer;
        string name;
        string description;
        uint256 eventDate;
        uint256 createdAt;
        bool verified;
    }
    
    mapping(address => EventInfo) public eventInfo;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /**
     * @dev Create a new event ticket contract
     * @param name Name of the event
     * @param symbol Symbol for the NFT collection
     * @param eventMetadata Event details
     */
    function createEvent(
        string memory name,
        string memory symbol,
        PassMintTicket.EventMetadata memory eventMetadata
    ) external payable nonReentrant returns (address) {
        require(msg.value >= platformFee, "Insufficient platform fee");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(symbol).length > 0, "Symbol cannot be empty");
        require(eventMetadata.eventDate > block.timestamp, "Event date must be in future");

        // Deploy minimal proxy
        address clone = implementation.clone();
        
        // Initialize the clone
        PassMintTicket(clone).initialize(
            name,
            symbol,
            msg.sender,
            eventMetadata
        );

        // Store event information
        eventInfo[clone] = EventInfo({
            contractAddress: clone,
            organizer: msg.sender,
            name: eventMetadata.name,
            description: eventMetadata.description,
            eventDate: eventMetadata.eventDate,
            createdAt: block.timestamp,
            verified: false
        });

        // Update mappings
        organizerEvents[msg.sender].push(clone);
        isPassMintEvent[clone] = true;
        allEvents.push(clone);
        totalEvents++;

        // Refund excess payment
        if (msg.value > platformFee) {
            payable(msg.sender).transfer(msg.value - platformFee);
        }

        emit EventCreated(clone, msg.sender, eventMetadata.name, eventMetadata.eventDate);
        
        return clone;
    }

    /**
     * @dev Batch create multiple events (for enterprise users)
     */
    function batchCreateEvents(
        string[] memory names,
        string[] memory symbols,
        PassMintTicket.EventMetadata[] memory eventMetadatas
    ) external payable nonReentrant returns (address[] memory) {
        uint256 length = names.length;
        require(length == symbols.length && length == eventMetadatas.length, "Array length mismatch");
        require(msg.value >= platformFee * length, "Insufficient platform fee");

        address[] memory deployedEvents = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            address clone = implementation.clone();
            
            PassMintTicket(clone).initialize(
                names[i],
                symbols[i],
                msg.sender,
                eventMetadatas[i]
            );

            eventInfo[clone] = EventInfo({
                contractAddress: clone,
                organizer: msg.sender,
                name: eventMetadatas[i].name,
                description: eventMetadatas[i].description,
                eventDate: eventMetadatas[i].eventDate,
                createdAt: block.timestamp,
                verified: false
            });

            organizerEvents[msg.sender].push(clone);
            isPassMintEvent[clone] = true;
            allEvents.push(clone);
            deployedEvents[i] = clone;

            emit EventCreated(clone, msg.sender, eventMetadatas[i].name, eventMetadatas[i].eventDate);
        }

        totalEvents += length;

        // Refund excess payment
        uint256 totalFee = platformFee * length;
        if (msg.value > totalFee) {
            payable(msg.sender).transfer(msg.value - totalFee);
        }

        return deployedEvents;
    }

    // View functions
    function getOrganizerEvents(address organizer) external view returns (address[] memory) {
        return organizerEvents[organizer];
    }

    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }

    function getEventsByDateRange(
        uint256 startDate,
        uint256 endDate
    ) external view returns (address[] memory) {
        address[] memory filteredEvents = new address[](allEvents.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allEvents.length; i++) {
            EventInfo memory info = eventInfo[allEvents[i]];
            if (info.eventDate >= startDate && info.eventDate <= endDate) {
                filteredEvents[count] = allEvents[i];
                count++;
            }
        }

        // Resize array
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = filteredEvents[i];
        }

        return result;
    }

    function getUpcomingEvents(uint256 limit) external view returns (address[] memory) {
        address[] memory upcomingEvents = new address[](allEvents.length);
        uint256 count = 0;

        for (uint256 i = 0; i < allEvents.length && count < limit; i++) {
            EventInfo memory info = eventInfo[allEvents[i]];
            if (info.eventDate > block.timestamp) {
                upcomingEvents[count] = allEvents[i];
                count++;
            }
        }

        // Resize array
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = upcomingEvents[i];
        }

        return result;
    }

    function getEventInfo(address eventContract) external view returns (EventInfo memory) {
        require(isPassMintEvent[eventContract], "Not a PassMint event");
        return eventInfo[eventContract];
    }

    // Admin functions
    function updateImplementation(address _newImplementation) external onlyOwner {
        require(_newImplementation != address(0), "Invalid implementation");
        implementation = _newImplementation;
        emit ImplementationUpdated(_newImplementation);
    }

    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 0.01 ether, "Fee too high"); // Max 0.01 ETH
        platformFee = _newFee;
        emit PlatformFeeUpdated(_newFee);
    }

    function verifyEvent(address eventContract) external onlyOwner {
        require(isPassMintEvent[eventContract], "Not a PassMint event");
        eventInfo[eventContract].verified = true;
    }

    function unverifyEvent(address eventContract) external onlyOwner {
        require(isPassMintEvent[eventContract], "Not a PassMint event");
        eventInfo[eventContract].verified = false;
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    // Emergency function
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Prevent direct ETH transfers
    receive() external payable {
        revert("Direct transfers not allowed");
    }
}