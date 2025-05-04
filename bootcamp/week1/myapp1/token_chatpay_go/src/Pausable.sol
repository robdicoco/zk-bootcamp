// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "./Ownable.sol";

abstract contract Pausable is Ownable {
    bool public paused;
    event Pause();
    event Unpause();

    modifier whenNotPaused() {
        // if the contract is paused, revert
        if (paused == true) {
            revert("PAUSED");
        }

        _;
    }

    function pause() public onlyOwner {
        paused = true;
        emit Pause();
    }

    function unpause() public onlyOwner {
        paused = false;
        emit Unpause();
    }

    constructor(bool _paused) {
        paused = _paused;
    }
}