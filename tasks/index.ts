import { AbiItem } from 'web3-utils'
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-web3";
import Donation from "../artifacts/contracts/Donation.sol/Donation.json"
import Web3 from 'web3';


function initContract({web3, address}:{web3:Web3, address:string}){
  return new web3.eth.Contract(Donation.abi as AbiItem[], address )
}

task("pay", "Make a donation")
.addParam("account", "The account's address")
.addParam("to", "Amount")
.addParam("amount", "Amount")
.setAction( async (_, { web3 }) => {
  let { account , to , amount } = _;
  let res = await web3.eth.sendTransaction({from: account, to:to, value: amount});
  console.log(res);
})

task("transactOf", "Withdraw funds from the contract")
.addParam("account", "account address")
.addParam("contract", "contract address")
.addParam("recipient", "transfer recipient")
.addParam("amount", "Amount wei")
.setAction( async (_, { web3 }) => {
  let { account , contract ,recipient, amount } = _;
  let donation = initContract({web3, address:contract});
  let res = await donation.methods.transactOf(recipient,amount).send({from: account});
  console.log(res);
})

task("getDonators", "Get a list of donors")
.addParam("account", "account address")
.addParam("contract", "contract address")
.setAction( async (_, { web3 }) => {
  let { account , contract  } = _;
  let donation = initContract({web3, address:contract});
  let res = await donation.methods.getDonators().call({from: account });
  console.log(res);
});

task("getDonatByAddress", "Get donation amount by address")
.addParam("account", "account address")
.addParam("contract", "contract address")
.addParam("donor", "donor address")
.setAction( async (_, { web3 }) => {
  let { account , contract, donor  } = _;
  let donation = initContract({web3, address:contract});
  let res = await donation.methods.getDonatByAddress(donor).call({from: account });
  console.log(res);
})

