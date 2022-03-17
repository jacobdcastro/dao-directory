import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import ViewLayout from '../components/ViewTemplate';
import { setApiUrl } from '../lib/apiUrl';

interface Props {
  selectedDao: string | null;
}

const DaoDirectory = ({ selectedDao }: Props) => {
  const navigate = useNavigate();
  const { data: dao, isLoading } = useQuery([selectedDao], async () => {
    const { data } = await axios({
      url: setApiUrl(`/orgs/${selectedDao}`),
      method: 'GET',
    });
    return data;
  });

  console.log({ selectedDao, dao });

  useEffect(() => {
    if (!selectedDao) navigate('/daos');
  }, [navigate, selectedDao]);

  return (
    <ViewLayout header={dao?.name || 'loading...'}>
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

export default DaoDirectory;
