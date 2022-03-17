import React from 'react';

type Props = { showConnectModal: () => void };

const ConnectButton = ({ showConnectModal }: Props) => {
  return (
    <button
      className='border-2 rounded-md py-1 px-2'
      onClick={() => showConnectModal()}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
