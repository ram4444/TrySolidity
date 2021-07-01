// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestUpgradeBase is Initializable {
    uint256 public y;

    function initialize() public initializer {
        y = 52;
    }
}

contract TestUpgradable is TestUpgradeBase {
    uint256 public x;

    function initialize(uint256 _x) public initializer {
        TestUpgradeBase.initialize(); // Do not forget this call!
        x = _x;
    }
}