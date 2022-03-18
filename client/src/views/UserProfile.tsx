import React from 'react';
import { useWeb3React } from '@web3-react/core';
import truncateEthAddress from 'truncate-eth-address';
import ViewLayout from '../components/ViewTemplate';
import { useAuth } from '../hooks/useAuth';
import { MdEdit } from 'react-icons/md';
import DaoCard from '../components/DaoCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { setApiUrl } from '../lib/apiUrl';

const UserProfileCard = ({ daoId }: { daoId: string }) => {
  const { data: dao } = useQuery(['usersDaos', daoId], async () => {
    const { data } = await axios({
      url: setApiUrl(`/orgs/id/${daoId}`),
      method: 'GET',
    });
    return data;
  });

  return !!dao ? (
    <DaoCard
      data={{ ...dao, members: dao.members.length }}
      removeTeams
      joined
    />
  ) : null;
};

const UserProfile = () => {
  const { account } = useWeb3React();
  const { profile } = useAuth();
  console.log(profile?.memberships);
  return (
    <ViewLayout
      header={account ? truncateEthAddress(account) : 'My Profile'}
      actions={
        [
          // {
          //   text: 'Edit Profile',
          //   onClick: () => console.log('Edit Profile'),
          //   icon: <MdEdit className='mr-1' />,
          // },
        ]
      }
    >
      {/* <div className='grid gap-4 md:gap-7 grid-cols-1'>
        <div className='border-2 border-slate-400 p-3 rounded-xl'>
          <h2 className='text-2xl font-bold'>Profile</h2>
          <div>
            <p>Bio</p>
            <p>Members</p>
            <p>Teams</p>
          </div>
        </div> */}

      <div className='md:col-span-2'>
        <h2 className='text-2xl font-bold mb-5'>My DAO Memberships</h2>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {profile?.memberships?.map(daoId => (
            <UserProfileCard key={daoId} daoId={daoId} />
          ))}
        </div>
      </div>
      {/* </div> */}
    </ViewLayout>
  );
};

export default UserProfile;
