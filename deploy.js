require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const deployedContract = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({
      from: accounts[0],
      gas: 1000000,
    });

  console.log('Contract deployed to : ', deployedContract.options.address);
  provider.engine.stop();
};

deploy();