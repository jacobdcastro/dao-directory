import React from 'react';
import { useWeb3React } from '@web3-react/core';
import truncateEthAddress from 'truncate-eth-address';
import ConnectButton from '../ConnectButton';
import { MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = { showConnectModal: () => void };

const Navbar = ({ showConnectModal }: Props) => {
  const { account } = useWeb3React();

  return (
    <div className='bg-white h-14 flex items-center justify-between border-b-2 border-r-slate-100 px-4'>
      <Link to='/daos'>
        <h1 className='text-slate-700 font-bold text-2xl'>DAO Directory</h1>
      </Link>
      <div>
        {account ? (
          <Link to='/profile'>
            <p className='flex items-center border-2 rounded-md py-1 px-2'>
              <MdPerson className='mr-1' color='rgb(51 65 85)' />
              {truncateEthAddress(account)}
            </p>
          </Link>
        ) : (
          <ConnectButton showConnectModal={showConnectModal} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
