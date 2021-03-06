import React from 'react';
import { MdPersonAddAlt, MdVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = { data: any; removeTeams?: boolean; joined?: boolean };

const DaoCard = ({ data, removeTeams, joined }: Props) => {
  const { name, description, members, teams, image, id } = data;
  const { profile, joinDao } = useAuth();
  const membershipDaosById = profile?.memberships;

  const isMember = joined
    ? true
    : membershipDaosById
    ? membershipDaosById?.includes(id)
    : false;

  return (
    <div className='border-2 border-slate-400 p-3 rounded-xl'>
      <div className='flex items-center mb-2'>
        <img src={image} className='h-12 w-12 rounded-full mr-2' />
        <h2 className='text-xl font-bold leading-6'>{name}</h2>
      </div>
      <p>{description}</p>
      <div className='mt-3'>
        <p className='mb-2'>
          <span className='font-bold'>Members:</span>{' '}
          <span className='bg-red-200 text-orange-600 font-bold rounded-md p-1'>
            {members}
          </span>
        </p>
        {!removeTeams && (
          <p className='mb-4'>
            <span className='font-bold'>Teams:</span>{' '}
            <span className='bg-purple-200 text-purple-700 font-bold rounded-md p-1'>
              {teams}
            </span>
          </p>
        )}
        <div className='flex'>
          <Link
            className='border-2 rounded-md py-1 px-2 flex items-center mr-2'
            to={`/daos/${id}`}
          >
            <MdVisibility className='mr-1' /> View
          </Link>

          <button
            className='border-2 rounded-md py-1 px-2 flex items-center mr-2'
            disabled={isMember}
            onClick={async () => await joinDao(id)}
          >
            <MdPersonAddAlt className='mr-1' /> {isMember ? 'Joined!' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
