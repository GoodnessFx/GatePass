// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ProofOfAttendance
 * @dev ERC721 NFT that serves as proof of attendance for events
 * Minted automatically when tickets are checked in
 */
contract ProofOfAttendance is ERC721, Ownable, ReentrancyGuard {
    /// @notice Base URI for token metadata
    string private _baseTokenURI;
    
    /// @notice Counter for minted POA tokens
    uint256 public tokenCounter = 1;
    
    /// @notice Mapping from POA token ID to original ticket ID
    mapping(uint256 => uint256) public originalTicketId;
    
    /// @notice Mapping from original ticket ID to POA token ID
    mapping(uint256 => uint256) public ticketToPOA;
    
    /// @notice Mapping of addresses authorized to mint POAs (event contracts)
    mapping(address => bool) public authorizedMinters;

    event POAMinted(address indexed attendee, uint256 indexed poaTokenId, uint256 indexed ticketId);
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);

    constructor(
        string memory name,
        string memory symbol,
        address eventContract
    ) ERC721(name, symbol) Ownable(msg.sender) {
        authorizedMinters[eventContract] = true;
        _baseTokenURI = "https://api.passmint.com/poa/metadata/";
    }

    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender], "Not authorized minter");
        _;
    }

    /**
     * @notice Mint a Proof of Attendance NFT
     * @param attendee Address to mint the POA to
     * @param ticketId Original ticket ID that was checked in
     * @return poaTokenId The minted POA token ID
     */
    function mintPOA(
        address attendee,
        uint256 ticketId
    ) external onlyAuthorizedMinter nonReentrant returns (uint256) {
        require(attendee != address(0), "Invalid attendee address");
        require(ticketToPOA[ticketId] == 0, "POA already minted for this ticket");

        uint256 poaTokenId = tokenCounter++;
        
        // Store mappings
        originalTicketId[poaTokenId] = ticketId;
        ticketToPOA[ticketId] = poaTokenId;
        
        // Mint the POA NFT
        _safeMint(attendee, poaTokenId);
        
        emit POAMinted(attendee, poaTokenId, ticketId);
        
        return poaTokenId;
    }

    /**
     * @notice Authorize an address to mint POAs (typically event contracts)
     * @param minter Address to authorize
     */
    function authorizeMinter(address minter) external onlyOwner {
        require(minter != address(0), "Invalid minter address");
        authorizedMinters[minter] = true;
        emit MinterAuthorized(minter);
    }

    /**
     * @notice Revoke minting authorization
     * @param minter Address to revoke authorization from
     */
    function revokeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRevoked(minter);
    }

    /**
     * @notice Update base URI for metadata (only owner)
     * @param newBaseURI New base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @notice Get token URI
     * @param tokenId Token ID
     * @return Token metadata URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return bytes(_baseTokenURI).length > 0 
            ? string(abi.encodePacked(_baseTokenURI, tokenId)) 
            : "";
    }

    /**
     * @notice Check if a POA exists for a given ticket ID
     * @param ticketId Original ticket ID
     * @return exists True if POA exists
     * @return poaTokenId The POA token ID (0 if doesn't exist)
     */
    function getPOAForTicket(uint256 ticketId) external view returns (bool exists, uint256 poaTokenId) {
        poaTokenId = ticketToPOA[ticketId];
        exists = poaTokenId != 0;
    }

    /**
     * @notice Get the original ticket ID for a POA token
     * @param poaTokenId POA token ID
     * @return ticketId Original ticket ID
     */
    function getOriginalTicketId(uint256 poaTokenId) external view returns (uint256) {
        require(_ownerOf(poaTokenId) != address(0), "POA does not exist");
        return originalTicketId[poaTokenId];
    }

    /**
     * @notice Get total number of POAs minted
     * @return total Total POAs minted
     */
    function totalMinted() external view returns (uint256) {
        return tokenCounter - 1;
    }

    /**
     * @notice Override transfer functions to make POAs soulbound (non-transferable)
     * POAs should stay with the original attendee
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0)) but prevent transfers
        if (from != address(0) && to != address(0)) {
            revert("POAs are soulbound and non-transferable");
        }
        
        return super._update(to, tokenId, auth);
    }
}