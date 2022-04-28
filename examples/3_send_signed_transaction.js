const { ethers } = require("ethers");

const dotenv = require('dotenv');
dotenv.config();

const INFURA_ID = process.env.KOVAN_TEST_INFURA_ID
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = process.env.KOVAN_ADDRESS_FROM // Your account address 1
const account2 = process.env.KOVAN_ADDRESS_TO // Your account address 2

const privateKey1 = process.env.KOVAN_PRIVATE_KEY // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.001")
    })

    await tx.wait() // wait for the transaction to be mined
    console.log(tx)
    /*
{
  type: 2,
  chainId: 42,
  nonce: 0,
  maxPriorityFeePerGas: BigNumber { _hex: '0x9502f900', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x9502f90e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
  to: '0xe47A08Ea5A539d568822E36FA49E400EDe6c1710',
  value: BigNumber { _hex: '0x038d7ea4c68000', _isBigNumber: true },
  data: '0x',
  accessList: [],
  hash: '0x9051c4a3bd6cf8ea03c754dc3d6321b87ba080c4fbb238ca519a087a9763adbf',
  v: 0,
  r: '0x077b47d1e6034f7777bb56ba63e255900ad4e0af799e360dc6ce8a21f80dc088',
  s: '0x0e6c5e1fea3355e1e724bce5f2262e7dbe07ab715462bb390651f1622cc423ed',
  from: '0x5bf80fCDf7eDAf2a06f109076a793eD9E62EA312',
  confirmations: 0,
  wait: [Function (anonymous)]
}
    */

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()