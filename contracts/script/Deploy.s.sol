// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


import {Script} from "forge-std/Script.sol";
import {CCMReceiver} from "../src/Test.sol";


contract Deploy is Script{
    function run() external returns(address) {
        vm.startBroadcast();
        CCMReceiver test = new CCMReceiver();
        vm.stopBroadcast();
        return address(test);
    }
}