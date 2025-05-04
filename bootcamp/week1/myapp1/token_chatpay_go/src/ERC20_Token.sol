// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "./Ownable.sol";
import {Pausable} from "./Pausable.sol";
import {ReentrancyGuard} from "./ReentrancyGuard.sol";

contract ERC20_Token is Ownable, Pausable, ReentrancyGuard {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isBlacklisted;
    mapping(address => bool) public isWhitelisted;

    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed user, uint256 amount);
    event Unburn(address indexed user, uint256 amount);
    event Blacklist(address indexed user);
    event Unblacklist(address indexed user);
    event Whitelist(address indexed user);
    event Unwhitelist(address indexed user);
    event Mint(address indexed user, uint256 amount);


    constructor(string memory _name, string memory _symbol, uint8 _decimals) Pausable(false) Ownable(msg.sender) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function transfer(address to, uint256 amount) public whenNotPaused returns (bool) {
        require(balanceOf[msg.sender] >= amount, "ERC20: insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function mint(uint256 amount) public onlyOwner {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Mint(msg.sender, amount);
    }

    function burn(address user, uint256 amount) public onlyOwner {
        balanceOf[user] -= amount;
        totalSupply -= amount;
        emit Burn(user, amount);
    }

    function unburn(address user, uint256 amount) public onlyOwner {
        balanceOf[user] += amount;
        totalSupply += amount;
        emit Unburn(user, amount);
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public returns (bool success) {
        require(allowance[from][msg.sender] >= amount, "ERC20: insufficient allowance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function blacklist(address user) public onlyOwner {
        isBlacklisted[user] = true;
        emit Blacklist(user);
    }

    function unblacklist(address user) public onlyOwner {
        isBlacklisted[user] = false;
        emit Unblacklist(user);
    }

    function whitelist(address user) public onlyOwner {
        isWhitelisted[user] = true;
        emit Whitelist(user);
    }

    function unwhitelist(address user) public onlyOwner {
        isWhitelisted[user] = false;
        emit Unwhitelist(user);
    }
}
