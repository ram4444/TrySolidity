// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestUpgradeBase is Initializable {
    uint256 public y;

    function initialize() public initializer {
        y = 55;
    }
}

contract TestUpgradableV2 is TestUpgradeBase {
    uint256 public x;
    uint256 public z;

    function initialize(uint256 _x) public initializer {
        TestUpgradeBase.initialize(); // Do not forget this call!
        x = _x;
        z = 77;
    }

    function assign() public {
        x = 47;
        y = 59;
        z = 77;
    }
}