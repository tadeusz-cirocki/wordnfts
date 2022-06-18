const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Word NFT", function () {

  let WordNFTFactory;
  let wordNFTContract;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    WordNFTFactory = await ethers.getContractFactory("WordNFT");
    wordNFTContract = await WordNFTFactory.deploy();
    await wordNFTContract.deployed();

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  it("Tokens should be minted to contract", async function () {
    await wordNFTContract.mintWordNFT("aaa bbb");
    await wordNFTContract.mintWordNFT("ccc ddd");
    await wordNFTContract.mintWordNFT("eee fff");
    await wordNFTContract.mintWordNFT("ggg hhh");
    await wordNFTContract.mintWordNFT("iii jjj");

    expect(await wordNFTContract.balanceOf(wordNFTContract.address)).equals(5);
  });

  it("User should be able to buy and get their tokens info", async function () {
    await wordNFTContract.mintWordNFT("aaa bbb");
    await wordNFTContract.mintWordNFT("ccc ddd");
    await wordNFTContract.mintWordNFT("eee fff");
    await wordNFTContract.mintWordNFT("ggg hhh");
    await wordNFTContract.mintWordNFT("iii jjj");

    await wordNFTContract.connect(addr1).buyWordNFT({value: (1e16).toString()});
    await wordNFTContract.connect(addr1).buyWordNFT({value: (1e16).toString()});

    console.log(await wordNFTContract.connect(addr1).yourNftsInfo());
  });

});
