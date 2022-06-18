require("@nomiclabs/hardhat-waffle");
require("./tasks/mint");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/u3BWiyCBmJjrRTqDdPbO9N9lfRQe0HFh',
      accounts: ['a721d906e5b71da1b6467b6c80ed156b98c628878771281b265e00ba5bedf692']
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/u3BWiyCBmJjrRTqDdPbO9N9lfRQe0HFh',
      accounts: ['a721d906e5b71da1b6467b6c80ed156b98c628878771281b265e00ba5bedf692'],
    },
  },
};
