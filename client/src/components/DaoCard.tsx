import React from 'react';
import { MdPersonAddAlt, MdVisibility } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';

type Props = { data: any };

const DaoCard = ({ data }: Props) => {
  const { name, description, members, teams, image, id } = data;
  const { profile, selectDao } = useAuth();
  const membershipDaosById = profile?.memberships.map(d => d.id);

  const isMember = membershipDaosById
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
        <p className='mb-4'>
          <span className='font-bold'>Teams:</span>{' '}
          <span className='bg-purple-200 text-purple-700 font-bold rounded-md p-1'>
            {teams}
          </span>
        </p>
        <div className='flex'>
          <button
            className='border-2 rounded-md py-1 px-2 flex items-center mr-2'
            onClick={() => selectDao(id)}
          >
            <MdVisibility className='mr-1' /> View
          </button>

          <button
            className='border-2 rounded-md py-1 px-2 flex items-center mr-2'
            disabled={isMember}
          >
            <MdPersonAddAlt className='mr-1' />{' '}
            {isMember ? 'Already Joined' : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
