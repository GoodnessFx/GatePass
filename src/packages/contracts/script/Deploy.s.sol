// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/EventTicketFactory.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address platformFeeRecipient = vm.envAddress("PLATFORM_FEE_RECIPIENT");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the factory contract
        EventTicketFactory factory = new EventTicketFactory(platformFeeRecipient);

        console.log("EventTicketFactory deployed to:", address(factory));
        console.log("Implementation contract:", factory.getImplementation());
        console.log("Platform fee recipient:", factory.platformFeeRecipient());
        console.log("Platform fee (bps):", factory.platformFeeBps());

        vm.stopBroadcast();

        // Write deployment info to file
        string memory deploymentInfo = string(
            abi.encodePacked(
                "{\n",
                '  "factory": "', vm.toString(address(factory)), '",\n',
                '  "implementation": "', vm.toString(factory.getImplementation()), '",\n',
                '  "platformFeeRecipient": "', vm.toString(platformFeeRecipient), '",\n',
                '  "platformFeeBps": ', vm.toString(factory.platformFeeBps()), ',\n',
                '  "network": "', vm.envString("NETWORK_NAME"), '",\n',
                '  "deployedAt": ', vm.toString(block.timestamp), '\n',
                "}"
            )
        );

        vm.writeFile("./deployments/latest.json", deploymentInfo);
        console.log("Deployment info saved to ./deployments/latest.json");
    }
}

contract CreateTestEvent is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address factoryAddress = vm.envAddress("FACTORY_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        EventTicketFactory factory = EventTicketFactory(factoryAddress);

        // Create a test event
        address eventContract = factory.createEvent(
            "PassMint Demo Concert",
            "PMDC",
            1000, // 1000 tickets
            0.01 ether, // 0.01 ETH per ticket
            block.timestamp, // Sale starts now
            block.timestamp + 7 days, // Sale ends in 7 days
            block.timestamp + 14 days, // Event in 14 days
            "https://api.passmint.com/metadata/"
        );

        console.log("Test event created:");
        console.log("Event contract:", eventContract);
        console.log("Organizer:", vm.addr(deployerPrivateKey));
        
        EventTicket eventTicket = EventTicket(eventContract);
        console.log("Event name:", eventTicket.name());
        console.log("Total supply:", eventTicket.totalSupply());
        console.log("Ticket price:", eventTicket.ticketPrice());

        vm.stopBroadcast();
    }
}