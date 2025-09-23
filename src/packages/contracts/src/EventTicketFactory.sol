// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./EventTicket.sol";

/**
 * @title EventTicketFactory
 * @dev Factory contract for deploying minimal proxy clones of EventTicket contracts
 * Gas-efficient deployment for event organizers
 */
contract EventTicketFactory is Ownable, ReentrancyGuard {
    using Clones for address;

    /// @notice The implementation contract address for EventTicket
    address public immutable implementation;
    
    /// @notice Platform fee in basis points (e.g., 250 = 2.5%)
    uint256 public platformFeeBps = 250;
    
    /// @notice Address that receives platform fees
    address public platformFeeRecipient;
    
    /// @notice Mapping of event ID to deployed contract address
    mapping(uint256 => address) public eventContracts;
    
    /// @notice Mapping of organizer to their event contracts
    mapping(address => address[]) public organizerEvents;
    
    /// @notice Counter for unique event IDs
    uint256 public nextEventId = 1;

    event EventContractDeployed(
        uint256 indexed eventId,
        address indexed organizer,
        address contractAddress,
        string eventName,
        uint256 totalSupply
    );

    event PlatformFeeUpdated(uint256 oldFee, uint256 newFee);
    event PlatformFeeRecipientUpdated(address oldRecipient, address newRecipient);

    constructor(address _platformFeeRecipient) Ownable(msg.sender) {
        implementation = address(new EventTicket());
        platformFeeRecipient = _platformFeeRecipient;
    }

    /**
     * @notice Deploy a new EventTicket contract for an organizer
     * @param eventName Name of the event
     * @param eventSymbol Symbol for the NFT tickets
     * @param totalSupply Maximum number of tickets
     * @param ticketPrice Price per ticket in wei
     * @param saleStart Timestamp when sales begin
     * @param saleEnd Timestamp when sales end
     * @param eventDate Timestamp of the actual event
     * @param baseTokenURI Base URI for token metadata
     * @return eventContract Address of the deployed contract
     */
    function createEvent(
        string memory eventName,
        string memory eventSymbol,
        uint256 totalSupply,
        uint256 ticketPrice,
        uint256 saleStart,
        uint256 saleEnd,
        uint256 eventDate,
        string memory baseTokenURI
    ) external nonReentrant returns (address eventContract) {
        require(bytes(eventName).length > 0, "Event name required");
        require(totalSupply > 0 && totalSupply <= 10000, "Invalid total supply");
        require(saleStart < saleEnd, "Invalid sale period");
        require(saleEnd <= eventDate, "Event must be after sale ends");

        uint256 eventId = nextEventId++;
        
        // Deploy minimal proxy
        eventContract = implementation.clone();
        
        // Initialize the contract
        EventTicket(eventContract).initialize(
            eventName,
            eventSymbol,
            msg.sender, // organizer
            totalSupply,
            ticketPrice,
            saleStart,
            saleEnd,
            eventDate,
            baseTokenURI,
            platformFeeRecipient,
            platformFeeBps
        );

        // Store mappings
        eventContracts[eventId] = eventContract;
        organizerEvents[msg.sender].push(eventContract);

        emit EventContractDeployed(
            eventId,
            msg.sender,
            eventContract,
            eventName,
            totalSupply
        );

        return eventContract;
    }

    /**
     * @notice Get all event contracts for a specific organizer
     * @param organizer Address of the organizer
     * @return Array of event contract addresses
     */
    function getOrganizerEvents(address organizer) external view returns (address[] memory) {
        return organizerEvents[organizer];
    }

    /**
     * @notice Update platform fee (only owner)
     * @param newFeeBps New fee in basis points
     */
    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high"); // Max 10%
        uint256 oldFee = platformFeeBps;
        platformFeeBps = newFeeBps;
        emit PlatformFeeUpdated(oldFee, newFeeBps);
    }

    /**
     * @notice Update platform fee recipient (only owner)
     * @param newRecipient New recipient address
     */
    function setPlatformFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid recipient");
        address oldRecipient = platformFeeRecipient;
        platformFeeRecipient = newRecipient;
        emit PlatformFeeRecipientUpdated(oldRecipient, newRecipient);
    }

    /**
     * @notice Get the implementation contract address
     * @return implementation address
     */
    function getImplementation() external view returns (address) {
        return implementation;
    }
}