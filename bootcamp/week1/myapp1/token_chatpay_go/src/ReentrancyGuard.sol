// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

abstract contract ReentrancyGuard {
    bool public lock = false;

    modifier noReentrant() {
        // if the lock is true, revert
        if (lock == true) {
            revert("NO_REENTRANCY");
        }

        // set the lock to true
        lock = true;
        _;
        // set the lock to false
        lock = false;
    }
}