import React from 'react';
import ViewLayout from '../components/ViewTemplate';
import { MdAdd } from 'react-icons/md';
import DaoCard from '../components/DaoCard';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import { setApiUrl } from '../lib/apiUrl';

type Props = {};

const AllDaos = (props: Props) => {
  const { data: daos, isLoading } = useQuery('allDaos', async () => {
    const { data } = await axios({ url: setApiUrl('/orgs'), method: 'GET' });
    console.log(data);
    return data;
  });

  const navigate = useNavigate();
  return (
    <ViewLayout
      header='All DAOs'
      actions={[
        {
          text: 'Create DAO',
          onClick: () => navigate('/create-dao'),
          icon: <MdAdd className='mr-1' />,
          requiresAuth: true,
        },
      ]}
    >
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {!isLoading &&
          daos &&
          // @ts-ignore
          daos.map(({ _id, name, image, description, members, teams }) => (
            <DaoCard
              key={_id}
              data={{
                id: _id,
                name,
                description,
                image,
                // @ts-ignore
                members: members?.length,
                // @ts-ignore
                teams: teams?.length,
              }}
            />
          ))}
      </div>
    </ViewLayout>
  );
};

export default AllDaos;
