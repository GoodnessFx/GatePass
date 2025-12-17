// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./ProofOfAttendance.sol";

/**
 * @title EventTicket
 * @dev ERC721 NFT tickets for events with built-in sales, check-in, and POA minting
 */
contract EventTicket is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard, Pausable {
    /// @notice Maximum number of tickets that can be minted
    uint256 public totalSupply;
    
    /// @notice Price per ticket in wei
    uint256 public ticketPrice;
    
    /// @notice Timestamp when ticket sales start
    uint256 public saleStart;
    
    /// @notice Timestamp when ticket sales end
    uint256 public saleEnd;
    
    /// @notice Timestamp of the actual event
    uint256 public eventDate;
    
    /// @notice Base URI for token metadata
    string private _baseTokenURI;
    
    /// @notice Counter for minted tickets
    uint256 public tokenCounter = 1;
    
    /// @notice Platform fee recipient
    address public platformFeeRecipient;
    
    /// @notice Platform fee in basis points
    uint256 public platformFeeBps;
    
    /// @notice Merkle root for allowlist (optional)
    bytes32 public allowListRoot;
    
    /// @notice Proof of Attendance contract
    ProofOfAttendance public proofOfAttendance;
    
    /// @notice Track which tickets have been used for check-in
    mapping(uint256 => bool) public ticketUsed;
    
    /// @notice Track allowlist claims
    mapping(address => bool) public allowListClaimed;
    
    /// @notice Maximum tickets per wallet (0 = no limit)
    uint256 public maxTicketsPerWallet = 5;

    event TicketMinted(address indexed to, uint256 indexed tokenId, uint256 price);
    event TicketCheckedIn(uint256 indexed tokenId, address indexed holder);
    event ProofOfAttendanceMinted(address indexed attendee, uint256 indexed ticketId, uint256 poaTokenId);
    event AllowListUpdated(bytes32 newRoot);
    event WithdrawalCompleted(address indexed organizer, uint256 amount);

    error SaleNotActive();
    error InsufficientPayment();
    error MaxSupplyExceeded();
    error MaxTicketsPerWalletExceeded();
    error NotTokenOwner();
    error TicketAlreadyUsed();
    error EventNotStarted();
    error WithdrawalTooEarly();
    error InvalidProof();
    error AlreadyClaimed();

    constructor() ERC721("", "") Ownable(address(0)) {
        // This is the implementation contract, will be cloned
        _disableInitializers();
    }

    /**
     * @notice Initialize the contract (called by factory)
     */
    function initialize(
        string memory name,
        string memory symbol,
        address organizer,
        uint256 _totalSupply,
        uint256 _ticketPrice,
        uint256 _saleStart,
        uint256 _saleEnd,
        uint256 _eventDate,
        string memory baseTokenURI,
        address _platformFeeRecipient,
        uint256 _platformFeeBps
    ) external {
        require(owner() == address(0), "Already initialized");
        
        // Initialize ERC721
        _name = name;
        _symbol = symbol;
        
        // Initialize Ownable
        _transferOwnership(organizer);
        
        totalSupply = _totalSupply;
        ticketPrice = _ticketPrice;
        saleStart = _saleStart;
        saleEnd = _saleEnd;
        eventDate = _eventDate;
        _baseTokenURI = baseTokenURI;
        platformFeeRecipient = _platformFeeRecipient;
        platformFeeBps = _platformFeeBps;

        // Deploy POA contract
        proofOfAttendance = new ProofOfAttendance(
            string(abi.encodePacked(name, " - Proof of Attendance")),
            "POA",
            organizer
        );
    }

    modifier onlySaleActive() {
        if (block.timestamp < saleStart || block.timestamp > saleEnd) {
            revert SaleNotActive();
        }
        _;
    }

    modifier onlyEventStarted() {
        if (block.timestamp < eventDate) {
            revert EventNotStarted();
        }
        _;
    }

    /**
     * @notice Public mint function for purchasing tickets
     * @param quantity Number of tickets to mint
     */
    function mint(uint256 quantity) external payable nonReentrant onlySaleActive whenNotPaused {
        require(quantity > 0 && quantity <= 10, "Invalid quantity");
        
        if (tokenCounter + quantity - 1 > totalSupply) {
            revert MaxSupplyExceeded();
        }
        
        if (balanceOf(msg.sender) + quantity > maxTicketsPerWallet && maxTicketsPerWallet > 0) {
            revert MaxTicketsPerWalletExceeded();
        }
        
        if (msg.value < ticketPrice * quantity) {
            revert InsufficientPayment();
        }

        // Mint tickets
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = tokenCounter++;
            _safeMint(msg.sender, tokenId);
            emit TicketMinted(msg.sender, tokenId, ticketPrice);
        }

        // Refund excess payment
        if (msg.value > ticketPrice * quantity) {
            payable(msg.sender).transfer(msg.value - (ticketPrice * quantity));
        }
    }

    function mintFor(address to, uint256 quantity) external onlyOwner nonReentrant whenNotPaused {
        require(quantity > 0 && quantity <= 50, "Invalid quantity");
        if (tokenCounter + quantity - 1 > totalSupply) {
            revert MaxSupplyExceeded();
        }
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = tokenCounter++;
            _safeMint(to, tokenId);
            emit TicketMinted(to, tokenId, ticketPrice);
        }
    }

    /**
     * @notice Allowlist mint function
     * @param quantity Number of tickets to mint
     * @param merkleProof Merkle proof for allowlist verification
     */
    function allowListMint(
        uint256 quantity,
        bytes32[] calldata merkleProof
    ) external payable nonReentrant onlySaleActive whenNotPaused {
        if (allowListClaimed[msg.sender]) {
            revert AlreadyClaimed();
        }

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if (!MerkleProof.verify(merkleProof, allowListRoot, leaf)) {
            revert InvalidProof();
        }

        allowListClaimed[msg.sender] = true;

        require(quantity > 0 && quantity <= 3, "Invalid allowlist quantity");
        
        if (tokenCounter + quantity - 1 > totalSupply) {
            revert MaxSupplyExceeded();
        }
        
        if (msg.value < ticketPrice * quantity) {
            revert InsufficientPayment();
        }

        // Mint tickets
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = tokenCounter++;
            _safeMint(msg.sender, tokenId);
            emit TicketMinted(msg.sender, tokenId, ticketPrice);
        }

        // Refund excess payment
        if (msg.value > ticketPrice * quantity) {
            payable(msg.sender).transfer(msg.value - (ticketPrice * quantity));
        }
    }

    /**
     * @notice Check-in a ticket and mint POA
     * @param tokenId The ticket token ID to check in
     */
    function checkIn(uint256 tokenId) external onlyEventStarted {
        if (ownerOf(tokenId) != msg.sender) {
            revert NotTokenOwner();
        }
        
        if (ticketUsed[tokenId]) {
            revert TicketAlreadyUsed();
        }

        ticketUsed[tokenId] = true;

        // Mint Proof of Attendance NFT
        uint256 poaTokenId = proofOfAttendance.mintPOA(msg.sender, tokenId);
        
        emit TicketCheckedIn(tokenId, msg.sender);
        emit ProofOfAttendanceMinted(msg.sender, tokenId, poaTokenId);
    }

    /**
     * @notice Organizer can check in tickets (for assisted check-in)
     * @param tokenId The ticket token ID to check in
     */
    function organizerCheckIn(uint256 tokenId) external onlyOwner onlyEventStarted {
        if (ticketUsed[tokenId]) {
            revert TicketAlreadyUsed();
        }

        ticketUsed[tokenId] = true;
        address ticketHolder = ownerOf(tokenId);

        // Mint Proof of Attendance NFT
        uint256 poaTokenId = proofOfAttendance.mintPOA(ticketHolder, tokenId);
        
        emit TicketCheckedIn(tokenId, ticketHolder);
        emit ProofOfAttendanceMinted(ticketHolder, tokenId, poaTokenId);
    }

    /**
     * @notice Withdraw proceeds (only after event date)
     */
    function withdraw() external onlyOwner nonReentrant {
        if (block.timestamp < eventDate) {
            revert WithdrawalTooEarly();
        }

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        // Calculate platform fee
        uint256 platformFee = (balance * platformFeeBps) / 10000;
        uint256 organizerAmount = balance - platformFee;

        // Transfer platform fee
        if (platformFee > 0) {
            payable(platformFeeRecipient).transfer(platformFee);
        }

        // Transfer remaining to organizer
        payable(owner()).transfer(organizerAmount);

        emit WithdrawalCompleted(owner(), organizerAmount);
    }

    /**
     * @notice Set allowlist merkle root (only owner)
     * @param newRoot New merkle root
     */
    function setAllowListRoot(bytes32 newRoot) external onlyOwner {
        allowListRoot = newRoot;
        emit AllowListUpdated(newRoot);
    }

    /**
     * @notice Update max tickets per wallet (only owner)
     * @param newMax New maximum (0 = no limit)
     */
    function setMaxTicketsPerWallet(uint256 newMax) external onlyOwner {
        maxTicketsPerWallet = newMax;
    }

    /**
     * @notice Emergency pause (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Check if ticket is valid and unused
     * @param tokenId Token ID to check
     * @return isValid True if ticket is valid and unused
     */
    function isTicketValid(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0) && !ticketUsed[tokenId];
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
     * @notice Get available tickets for purchase
     * @return remaining Number of tickets still available
     */
    function availableTickets() external view returns (uint256) {
        return totalSupply >= tokenCounter ? totalSupply - tokenCounter + 1 : 0;
    }

    // Required overrides
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
