// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

// To redeploy
//npx truffle migrate --reset
contract TestPayable is Ownable{
    
    event evtEmit(string _test);

    receive() external payable {} 

    function passEther() public payable {
        payable(owner()).transfer(msg.value);
    }

    function withdraw() external onlyOwner {
        return payable(owner()).transfer(address(this).balance);
    }

    function testEmit() public {
        emit evtEmit("from Event");    
    }

    function testPayableEmit(string memory str) public {
        emit evtEmit(str);    
    }

    function testPayableReturn(string memory str) pure public returns (string memory rtn){
        return string(abi.encodePacked("return: ", str));
    }
    
}