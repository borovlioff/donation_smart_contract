import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import "solidity-coverage";
import {access} from "fs";

access("./artifacts", function(error){
    if (error) {
      console.log("Need compile artifacts\nStart: npx hardhat compile")
    } else {
        require("./tasks")
    }
});

const config: HardhatUserConfig = {
  networks:{
    hardhat:{
    },
    ganache:{
      url: process.env.GANACHE_URL||"http://127.0.0.1:7545",
      accounts:{
        mnemonic:process.env.GANACHE_MNEMONIK ||"",
        path:process.env.GANACHE_PATH ||"",
      }
    },
    rinkeby:{
      url: process.env.INFURA_URL||"",
      accounts:[`0x${process.env.PRIVATE_KEY}`]
    }
  },
  solidity: {
    version:"0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
}

export default config;