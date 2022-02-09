
# Donation
Donation deployed to:
https://rinkeby.etherscan.io/address/0xCceA5e4D2F630359786Cf4761F460a4147FAF3FA


## Start

```bash
  npm run compile
```


## Coverage

```bash
  npm run coverage
```
    
## Hard task

Make a donation
```bash
  npx hardhat pay --account <account address> --to <contract address> --amount <amount wei> --network rinkeby
```

Get a list of donors
```bash
  npx hardhat getDonators --account <account address> --contract <contract address> --network rinkeby
```

Get donation amount by address
```bash
  npx hardhat getDonatByAddress --account <account address> --contract <contract address> --donor <donor address> --network rinkeby
```

Withdraw funds from the contract
```bash
  npx hardhat transactOf --account <account address> --contract <contract address> --recipient <transfer recipient> --amount <amount wei> --network rinkeby
```


