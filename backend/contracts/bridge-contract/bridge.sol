// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "https://raw.githubusercontent.com/hiibro133/openzeppelin/main/openzeppelin/contracts/token/security/act.sol";

contract USDTbridges is ReentrancyGuard, bridge {
    IERC20 public token;
    address owner;
    bool private reentrancyLock = false;

    event TokensLocked(address sender, uint256 amount);
    event TokensUnlocked(address sender, uint256 amount);

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    receive() external payable {
        // Your receive function logic here
        // This function will be triggered when the contract receives Ether without any data.
    }

    function Tokenupdate(address _tokenupdate) external onlyOwner {
        token = IERC20(_tokenupdate);
    }

    function balancescheck(address _tokenAddress) external returns (uint256) {
        balancess(_tokenAddress);
        return token.balanceOf(address(this));
    }

    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function lockTokens(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");

        token.transferFrom(msg.sender, address(this), _amount);

        emit TokensLocked(msg.sender, _amount);
    }

    function unlockTokens(
        uint256 _amount,
        address _resiver
    ) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");

        uint256 balance = token.balanceOf(address(this));
        require(balance >= _amount, "Not enough tokens locked");

        token.transfer(_resiver, _amount);

        emit TokensUnlocked(_resiver, _amount);
    }

    function withdraw() external onlyOwner {
        // Withdraw ETH
        payable(owner).transfer(address(this).balance);
        //IERC20 token = IERC20(token);
        uint256 tokenBalance = token.balanceOf(address(this));
        if (tokenBalance > 0) {
            require(
                token.transfer(owner, tokenBalance),
                "ERC20 transfer failed"
            );
        }
    }
}
