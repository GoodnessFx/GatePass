// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title PassMintTicket
 * @dev NFT contract for event tickets with advanced features
 * Features:
 * - Multiple ticket tiers with different prices
 * - Merkle tree allowlist for presale
 * - Royalty support for secondary sales
 * - Burn/mark used functionality for entry verification
 * - Pausable for emergency stops
 * - Role-based access control
 */
contract PassMintTicket is 
    ERC721, 
    ERC721URIStorage, 
    ERC721Burnable, 
    AccessControl, 
    Pausable, 
    ReentrancyGuard 
{
    using Counters for Counters.Counter;

    // Roles
    bytes32 public constant ORGANIZER_ROLE = keccak256("ORGANIZER_ROLE");
    bytes32 public constant SCANNER_ROLE = keccak256("SCANNER_ROLE");

    // Events
    event TicketMinted(
        address indexed to, 
        uint256 indexed tokenId, 
        uint256 indexed tierId,
        uint256 price
    );
    event TicketUsed(uint256 indexed tokenId, address indexed scanner);
    event TierCreated(uint256 indexed tierId, uint256 price, uint256 maxSupply);
    event EventMetadataUpdated(string name, string description, uint256 eventDate);
    event RoyaltyUpdated(address recipient, uint96 feeNumerator);

    // Structs
    struct TicketTier {
        string name;
        string description;
        uint256 price;
        uint256 maxSupply;
        uint256 minted;
        bool exists;
        bool active;
        uint256 saleStart;
        uint256 saleEnd;
        bytes32 merkleRoot; // For allowlist
    }

    struct EventMetadata {
        string name;
        string description;
        string venue;
        uint256 eventDate;
        string imageURI;
        bool exists;
    }

    // State variables
    Counters.Counter private _tokenIdCounter;
    
    mapping(uint256 => TicketTier) public ticketTiers;
    mapping(uint256 => uint256) public tokenToTier;
    mapping(uint256 => bool) public usedTickets;
    mapping(address => mapping(uint256 => uint256)) public userTierPurchases;
    
    uint256 public nextTierId = 1;
    uint256 public maxTicketsPerWallet = 10;
    EventMetadata public eventMetadata;
    
    // Royalty info (EIP-2981)
    address public royaltyRecipient;
    uint96 public royaltyFeeNumerator; // Basis points (e.g., 250 = 2.5%)

    constructor(
        string memory name,
        string memory symbol,
        address organizer,
        EventMetadata memory _eventMetadata
    ) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, organizer);
        _grantRole(ORGANIZER_ROLE, organizer);
        
        eventMetadata = _eventMetadata;
        eventMetadata.exists = true;
        
        // Set default royalty to 5%
        royaltyRecipient = organizer;
        royaltyFeeNumerator = 500; // 5%
        
        emit EventMetadataUpdated(
            _eventMetadata.name,
            _eventMetadata.description,
            _eventMetadata.eventDate
        );
    }

    // Modifiers
    modifier tierExists(uint256 tierId) {
        require(ticketTiers[tierId].exists, "Tier does not exist");
        _;
    }

    modifier tierActive(uint256 tierId) {
        require(ticketTiers[tierId].active, "Tier not active");
        _;
    }

    modifier saleOpen(uint256 tierId) {
        TicketTier memory tier = ticketTiers[tierId];
        require(
            block.timestamp >= tier.saleStart && 
            block.timestamp <= tier.saleEnd,
            "Sale not open"
        );
        _;
    }

    // Organizer functions
    function createTier(
        string memory name,
        string memory description,
        uint256 price,
        uint256 maxSupply,
        uint256 saleStart,
        uint256 saleEnd,
        bytes32 merkleRoot
    ) external onlyRole(ORGANIZER_ROLE) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(maxSupply > 0, "Max supply must be greater than 0");
        require(saleEnd > saleStart, "Invalid sale period");

        ticketTiers[nextTierId] = TicketTier({
            name: name,
            description: description,
            price: price,
            maxSupply: maxSupply,
            minted: 0,
            exists: true,
            active: true,
            saleStart: saleStart,
            saleEnd: saleEnd,
            merkleRoot: merkleRoot
        });

        emit TierCreated(nextTierId, price, maxSupply);
        nextTierId++;
    }

    function updateTier(
        uint256 tierId,
        uint256 price,
        bool active,
        uint256 saleStart,
        uint256 saleEnd
    ) external onlyRole(ORGANIZER_ROLE) tierExists(tierId) {
        TicketTier storage tier = ticketTiers[tierId];
        tier.price = price;
        tier.active = active;
        tier.saleStart = saleStart;
        tier.saleEnd = saleEnd;
    }

    function updateEventMetadata(
        string memory name,
        string memory description,
        string memory venue,
        uint256 eventDate,
        string memory imageURI
    ) external onlyRole(ORGANIZER_ROLE) {
        eventMetadata.name = name;
        eventMetadata.description = description;
        eventMetadata.venue = venue;
        eventMetadata.eventDate = eventDate;
        eventMetadata.imageURI = imageURI;

        emit EventMetadataUpdated(name, description, eventDate);
    }

    // Public minting functions
    function mint(
        address to,
        uint256 tierId,
        uint256 quantity,
        bytes32[] calldata merkleProof
    ) 
        external 
        payable 
        whenNotPaused 
        nonReentrant 
        tierExists(tierId) 
        tierActive(tierId) 
        saleOpen(tierId) 
    {
        TicketTier storage tier = ticketTiers[tierId];
        
        require(quantity > 0 && quantity <= 10, "Invalid quantity");
        require(tier.minted + quantity <= tier.maxSupply, "Exceeds max supply");
        require(
            userTierPurchases[to][tierId] + quantity <= maxTicketsPerWallet,
            "Exceeds wallet limit"
        );

        // Check allowlist if merkle root is set
        if (tier.merkleRoot != bytes32(0)) {
            bytes32 leaf = keccak256(abi.encodePacked(to));
            require(
                MerkleProof.verify(merkleProof, tier.merkleRoot, leaf),
                "Not on allowlist"
            );
        }

        uint256 totalCost = tier.price * quantity;
        require(msg.value >= totalCost, "Insufficient payment");

        // Mint tickets
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            _safeMint(to, tokenId);
            tokenToTier[tokenId] = tierId;
            
            emit TicketMinted(to, tokenId, tierId, tier.price);
        }

        tier.minted += quantity;
        userTierPurchases[to][tierId] += quantity;

        // Refund excess payment
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }

    // Batch mint for organizer
    function batchMint(
        address[] calldata recipients,
        uint256 tierId
    ) external onlyRole(ORGANIZER_ROLE) tierExists(tierId) {
        TicketTier storage tier = ticketTiers[tierId];
        uint256 quantity = recipients.length;
        
        require(tier.minted + quantity <= tier.maxSupply, "Exceeds max supply");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            _safeMint(recipients[i], tokenId);
            tokenToTier[tokenId] = tierId;
            
            emit TicketMinted(recipients[i], tokenId, tierId, 0);
        }

        tier.minted += quantity;
    }

    // Ticket verification and usage
    function useTicket(uint256 tokenId) external onlyRole(SCANNER_ROLE) {
        require(_exists(tokenId), "Token does not exist");
        require(!usedTickets[tokenId], "Ticket already used");
        
        usedTickets[tokenId] = true;
        emit TicketUsed(tokenId, msg.sender);
    }

    function isTicketUsed(uint256 tokenId) external view returns (bool) {
        return usedTickets[tokenId];
    }

    // Royalty functions (EIP-2981)
    function setRoyalty(
        address recipient,
        uint96 feeNumerator
    ) external onlyRole(ORGANIZER_ROLE) {
        require(feeNumerator <= 1000, "Royalty too high"); // Max 10%
        royaltyRecipient = recipient;
        royaltyFeeNumerator = feeNumerator;
        emit RoyaltyUpdated(recipient, feeNumerator);
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address, uint256) {
        return (royaltyRecipient, (salePrice * royaltyFeeNumerator) / 10000);
    }

    // Withdrawal functions
    function withdraw() external onlyRole(ORGANIZER_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(msg.sender).transfer(balance);
    }

    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    // Admin functions
    function pause() external onlyRole(ORGANIZER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ORGANIZER_ROLE) {
        _unpause();
    }

    function grantScannerRole(address scanner) external onlyRole(ORGANIZER_ROLE) {
        _grantRole(SCANNER_ROLE, scanner);
    }

    function revokeScannerRole(address scanner) external onlyRole(ORGANIZER_ROLE) {
        _revokeRole(SCANNER_ROLE, scanner);
    }

    // View functions
    function getTierInfo(uint256 tierId) external view returns (TicketTier memory) {
        return ticketTiers[tierId];
    }

    function getTokenTier(uint256 tokenId) external view returns (uint256) {
        return tokenToTier[tokenId];
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getUserPurchases(
        address user, 
        uint256 tierId
    ) external view returns (uint256) {
        return userTierPurchases[user][tierId];
    }

    // Override functions
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        
        // Prevent transfer of used tickets
        if (from != address(0)) {
            require(!usedTickets[tokenId], "Cannot transfer used ticket");
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return 
            interfaceId == 0x2a55205a || // EIP-2981
            super.supportsInterface(interfaceId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Fallback function to reject direct ETH transfers
    receive() external payable {
        revert("Direct transfers not allowed");
    }
}