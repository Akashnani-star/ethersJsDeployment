// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract SimpleStorage {
    uint256 public storageValue;

    function getStorage() public view returns (uint256) {
        return storageValue;
    }

    function updateStorage(uint256 number) public {
        storageValue = number;
    }
}
