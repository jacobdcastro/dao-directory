import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdPerson, MdDisabledByDefault, MdAdd } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import truncateEthAddress from 'truncate-eth-address';
import ViewLayout from '../components/ViewTemplate';
import { useAuth } from '../hooks/useAuth';
import { setApiUrl } from '../lib/apiUrl';

interface Props {
  selectedDao: string | null;
}

const TableRowUser = ({ id }: { id: string }) => {
  const { data: user, isLoading } = useQuery(['userProfile', id], async () => {
    const { data } = await axios({
      url: setApiUrl(`/user/id/${id}`),
      method: 'GET',
    });
    return data;
  });

  return (
    <tr>
      <td className='text-center'>
        {user?.image ? '' : <MdPerson size={25} className='mx-auto' />}
      </td>
      <td className='text-center text-xl'>{user?.name || 'unnamed'}</td>
      <td className='text-center text-xl'>
        {user?.address && truncateEthAddress(user?.address)}
      </td>
      <td className='text-center'>
        {user?.email || <MdDisabledByDefault size={25} className='mx-auto' />}
      </td>
      <td className='text-center'>
        {user?.twitter || <MdDisabledByDefault size={25} className='mx-auto' />}
      </td>
      <td className='text-center'>
        {user?.instagram || (
          <MdDisabledByDefault size={25} className='mx-auto' />
        )}
      </td>
      <td className='text-center'>
        {user?.discord || <MdDisabledByDefault size={25} className='mx-auto' />}
      </td>
    </tr>
  );
};

const DaoDirectory = () => {
  const [tableShowsAllMembers, setTableShowsAllMembers] = useState(true);
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const { profile } = useAuth();
  const { daoId } = useParams();

  const { data: dao, refetch: refetchDao } = useQuery(
    ['daoDirectory', daoId],
    async () => {
      if (daoId) {
        const { data } = await axios({
          url: setApiUrl(`/orgs/id/${daoId}`),
          method: 'GET',
        });
        return data;
      }
    },
    { cacheTime: 0, enabled: !!daoId }
  );

  const { data: teams, refetch: refetchTeams } = useQuery(
    ['daoTeams', daoId, dao],
    async () => {
      const { data } = await axios({
        url: setApiUrl(`/teams/dao/${daoId}`),
        method: 'GET',
      });
      console.log(data);
      return data;
    }
  );

  const { mutate: createTeam, isLoading: teamCreationLoading } = useMutation(
    async () => {
      const { data } = await axios({
        url: setApiUrl('/teams/new'),
        method: 'POST',
        data: { daoId: dao._id, name: newTeamName },
      });
      return data;
    },
    {
      onSuccess: () => {
        refetchDao();
        setIsAddingTeam(false);
      },
    }
  );

  // @ts-ignore
  const { mutate: joinTeam } = useMutation(
    async (teamName: string) => {
      const { data } = await axios({
        url: setApiUrl('/teams/join'),
        method: 'POST',
        data: { daoId, teamName, userId: profile._id },
      });
      return data;
    },
    {
      onSuccess: async () => {
        refetchDao();
        refetchTeams();
      },
    }
  );

  return (
    <ViewLayout
      header={dao?.name || 'loading...'}
      actions={[
        {
          text: 'Add New Team',
          requiresAuth: true,
          icon: <MdAdd className='mr-1' />,
          onClick: () => setIsAddingTeam(true),
        },
      ]}
    >
      <div className='grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2'>
        <div className='border-2 border-slate-400 p-3 rounded-xl'>
          <h2 className='text-2xl font-bold'>DAO Info</h2>
          <div>
            <p>{dao?.description}</p>
            <p className='mb-2'>
              <span className='font-bold'>Members:</span>{' '}
              <span className='bg-red-200 text-orange-600 font-bold rounded-md p-1'>
                {dao?.members.length}
              </span>
            </p>
            <p className='mb-4'>
              <span className='font-bold'>Teams:</span>{' '}
              <span className='bg-purple-200 text-purple-700 font-bold rounded-md p-1'>
                {teams?.length}
              </span>
            </p>
          </div>
        </div>
        {isAddingTeam && (
          <div className='border-2 border-slate-400 p-3 rounded-xl'>
            <h2 className='text-2xl font-bold'>Add New Team</h2>
            <div>
              <label className='text-lg font-bold'>Team Name</label>
              <input
                className='border border-slate-400 py-2 px-3 rounded-lg w-full my-2'
                type='text'
                placeholder='My Cool DAO'
                onChange={e => setNewTeamName(e.target.value)}
              />
              <button
                className='border-2 rounded-md py-1 px-2 flex items-center'
                onClick={() => createTeam()}
                disabled={teamCreationLoading}
              >
                {teamCreationLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
        <div className='md:col-span-2'>
          <div>
            <button
              className={`${
                tableShowsAllMembers && 'bg-green-300 text-green-900'
              } text-xl font-bold px-5 py-3 mr-2 rounded-t-lg`}
              onClick={() => setTableShowsAllMembers(true)}
            >
              All Members
            </button>
            <button
              className={`${
                !tableShowsAllMembers && 'bg-green-300 text-green-900'
              } text-xl font-bold px-5 py-3 mr-2 rounded-t-lg`}
              onClick={() => setTableShowsAllMembers(false)}
            >
              Teams
            </button>
          </div>
          {tableShowsAllMembers ? (
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Twitter</th>
                  <th>Instagram</th>
                  <th>Discord</th>
                </tr>
              </thead>
              <tbody>
                {!!dao &&
                  dao.members.map((id: string) => (
                    <TableRowUser key={id} id={id} />
                  ))}
              </tbody>
            </table>
          ) : teams?.length > 0 ? (
            teams?.map((team: { name: string }) => (
              <div key={team.name}>
                <div
                  className="bg-green-300 text-green-900'
                }  px-5 py-3 mr-2 rounded-t-lg flex justify-between items-center"
                >
                  <h3 className='text-xl font-bold'>{team.name}</h3>
                  {!teams
                    // @ts-ignore
                    ?.find(t => t.name === team.name)
                    .members?.includes(profile?._id) && (
                    <button
                      className='border-2 border-green-600 rounded-md py-1 px-2 flex items-center'
                      onClick={() => joinTeam(team.name)}
                    >
                      <MdAdd className='mr-1' /> Join Team
                    </button>
                  )}
                </div>
                <div>
                  <table className='table-auto w-full mb-14'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Twitter</th>
                        <th>Instagram</th>
                        <th>Discord</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams
                        // @ts-ignore
                        ?.find(t => t.name === team.name)
                        // @ts-ignore
                        .members.map(id => (
                          <TableRowUser key={id} id={id} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <h2>There are no teams in this DAO!</h2>
          )}
        </div>
      </div>
    </ViewLayout>
  );
};

export default DaoDirectory;
