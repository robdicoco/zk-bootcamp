// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

abstract contract Ownable {
    address public owner;

    modifier onlyOwner() {
        // if the sender is not the owner, revert
        if (msg.sender != owner) {
            revert("NOT AUTHORIZED");
        } else {
            // #2
            _;
        }
    }

    function transferOwnership(address newOwner) public onlyOwner {
        // transfer the ownership to the new owner
        owner = newOwner;
    }

    constructor(address _owner) {
        // set the owner to the address of the contract creator
        owner = _owner;
    }
}