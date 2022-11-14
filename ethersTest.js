const { ethers, BigNumber, ContractFactory } = require("ethers")
const fs = require("node:fs")
require("dotenv/config")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const abi = fs.readFileSync("./SimpleStorag_sol_SimpleStorage.abi", "utf-8")
    const bin = fs.readFileSync("./SimpleStorag_sol_SimpleStorage.bin", "utf-8")
    const fileExists = fs.existsSync("address.txt")
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    let contractAddress
    let simpleStorageContract
    if (fileExists) {
        console.log("contract already exists in network..")
        contractAddress = fs.readFileSync("address.txt", "utf-8")
        simpleStorageContract = new ethers.Contract(
            contractAddress,
            abi,
            wallet
        )
    } else {
        const simpleStorageFactory = new ethers.ContractFactory(
            abi,
            bin,
            wallet
        )
        simpleStorageContract = await simpleStorageFactory.deploy()
        console.log("deploying contract...")
        await simpleStorageContract.deployTransaction.wait(1)
        contractAddress = simpleStorageContract.address
        console.log(
            `contract deployed succesfully, contract address: ${contractAddress}`
        )
        fs.writeFileSync("address.txt", contractAddress, "utf-8")
    }
    console.log("updating storage value to 10...")
    const tx = await simpleStorageContract.updateStorage("10")
    await tx.wait(1)
    console.log("reading storage value...")
    const storageValue = await simpleStorageContract.getStorage()
    console.log(`storageValue: ${storageValue.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
