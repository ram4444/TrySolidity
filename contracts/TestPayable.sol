// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestPayable is Ownable{
    
    event evtEmit(string _test);

    receive() external payable {} 

    function passEther() public payable {
        payable(owner()).transfer(msg.value);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function drycall() public {
        
    }

    function testEmit() public {
        emit evtEmit("from Event");    
    }

    function testPayableEmit(string memory str) public {
        emit evtEmit(str);    
    }
    
}