/* Import Ether Contract Lib */
const ethers = require( 'ethers' );

/* Uniswap Classes */
const {
    Fetcher,    // Methods for constructing token pair instances
    Token,
    WETH,
    ChainId,
    TradeType,
    Percent,
    Route,      // Token pair path
    Trade,
    TokenAmount,
} = require( '@uniswap/sdk' );

/* Connection Params to HardHat Local Fork */
const providerURL = 'http://localhost:8545'; 
const provider = new ethers.providers.JsonRpcProvider( providerURL );
const localTestAccountAddress = '';
const privateKey = '';