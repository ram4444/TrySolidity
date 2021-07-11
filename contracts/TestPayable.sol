// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestPayable is Ownable{
    
    receive() external payable {} 

    function passEther() public payable {
        payable(owner()).transfer(msg.value);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
}