import { useWeb3React } from '@web3-react/core';
import React from 'react';
import truncateEthAddress from 'truncate-eth-address';
import ViewLayout from '../components/ViewTemplate';

const UserProfile = () => {
  const { account } = useWeb3React();
  // const hi = useQu;
  return (
    <ViewLayout header={account ? truncateEthAddress(account) : 'My Profile'}>
      <div className='grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2'>
        <div className='border-2 border-slate-400 p-3 rounded-xl'>
          <h2 className='text-2xl font-bold'>DAO Info</h2>
          <div>
            <p>Description</p>
            <p>Date Created</p>
            <p>Members</p>
            <p>Teams</p>
          </div>
        </div>
        <div className='border-2 border-slate-400 p-3 rounded-xl'>
          <h2 className='text-2xl font-bold'>Admin</h2>{' '}
          <div>
            <p>Add Member</p>
            <p>Edit Description</p>
            <p>Change Name</p>
          </div>
        </div>
        <div className='md:col-span-2'>
          <h2 className='text-2xl font-bold'>Members</h2>
        </div>
      </div>
    </ViewLayout>
  );
};

export default UserProfile;
