// synchronous [solidity]
// asynchronous [javascript]

// cooking

// synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in microwave
// 2. Pour drinks for everyone
// 3. Wait for popcorn

// Promise
// Pending
// Success
// Rejected

const ethers = require("ethers"); // to connect our smart contract
const fs = require("fs"); // filesystem package
require("dotenv").config();

async function main() {
  // deploy a contract? Wait for it to be deployed: await keyword
  // if we don't use async keyword, and call contract.deploy -> wouldn't wait for it to finish

  const provider = new ethers.providers.JsonRpcProvider(
    process.config.RPC_URL //  RPC
  );

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // private key
  // After compilation we get abi and binary, compile via yarn compile, see scripts

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // To setup wallet using encrypted key, without using private key and provate key password in env file
  //const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8");
  // we used let here and not const because we have to connect the wallet to provider
  // and whatever we defined as const cannot be changed again
  // let wallet1 = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet1 = await wallet1.connect(provider);
  // While deploying we have to pass PRIVATE_KEY_PASSWORD=password node deploy.js
  //in terminal as PRIVATE_KEY_PASSWORD is not defined in env file

  // Contractfactory has info about contract which needs to be deployed
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  // await is necessary here, because we cannot interact with "const contract" till the contract is
  // deployed. A promise is there in return that cannot be pending. A await keyword sis avaliable
  // in only async functions.

  // here is returing a promise of contract which needs to be resolved for us to interact with.
  // contractFactory.deploy( ...args [ , overrides ] ) ⇒ Promise< Contract >

  const contract = await contractFactory.deploy();

  // contract object will come with all the functionality of our smart contract described in our abi
  // That is we passed our abi in above contractFactory object
  console.log(`Contract deployed to ${contract.address}`);

  // We can also override the deploy function by using override
  // const contract = await contractFactory.deploy({
  //   gasPrice: ethers.utils.parseUnits("50", "gwei"),
  //   value: ethers.utils.parseUnits("0.04", "ether"),
  // });

  // You will get a contract receipt only when you will have 1 block confirmation.

  // wait for one block confirmation
  const transactionReceipt = await contract.deployTransaction.wait(1);

  // We can get contract deployment response from contract.deployTransaction without any wait
  //console.log("Here is the deployment transaction: (transaction response): ");
  //console.log(contract.deployTransaction);

  //console.log("Here is the transaction receipt: ");
  // transaction receipt has more relatable information of the transaction
  //console.log(transactionReceipt);

  const getFavouriteNumber = await contract.retrieve();
  console.log(`Current favourite number : ${getFavouriteNumber.toString()}`);
  // We need to convert the number to string because the result is BigNumber which javascript cannot
  // read large numbers

  const storeNumber = await contract.store_with_gas("10");
  await storeNumber.wait(1);

  const newFavouriteNumber = await contract.retrieve();
  // We need to pass the integer in form of string because again javascript cannot read large numbers
  // So we have convert it into string because it is smart enough to know the input passed is integer
  console.log(`Current favourite number : ${newFavouriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
