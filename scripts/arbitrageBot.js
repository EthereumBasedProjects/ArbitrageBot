import 'ABIConstants.js'    // Constants for ABI
import 'TokenAddresses.js' // Constants for Token Addresses

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
    DAI: new Token( ChainId.MAINNET, DAIAddress, 18 , 'DAI'),
    BAT: new Token( ChainId.MAINNET, BATAddress, 18, 'BAT') ,
    MKR : new Token ( ChainId.MAINNET, MKRAddress, 18, 'MKR')
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

async function getTokenBalanceInBN(address, tokenContract) {
    const balance = await tokenContract.balanceOf(address);
    
    return BigNumber.from(balance);
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

/* Function to connect smart contract to Account Wallet */
function constructContract(smAddress, smABI, privateKey) {
    const signer = new ethers.Wallet(privateKey) ;

    return new ethers.Contract(
            smAddress,
            smABI,
            signer.connect(provider)
        )
}


/* Construct Smart Contracts */
// Tokens
const wethContract = constructContract(Tokens.WETH.address, IERC20_ABI, privateKey);
const daiContract = constructContract(Tokens.DAI.address, IERC20_ABI, privateKey);
const mkrContract = constructContract(Tokens.MKR.address, IERC20_ABI, privateKey);
const batContract = constructContract(Tokens.BAT.address, IERC20_ABI, privateKey);

// DEX
const uniswap = constructContract(
    uniswapAddress,
    uniswapABI,
    privateKey,               
);

const sushiswap  = constructContract(
    sushiswapAddress,
    sushiswapABI,
    privateKey,
);

/* Check and Approve Token Allowance */
async function checkAndApproveTokenForTrade(srcTokenContract, userAddress, srcQty, factoryAddress) {
    console.log(`Evaluating : approve ${srcQty} tokens for trade`);
  
    if (srcTokenContract.address == ETH_ADDRESS) {
      return;
    }
  
    let existingAllowance = await srcTokenContract.allowance(userAddress, factoryAddress);
  
    console.log(`Existing allowance ${existingAllowance}`);
  
    if (existingAllowance.eq(ZERO_BN)) {
      console.log(`Approving contract to max allowance ${srcQty}`);
      
      await srcTokenContract.approve(factoryAddress, srcQty);

    } else if (existingAllowance.lt(srcQty)) {
  
      // if existing allowance is insufficient, reset to zero, then set to MAX_UINT256
  
      //setting approval to 0 and then to a max is suggestible since  if the address already has an approval, 
  
      //setting again to a max would bump into error
  
      console.log(`Approving contract to zero, then max allowance ${srcQty}`);
  
      await srcTokenContract.approve(factoryAddress, ZERO_BN);
      await srcTokenContract.approve(factoryAddress, srcQty);
  
    } 
  
    return;
  }
  