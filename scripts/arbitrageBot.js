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

/* Smart Contract Address for Mainnet ERC20 Tokens */
const Tokens = {
    WETH: WETH\[ ChainId.MAINNET \],
    DAI: new Token( ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18 , 'DAI'),
    BAT: new Token( ChainId.MAINNET, '0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914', 18, 'BAT') ,
    MKR : new Token ( ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR')
};
