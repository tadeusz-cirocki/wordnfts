// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const WordNFTFactory = await ethers.getContractFactory("WordNFT");
  const wordNFTContract = await WordNFTFactory.deploy();
  await wordNFTContract.deployed();

  console.log("WordNFTContract deployed to:", wordNFTContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
