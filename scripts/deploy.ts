import { Donation, Donation__factory } from "../typechain-types";
import { ethers } from "hardhat";

async function main() {

  const Donation = await ethers.getContractFactory("Donation") as Donation__factory;
  const donation:Donation = await Donation.deploy();

  await donation.deployed();
  console.log("Donation deployed to:", donation.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
