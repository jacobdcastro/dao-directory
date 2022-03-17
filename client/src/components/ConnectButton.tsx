import React from 'react';

type Props = {};

const ConnectButton = (props: Props) => {
  return (
    <button
      className='border-2 rounded-md py-1 px-2'
      onClick={() => console.log('Connecting!!')}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
