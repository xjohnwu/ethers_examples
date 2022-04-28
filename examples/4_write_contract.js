const { ethers } = require("ethers");

const dotenv = require('dotenv');
dotenv.config();

const INFURA_ID = process.env.KOVAN_TEST_INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = process.env.KOVAN_ADDRESS_FROM // Your account address 1
const account2 = process.env.KOVAN_ADDRESS_TO // Your account address 2

const privateKey1 = process.env.KOVAN_PRIVATE_KEY // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0xa36085F69e2889c224210F603D836748e7dC0088'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)
    /*
{
  type: 2,
  chainId: 42,
  nonce: 1,
  maxPriorityFeePerGas: BigNumber { _hex: '0x9502f900', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x9502f90e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0xccea', _isBigNumber: true },
  to: '0xa36085F69e2889c224210F603D836748e7dC0088',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  data: '0xa9059cbb000000000000000000000000e47a08ea5a539d568822e36fa49e400ede6c17100000000000000000000000000000000000000000000000008ac7230489e80000',
  accessList: [],
  hash: '0x514c06bf8ccc0f95a7d396d1db7a7d60e0f990e689caa9b99ddcc259b7995268',
  v: 0,
  r: '0xacbf8ddb6b718d26fe27c7bbe9e5afecec9af96895438c3798a733e852a7e0fd',
  s: '0x56ab95d8763c5cfe07fd3d5ecd81c14f9fa018a63fee74cd084eca942ce1ebb2',
  from: '0x5bf80fCDf7eDAf2a06f109076a793eD9E62EA312',
  confirmations: 0,
  wait: [Function (anonymous)]
}
    */

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()