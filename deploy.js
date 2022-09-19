require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  'https://rinkeby.infura.io/v3/7f1c03c7ed694d4992e47d47a44083b4'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
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