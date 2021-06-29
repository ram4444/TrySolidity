// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract TestERC721 is ERC721Upgradeable {
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual override
    {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "ERC721WithSafeTransfer: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        
    }

    function initialize(IERC721Upgradeable _token) public initializer {
        //token = _token;
    }

    
}