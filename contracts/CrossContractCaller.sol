// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;
pragma experimental ABIEncoderV2;

import "./CrossContractCallBase.sol";

contract CrossContractCaller {

    address pointAddress;

    event TableOwner(address _address);
    event ForTest(string _test);

    constructor(address _add){
        pointAddress = _add;
    }

    function _method1() public returns (string memory name){
        string memory rtn = CrossContractCallBase(pointAddress)._testcallExternal("abc");
        //string memory rtn = "abc";
        emit ForTest(rtn);
        return rtn ;
    }

}