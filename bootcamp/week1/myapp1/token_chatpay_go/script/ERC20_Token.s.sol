// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "../lib/forge-std/src/Script.sol";
import {console} from "../lib/forge-std/src/console.sol";
import {ERC20_Token} from "../src/ERC20_Token.sol";

contract TokenScript is Script {
    ERC20_Token public token;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        token = new ERC20_Token({_name: "ChatPayGO", _symbol: "CPGO", _decimals: 18});

        console.log("Token address: ", address(token));

        vm.stopBroadcast();
    }
}