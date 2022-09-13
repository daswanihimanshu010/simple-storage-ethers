// Compiling our contracts in our javascript project

Whatever we our doing here is equal to pressing compile button in remix.
Tool: https://github.com/ethereum/solc-js
solcjs: To compile a contract that imports other contracts via relative paths
The solc version should be same that of contract version "0.8.8".
To compile the contract separately:
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol

// Deploying the contract

We used to deploy on remix wither on Javascript VM (Fake blockchain) or Injected Web3 (Metamask, test net)
Hardhat runtime environment / Ganache can be used for our Javascript VM aka fake blockchain

// We can make different calls to our blockchain node to get different type of information

Visit: https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false

To interact with blockchain node, making api calls or deploying or fetching information we need a wrapper. This is where ethers.js, web3.js comes into play.

// Deploying your own blockchain node

Visit: https://github.com/ethereum/go-ethereum

// Introduction to ethers.js

Visit: https://docs.ethers.io/v5/getting-started/

1. const keyword is used when its value can't be changed
2. require is used import external packages

// While Deploying keep in mind about the Promise

https://docs.ethers.io/v5/api/contract/contract-factory/#ContractFactory-deploy

contractFactory.deploy( ...args [ , overrides ] ) ⇒ Promise< Contract >

Uses the signer to deploy the Contract with args passed into the constructor and returns a Contract which is attached to the address where this contract will be deployed once the transaction is mined.

The transaction can be found at contract.deployTransaction, and no interactions should be made until the transaction is mined.

If the optional overrides is specified, they can be used to override the endowment value, transaction nonce, gasLimit or gasPrice.

// Ganache not running? try: https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/1089

// Gasprice, gaslimit, gasfee ?

Gas fees are payments made by users to compensate for the computing energy required to process and validate transactions on the Ethereum blockchain. "Gas limit" refers to the maximum amount of gas (or energy) that you're willing to spend on a particular transaction. A higher gas limit means that you must do more work to execute a transaction using ETH or a smart contract.

When confirming a transaction in MetaMask you will need to edit the Gas Fee which is made up of 2 things:

Gas Limit - the maximum amount of gas that you’re willing to pay to run a transaction

Gas Price - the amount you want to pay per unit of gas as a fee to the miner. This is the amount of ETH you are willing to pay for each unit of gas consumed.

Miners set the price of gas based on supply and demand for the computational power of the network needed to process smart contracts and other transactions. Gas prices are denoted in gwei.

Each Gwei is equal to 0.000000001 ETH (10-9 ETH) so, instead of saying that your per unit cost of gas is 0.000000001 ETH, you can say it's 1 Gwei.

// Better Private key and .env management with security:
Watch video from 7:40:00 to 7:54:00

// Alchemy is used to setup a real test net environment and deploy our code from our local to a real node

// Unclear & high priority
https://ethereum.stackexchange.com/questions/113590/im-getting-error-exceeds-block-gas-limit-despite-my-gas-limit-being-very-low
