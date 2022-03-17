import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, walletlink } from '../lib/connectors';
import { useConnectWallet } from '../hooks/connectWallet';

const Connect = () => {
  const { connectWallet } = useConnectWallet();
  return (
    <div className='h-full w-full flex items-center justify-center flex-col'>
      <h1 className='text-3xl font-bold text-center'>
        Connect Wallet
        <br />
        To Get Started
      </h1>
      <div className='flex flex-col'>
        <button onClick={() => connectWallet('metamask')}>MetaMask</button>
        <button onClick={() => connectWallet('walletconnect')}>
          Walletconnect
        </button>
        <button onClick={() => connectWallet('coinbase')}>
          Coinbase Wallet
        </button>
      </div>
    </div>
  );
};

export default Connect;
