import React from 'react';
import ConnectButton from '../ConnectButton';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className='bg-white h-14 flex items-center justify-between border-b-2 border-r-slate-100 px-4'>
      <h1 className='text-slate-700'>DAO Directory</h1>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
