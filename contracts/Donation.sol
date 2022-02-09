//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


contract Donation {
    address public owner;
    address private charityService;
    struct Donator{
      bool isDonator;
      uint[] sum;
    }

    mapping(address => Donator) private donations;

    address[] private donators;

    constructor() {
        owner = msg.sender;
        charityService = address(this);
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

   

    receive() external payable {
        Donator storage donator = donations[msg.sender];
        if(donator.isDonator != true){
            donator.isDonator = true;
            donators.push(msg.sender);
        }
        donator.sum.push(msg.value);
    }


    function transactOf(address to, uint amount) public payable onlyOwner {
        require( charityService.balance != 0 , "No money");
        require( address(charityService).balance >= amount , "Insufficient funds");

        address payable receiver = payable(to);
        receiver.transfer(amount);
    }

    function getDonators() external view returns(address[] memory){
        return donators;
    }

    function getDonatByAddress(address _address) external view returns(uint){
        Donator memory donator = donations[_address];
        uint total;

        for(uint index = 0; index < donator.sum.length; index++){
            total+= donator.sum[index];
        }

        return total;
    }

}
