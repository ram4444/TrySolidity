// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;
pragma experimental ABIEncoderV2;

contract CrossContractCallBase {
    
    event TestUint(string _desc, uint _value);
    event TestStr(string _desc, string _value);

    function _testEmitUint(uint _value) public returns (string memory _test) {
        emit TestUint("test",_value);
        return "OK";
    }
    
    function _testcallExternal(string memory _value) public returns (string memory _test) {
        return _value;
    }
}