// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Usage {
    struct UserInfo {
        address user;
    }

    mapping(address => bytes32) public usageHashes;

    function setUsage(bytes32 usageHash) public {
        require(usageHash != bytes32(0), "Invalid usage hash");
        usageHashes[msg.sender] = usageHash;
    }

    function getUsage() public view returns (bytes32) {
        return usageHashes[msg.sender];
    }


}
