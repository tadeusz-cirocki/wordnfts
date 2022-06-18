require("hardhat/config");

task("mint", "Mints 5 tokens", async (taskArgs, hre) => {
    for (let i = 0; i < 5; i++) {
        const WordNFTFactory = await ethers.getContractFactory("WordNFT");
        const wordNFTContract = await WordNFTFactory.attach("0x0493647f3F63D6a0D035a27FbBb1B84BF4e17B96");
        const tx = await wordNFTContract.mintWordNFT(getWords());
        await tx.wait();
    }
});

task("showContract", "Show contracts nfts", async (taskArgs, hre) => {
    const WordNFTFactory = await ethers.getContractFactory("WordNFT");
    const wordNFTContract = await WordNFTFactory.attach("0x0493647f3F63D6a0D035a27FbBb1B84BF4e17B96");
    console.log(await wordNFTContract.connect(wordNFTContract.address).yourNftInfo(7));
});



function getWords() {
    var fs = require('fs');

    var data = fs.readFileSync('words.txt', 'utf8');
    const arrayOFWords = data.split(/\r?\n/);
    const words = arrayOFWords[getRandomIntInclusive(1, 2048)] + " " + arrayOFWords[getRandomIntInclusive(1, 2048)];
    return words;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}