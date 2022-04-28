const { ethers } = require("ethers");

const dotenv = require('dotenv');
dotenv.config();

const INFURA_ID = process.env.MAINNET_INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

// DAI contract etherscan address: https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
// Contract ABI is a big json string, or can be simplified as below by providing the ERC20 contract interface
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)

    const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700')

    console.log(`Balance Returned: ${balance}`)
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

main()