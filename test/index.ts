import { expect } from "chai";
import { ethers } from "hardhat";
import { Donation, Donation__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("Token contract", () => {
  let Donation: Donation__factory;
  let donation: Donation;
  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress;
  let other;

  beforeEach(async () => {
    Donation = (await ethers.getContractFactory(
      `Donation`
    )) as Donation__factory;
    donation = await Donation.deploy();
    [owner, addr1, addr2, ...other] = await ethers.getSigners();
  });

  describe(`Deployment`, async () => {
    it(`Should set the right owner`, async () => {
      expect(await donation.owner()).to.equal(owner.address);
    });
  });

  describe(`Transactions`, async () => {
    it(`The ability to receive eth`, async () => {
     await expect(
        await addr1.sendTransaction({ to: donation.address, value: 200 })
      ).to.changeEtherBalance(donation, 200);
    });

    it(`The ability to send ether from contract`, async () => {
        await addr1.sendTransaction({ to: donation.address, value: 200 });
     
        expect(
          await donation.connect(owner).transactOf(addr1.address, 200)
        ).to.changeEtherBalance(addr1, 200);
    });

    it(`Only the owner can transfer contributions`, async () => {
        await addr1.sendTransaction({ to: donation.address, value: 200 });
     
        expect(
          donation.connect(addr1).transactOf(addr1.address, 200)
        ).to.be.revertedWith("Only owner can call this function.");
    });

    it(`Only the owner can transfer contributions`, async () => {
      expect(
        donation.connect(owner).transactOf(addr1.address, 200)
      ).to.be.revertedWith("No money");
    });

    it(`Transfer with 0 funds`, async () => {
      expect(
        donation.connect(owner).transactOf(addr1.address, 200)
      ).to.be.revertedWith("No money");
    });

    it(`Transfer with a lack of balance`, async () => {
      await addr1.sendTransaction({ to: donation.address, value: 200 });

      expect(
        donation.connect(owner).transactOf(addr1.address, 201)
      ).to.be.revertedWith("Insufficient funds");
    });

  });

  describe(`Contract logic`, async () => {
    it(`Add account in list`, async () => {
      await addr1.sendTransaction({ to: donation.address, value: 200 });
      const donatorAcc = await donation.connect(addr1).getDonators();
      expect(donatorAcc[0]).to.equal(addr1.address);
    });

    it(`Getting the amount of contributions of a specific address`, async () => {
      const summ = [100, 200];
      await addr1.sendTransaction({ to: donation.address, value: summ[0] });
      await addr1.sendTransaction({ to: donation.address, value: summ[1] });
      const donatorSumm = await donation.connect(addr1).getDonatByAddress(addr1.address);
      expect(donatorSumm).to.equal(summ[0] + summ[1]);
    });

  });

});
