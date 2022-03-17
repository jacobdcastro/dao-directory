import React from 'react';
import ViewLayout from '../components/ViewTemplate';
import {
  MdAdd,
  MdPublic,
  MdPersonAddAlt,
  MdOutlineNotifications,
} from 'react-icons/md';

type Props = {};

const AllDaos = (props: Props) => {
  const daos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <ViewLayout
      header='All DAOs'
      actions={[
        {
          text: 'Create DAO',
          onClick: () => console.log('Create DAO'),
          icon: <MdAdd className='mr-1' />,
        },
      ]}
    >
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {daos.map(dao => (
          <div key={dao} className='border-2 border-slate-400 p-3 rounded-xl'>
            <div className='flex items-center mb-2'>
              <MdPublic size={60} className='mr-2' />
              <h2 className='text-lg font-bold '>Friends With Benefits</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum urna purus, malesuada non turpis ac, fringilla dapibus
              tortor. Donec suscipit nisl ac enim ullamcorper accumsan. Interdum
              et malesuada fames ac ante ipsum primis in faucibus.
            </p>
            <div className='mt-3'>
              <p className='mb-2'>
                <span className='font-bold'>Members:</span>{' '}
                <span className='bg-red-200 text-orange-600 font-bold rounded-md p-1'>
                  6,000
                </span>
              </p>
              <p className='mb-4'>
                <span className='font-bold'>Teams:</span>{' '}
                <span className='bg-purple-200 text-purple-700 font-bold rounded-md p-1'>
                  14
                </span>
              </p>
              <div className='flex'>
                <button className='border-2 rounded-md py-1 px-2 flex items-center mr-2'>
                  <MdPersonAddAlt className='mr-1' /> Join
                </button>
                <button className='border-2 rounded-md py-1 px-2 flex items-center'>
                  <MdOutlineNotifications className='mr-1' /> Follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ViewLayout>
  );
};

export default AllDaos;
