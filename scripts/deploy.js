
const main = async () =>{
    const contractFactory = await ethers.getContractFactory('Library');

    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log(`The address of the contract is ${contract.address}`);
    // 0x908e08B0882C984A4E013384874E9DF857766299
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});