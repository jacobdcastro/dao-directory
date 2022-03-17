import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Route, Routes } from 'react-router';
import Connect from '../../views/Connect';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type Props = {};

const Layout = (props: Props) => {
  const ctx = useWeb3React();
  console.log(ctx);
  return (
    <div id='_app' className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row relative'>
        <Sidebar />

        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Connect />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Layout;
