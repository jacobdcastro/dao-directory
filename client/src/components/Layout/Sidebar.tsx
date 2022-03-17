import React from 'react';

type Props = {};

const Sidebar = (props: Props) => {
  const daos = [0, 1, 2, 3, 4];
  return (
    <div className='bg-white flex flex-col w-16 h-screen py-3 items-center border-r-2 border-r-slate-100'>
      {daos.map(dao => (
        <div className='bg-blue-500 w-11 h-11 rounded-full mb-2' />
      ))}
    </div>
  );
};

export default Sidebar;
