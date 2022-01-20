/* Import Ether Contract Lib */
const ethers = require( 'ethers' );

/* Import BigNumber to Handle Small Units (wei) */
const BigNumber = ethers.BigNumber;

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
    WETH: WETH [ChainId.MAINNET],
    DAI: new Token( ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18 , 'DAI'),
    BAT: new Token( ChainId.MAINNET, '0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914', 18, 'BAT') ,
    MKR : new Token ( ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR')
};


/* Retrieve Account Wallet */
const wallet  = getWallet(privateKey);
function getWallet(privateKey) {
    return new ethers.Wallet(privateKey, provider)
}

/* Gets Transaction Deadline for 10Min from Now */
const getDeadlineAfter = delta =>
    Math.floor(Date.now() / 1000) + (60 * Number.parseInt(delta, 10));

/* Numer to Hex */
const toHex = n => `0x${ n.toString( 16 ) }`;

/* Retrieve balance of given address & token */
async function getTokenBalance(address, tokenContract) {
    const balance = await tokenContract.balanceOf(address);
    const decimals = await tokenContract.decimals();

    return ethers.utils.formatUnits(balance, decimals);
}

/* Print Account Balance in Human Readable Form*/
async function printAccountBalance(address, privateKey) {
    const balance = await provider.getBalance(address);
    const wethBalance = await getTokenBalance(address, wethContract);
    const daiBalance = await getTokenBalance(address, daiContract);
    const mkrBalance = await getTokenBalance(address, mkrContract);
    const batBalance = await getTokenBalance(address, batContract);

    console.log(`Account balance: ${ethers.utils.formatUnits(balance,18)} ethers, ${wethBalance} weth, ${daiBalance} DAI, ${mkrBalance} MKR, ${batBalance} BAT`);
}
