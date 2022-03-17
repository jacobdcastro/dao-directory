import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.INFURA_RPC_URL_1 as string,
  3: process.env.INFURA_RPC_URL_3 as string,
  4: process.env.INFURA_RPC_URL_4 as string,
};

// Metamask
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4],
});

// Walletconnect
export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 1,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

// Coinbase Wallet
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'DAO Directory',
  supportedChainIds: [1, 3, 4],
});
