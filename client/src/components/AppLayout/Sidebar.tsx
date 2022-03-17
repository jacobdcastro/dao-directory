// @ts-nocheck
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { setApiUrl } from '../../lib/apiUrl';

type Props = { daoId: string; profile: any };

const DaoItem = ({ daoId, profile, selectDao }: Props) => {
  const { data: dao } = useQuery([daoId, profile], async () => {
    if (daoId) {
      const { data } = await axios({
        url: setApiUrl(`/orgs/id/${daoId}`),
        method: 'GET',
      });
      return data;
    }
  });

  return (
    <button
      className='bg-blue-500 w-11 h-11 rounded-full mb-2'
      onClick={() => selectDao(daoId.id)}
    >
      {dao && <img src={dao.image} className='rounded-full' />}
    </button>
  );
};

const Sidebar = () => {
  const { profile, selectDao } = useAuth();
  const daos = profile ? profile?.memberships : [];

  return (
    <div className='bg-white flex flex-col w-16 h-screen py-3 items-center border-r-2 border-r-slate-100'>
      {daos.map(daoId => (
        <DaoItem
          key={daoId}
          daoId={daoId}
          profile={profile}
          selectDao={selectDao}
        />
      ))}
    </div>
  );
};

export default Sidebar;
