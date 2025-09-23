// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PassMintPOA (Proof of Attendance)
 * @dev NFT contract for Proof of Attendance badges
 * Features:
 * - Non-transferable badges (soulbound)
 * - Automatic minting upon event attendance
 * - Rarity tiers based on event characteristics
 * - Metadata includes event details and attendance proof
 */
contract PassMintPOA is ERC721, ERC721URIStorage, AccessControl, Pausable {
    using Counters for Counters.Counter;

    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant EVENT_ROLE = keccak256("EVENT_ROLE");

    // Events
    event POAMinted(
        address indexed attendee,
        uint256 indexed tokenId,
        address indexed eventContract,
        string eventName,
        uint256 eventDate,
        string rarity
    );
    event RarityAssigned(uint256 indexed tokenId, string rarity);

    // Enums
    enum Rarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }

    // Structs
    struct POAMetadata {
        address eventContract;
        string eventName;
        string eventDescription;
        uint256 eventDate;
        uint256 attendanceDate;
        address attendee;
        Rarity rarity;
        string venue;
        string organizer;
        bool exists;
    }

    // State variables
    Counters.Counter private _tokenIdCounter;
    
    mapping(uint256 => POAMetadata) public poaMetadata;
    mapping(address => mapping(address => bool)) public hasAttended; // user => event => attended
    mapping(address => uint256[]) public userPOAs;
    mapping(address => uint256) public eventAttendanceCount;
    
    // Rarity calculation parameters
    mapping(Rarity => uint256) public rarityThresholds;
    
    string public baseTokenURI;

    constructor() ERC721("PassMint POA", "PMPOA") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        
        // Set rarity thresholds (max attendees for each rarity)
        rarityThresholds[Rarity.Legendary] = 50;    // <= 50 attendees
        rarityThresholds[Rarity.Epic] = 100;        // <= 100 attendees  
        rarityThresholds[Rarity.Rare] = 500;        // <= 500 attendees
        rarityThresholds[Rarity.Uncommon] = 1000;   // <= 1000 attendees
        // Common = > 1000 attendees
    }

    /**
     * @dev Mint POA badge to attendee
     * @param attendee Address of the attendee
     * @param eventContract Address of the event contract
     * @param eventName Name of the event
     * @param eventDescription Description of the event
     * @param eventDate Date of the event
     * @param venue Venue of the event
     * @param organizer Organizer of the event
     */
    function mintPOA(
        address attendee,
        address eventContract,
        string memory eventName,
        string memory eventDescription,
        uint256 eventDate,
        string memory venue,
        string memory organizer
    ) external onlyRole(MINTER_ROLE) whenNotPaused returns (uint256) {
        require(attendee != address(0), "Invalid attendee address");
        require(!hasAttended[attendee][eventContract], "POA already minted for this event");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Calculate rarity based on event attendance
        Rarity rarity = _calculateRarity(eventContract);

        // Create POA metadata
        poaMetadata[tokenId] = POAMetadata({
            eventContract: eventContract,
            eventName: eventName,
            eventDescription: eventDescription,
            eventDate: eventDate,
            attendanceDate: block.timestamp,
            attendee: attendee,
            rarity: rarity,
            venue: venue,
            organizer: organizer,
            exists: true
        });

        // Update mappings
        hasAttended[attendee][eventContract] = true;
        userPOAs[attendee].push(tokenId);
        eventAttendanceCount[eventContract]++;

        // Mint the POA badge
        _safeMint(attendee, tokenId);

        emit POAMinted(
            attendee,
            tokenId,
            eventContract,
            eventName,
            eventDate,
            _rarityToString(rarity)
        );

        return tokenId;
    }

    /**
     * @dev Batch mint POA badges for multiple attendees
     */
    function batchMintPOA(
        address[] memory attendees,
        address eventContract,
        string memory eventName,
        string memory eventDescription,
        uint256 eventDate,
        string memory venue,
        string memory organizer
    ) external onlyRole(MINTER_ROLE) whenNotPaused returns (uint256[] memory) {
        uint256 length = attendees.length;
        uint256[] memory tokenIds = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            if (!hasAttended[attendees[i]][eventContract]) {
                tokenIds[i] = mintPOA(
                    attendees[i],
                    eventContract,
                    eventName,
                    eventDescription,
                    eventDate,
                    venue,
                    organizer
                );
            }
        }

        return tokenIds;
    }

    /**
     * @dev Calculate rarity based on event attendance and characteristics
     */
    function _calculateRarity(address eventContract) internal view returns (Rarity) {
        uint256 attendanceCount = eventAttendanceCount[eventContract];
        
        if (attendanceCount <= rarityThresholds[Rarity.Legendary]) {
            return Rarity.Legendary;
        } else if (attendanceCount <= rarityThresholds[Rarity.Epic]) {
            return Rarity.Epic;
        } else if (attendanceCount <= rarityThresholds[Rarity.Rare]) {
            return Rarity.Rare;
        } else if (attendanceCount <= rarityThresholds[Rarity.Uncommon]) {
            return Rarity.Uncommon;
        } else {
            return Rarity.Common;
        }
    }

    /**
     * @dev Convert rarity enum to string
     */
    function _rarityToString(Rarity rarity) internal pure returns (string memory) {
        if (rarity == Rarity.Legendary) return "Legendary";
        if (rarity == Rarity.Epic) return "Epic";
        if (rarity == Rarity.Rare) return "Rare";
        if (rarity == Rarity.Uncommon) return "Uncommon";
        return "Common";
    }

    // View functions
    function getUserPOAs(address user) external view returns (uint256[] memory) {
        return userPOAs[user];
    }

    function getPOAMetadata(uint256 tokenId) external view returns (POAMetadata memory) {
        require(poaMetadata[tokenId].exists, "POA does not exist");
        return poaMetadata[tokenId];
    }

    function getUserPOACount(address user) external view returns (uint256) {
        return userPOAs[user].length;
    }

    function getUserPOAsByRarity(
        address user, 
        Rarity rarity
    ) external view returns (uint256[] memory) {
        uint256[] memory userTokens = userPOAs[user];
        uint256[] memory rarityTokens = new uint256[](userTokens.length);
        uint256 count = 0;

        for (uint256 i = 0; i < userTokens.length; i++) {
            if (poaMetadata[userTokens[i]].rarity == rarity) {
                rarityTokens[count] = userTokens[i];
                count++;
            }
        }

        // Resize array
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = rarityTokens[i];
        }

        return result;
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Admin functions
    function setBaseTokenURI(string memory uri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        baseTokenURI = uri;
    }

    function updateRarityThresholds(
        Rarity rarity,
        uint256 threshold
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        rarityThresholds[rarity] = threshold;
    }

    function grantEventRole(address eventContract) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(EVENT_ROLE, eventContract);
        _grantRole(MINTER_ROLE, eventContract);
    }

    function revokeEventRole(address eventContract) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(EVENT_ROLE, eventContract);
        _revokeRole(MINTER_ROLE, eventContract);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    // Override functions to make POAs non-transferable (soulbound)
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        // Allow minting (from == address(0)) but prevent transfers
        require(from == address(0), "POA badges are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "POA does not exist");
        
        // If custom URI is set, use it; otherwise use base URI + metadata
        string memory customURI = super.tokenURI(tokenId);
        if (bytes(customURI).length > 0) {
            return customURI;
        }
        
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId)));
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        delete poaMetadata[tokenId];
    }

    // Prevent approvals since tokens are non-transferable
    function approve(address, uint256) public pure override {
        revert("POA badges are non-transferable");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("POA badges are non-transferable");
    }

    function getApproved(uint256) public pure override returns (address) {
        return address(0);
    }

    function isApprovedForAll(address, address) public pure override returns (bool) {
        return false;
    }
}