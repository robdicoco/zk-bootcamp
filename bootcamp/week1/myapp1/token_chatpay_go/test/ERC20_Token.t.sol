// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ERC20_Token.sol";

contract ERC20TokenTest is Test {
    ERC20_Token token;
    address owner;
    address user1;
    address user2;
    address spender;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        spender = address(0x3);
        
        token = new ERC20_Token("ChatPayGO", "CPGO", 18);
    }

    // Test ERC-20 Standard Functions
    function testMetadata() public view {
        assertEq(token.name(), "ChatPayGO");
        assertEq(token.symbol(), "CPGO");
        assertEq(token.decimals(), 18);
    }

    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 0);
    }

    function testTransfer() public {
        vm.prank(owner);
        token.mint(1000 ether);
        
        vm.prank(owner);
        token.transfer(user1, 100 ether);
        
        assertEq(token.balanceOf(owner), 900 ether);
        assertEq(token.balanceOf(user1), 100 ether);
    }

    function testTransferInsufficientBalance() public {
        vm.prank(owner);
        token.mint(100 ether);
        
        vm.prank(owner);
        vm.expectRevert("ERC20: insufficient balance");
        token.transfer(user1, 101 ether);
    }

    function testApproveAndAllowance() public {
        vm.prank(user1);
        token.approve(spender, 100 ether);
        
        assertEq(token.allowance(user1, spender), 100 ether);
    }

    function testTransferFrom() public {
        vm.prank(owner);
        token.mint(1000 ether);
        vm.prank(owner);
        token.transfer(user1, 500 ether);
        
        vm.prank(user1);
        token.approve(spender, 300 ether);
        
        vm.prank(spender);
        token.transferFrom(user1, user2, 200 ether);
        
        assertEq(token.balanceOf(user1), 300 ether);
        assertEq(token.balanceOf(user2), 200 ether);
        assertEq(token.allowance(user1, spender), 100 ether);
    }

    function testTransferFromInsufficientAllowance() public {
        vm.prank(owner);
        token.mint(100 ether);
        
        vm.prank(owner);
        token.approve(spender, 99 ether);
        
        vm.prank(spender);
        vm.expectRevert("ERC20: insufficient allowance");
        token.transferFrom(owner, user1, 100 ether);
    }

    // Test Additional Features
    function testMint() public {
        vm.prank(owner);
        token.mint(1000 ether);
        
        assertEq(token.balanceOf(owner), 1000 ether);
        assertEq(token.totalSupply(), 1000 ether);
    }

    function testMintNonOwner() public {
        vm.prank(user1);
        vm.expectRevert("NOT AUTHORIZED");
        token.mint(100 ether);
    }

    function testBurn() public {
        vm.prank(owner);
        token.mint(1000 ether);
        
        vm.prank(owner);
        token.burn(owner, 500 ether);
        
        assertEq(token.balanceOf(owner), 500 ether);
        assertEq(token.totalSupply(), 500 ether);
    }

    function testUnburn() public {
        vm.prank(owner);
        token.mint(1000 ether);
        
        vm.prank(owner);
        token.burn(owner, 500 ether);
        vm.prank(owner);
        token.unburn(owner, 200 ether);
        
        assertEq(token.balanceOf(owner), 700 ether);
        assertEq(token.totalSupply(), 700 ether);
    }

    function testBlacklist() public {
        vm.prank(owner);
        token.blacklist(user1);
        
        assertTrue(token.isBlacklisted(user1));
        
        vm.prank(owner);
        token.unblacklist(user1);
        
        assertFalse(token.isBlacklisted(user1));
    }

    function testWhitelist() public {
        vm.prank(owner);
        token.whitelist(user1);
        
        assertTrue(token.isWhitelisted(user1));
        
        vm.prank(owner);
        token.unwhitelist(user1);
        
        assertFalse(token.isWhitelisted(user1));
    }

    function testPause() public {
        vm.prank(owner);
        token.pause();
        
        vm.prank(owner);
        token.mint(100 ether);
        
        vm.prank(owner);
        vm.expectRevert("PAUSED");
        token.transfer(user1, 50 ether);
        
        vm.prank(owner);
        token.unpause();
        
        vm.prank(owner);
        token.transfer(user1, 50 ether);
        assertEq(token.balanceOf(user1), 50 ether);
    }

    function testTransferFromBlacklisted() public {
        // Mint tokens to user1
        vm.prank(owner);
        token.mint(1000 ether);
        vm.prank(owner);
        token.transfer(user1, 100 ether);
        assertEq(token.balanceOf(user1), 100 ether);

        // Approve spender to spend user1's tokens
        vm.prank(user1);
        token.approve(spender, 50 ether);
        assertEq(token.allowance(user1, spender), 50 ether);

        // Blacklist spender
        vm.prank(owner);
        token.blacklist(spender);

        // spender should not be able to transfer tokens from user1
        vm.prank(spender);
        vm.expectRevert("ERC20: sender, recipient, or spender is blacklisted");
        token.transferFrom(user1, user2, 50 ether);

        // Unblacklist spender
        vm.prank(owner);
        token.unblacklist(spender);

        // Now spender should be able to transfer tokens from user1
        vm.prank(spender);
        token.transferFrom(user1, user2, 50 ether);
        assertEq(token.balanceOf(user2), 50 ether);
        assertEq(token.balanceOf(user1), 50 ether);
        assertEq(token.allowance(user1, spender), 0);
    }

    function testTransferToBlacklisted() public {
        // Mint tokens to user1
        vm.prank(owner);
        token.mint(1000 ether);
        vm.prank(owner);
        token.transfer(user1, 100 ether);
        assertEq(token.balanceOf(user1), 100 ether);

        // Blacklist user2
        vm.prank(owner);
        token.blacklist(user2);

        // user1 should not be able to transfer tokens to user2
        vm.prank(user1);
        vm.expectRevert("ERC20: sender or recipient is blacklisted");
        token.transfer(user2, 50 ether);

        // Unblacklist and verify
        vm.prank(owner);
        token.unblacklist(user2);
        vm.prank(user1);
        token.transfer(user2, 50 ether);
        assertEq(token.balanceOf(user2), 50 ether);
    }
}