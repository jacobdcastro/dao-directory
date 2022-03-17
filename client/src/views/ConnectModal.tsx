import { useWeb3React } from '@web3-react/core';
import React, { FC, useEffect } from 'react';
import { useConnectWallet } from '../hooks/connectWallet';

interface Props {
  onClose: () => void;
}

const ConnectModal: FC<Props> = ({ onClose }) => {
  const { connectWallet } = useConnectWallet();
  const { active } = useWeb3React();

  useEffect(() => {
    if (active) onClose();
  }, [active, onClose]);

  const connectorNames: ('metamask' | 'coinbase' | 'walletconnect')[] = [
    'metamask',
    // 'walletconnect',
    // 'coinbase',
  ];

  return (
    <div className='absolute z-10 h-screen w-screen backdrop-blur-md flex items-center justify-center flex-col'>
      <h1 className='text-3xl font-bold text-center mb-2'>
        Connect Wallet
        <br />
        To Get Started
      </h1>
      <div className='flex flex-col'>
        {connectorNames.map(conn => (
          <button
            key={conn}
            className='p-8 my-2 border border-slate-500 w-72 rounded-lg'
            onClick={() => connectWallet(conn)}
          >
            {conn === 'metamask'
              ? 'Metamask'
              : conn === 'coinbase'
              ? 'Coinbase Wallet'
              : conn === 'walletconnect'
              ? 'Walletconnect'
              : null}
          </button>
        ))}
        <button className='text-lg underline p-3' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConnectModal;
