import { erc20Abi } from 'viem';

export const stethContract = {
  address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', // steth
  abi: erc20Abi,
} as const;
export const rethContract = {
  address: '0xae78736Cd615f374D3085123A210448E74Fc6393', // reth
  abi: erc20Abi,
} as const;
export const cbethContract = {
  address: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704', // cbeth
  abi: erc20Abi,
} as const;
export const wbethContract = {
  address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1', // wbeth
  abi: erc20Abi,
} as const;
export const usdcContract = {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc
  abi: erc20Abi,
} as const;
export const usdtContract = {
  address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // usdt
  abi: erc20Abi,
} as const;
export const daiContract = {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', // dai
  abi: erc20Abi,
} as const;
export const wethContract = {
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
  abi: erc20Abi,
} as const;

export const tokens = [
  {
    name: 'rETH',
    contract: rethContract,
    logo: 'https://etherscan.io/token/images/rocketpooleth_32.png',
  },
  {
    name: 'cbETH',
    contract: cbethContract,
    logo: 'https://etherscan.io/token/images/cbeth_32.png',
  },
  {
    name: 'WETH',
    contract: wethContract,
    logo: 'https://etherscan.io/token/images/weth_28.png',
  },
  {
    name: 'USDC',
    contract: usdcContract,
    logo: 'https://etherscan.io/token/images/centre-usdc_28.png',
  },
  {
    name: 'USDT',
    contract: usdtContract,
    logo: 'https://etherscan.io/token/images/tethernew_32.png',
  },
  {
    name: 'DAI',
    contract: daiContract,
    logo: 'https://etherscan.io/token/images/MCDDai_32.png',
  },
  {
    name: 'wbETH',
    contract: wbethContract,
    logo: 'https://etherscan.io/token/images/binancewbeth_32.png',
  },
  {
    name: 'stETH',
    contract: stethContract,
    logo: 'https://etherscan.io/token/images/lido-steth_32.png',
  },
  {
    name: 'ETH',
    contract: null,
    logo: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
  },
];
