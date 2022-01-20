/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const LOCAL_URL = "http://127.0.0.1:8545/"; 

const PRIVATE_KEY = '';

module.exports = {

  solidity: "0.7.3",

  networks: {

    local: {

      url: LOCAL_URL,

      accounts: \[PRIVATE_KEY\]

    }

  }

};
