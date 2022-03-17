import React, { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Route, Routes } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ConnectModal from '../../views/ConnectModal';
import Splash from '../../views/Splash';
import AllDaos from '../../views/AllDaos';
import DaoProfile from '../../views/DaoProfile';
import UserProfile from '../../views/UserProfile';

type Props = {};

const Layout = (props: Props) => {
  const [connectModalShown, setConnectModalShown] = useState(false);

  const toggleConnectModal = useCallback(
    (value?: boolean) => {
      setConnectModalShown(value || !connectModalShown);
    },
    [connectModalShown]
  );

  // const ctx = useWeb3React();
  // console.log(ctx);

  return (
    <>
      {connectModalShown && (
        <ConnectModal onClose={() => toggleConnectModal(false)} />
      )}
      <div id='_app' className='flex flex-col'>
        <Navbar showConnectModal={() => toggleConnectModal(true)} />
        <div className='flex flex-row relative'>
          <Sidebar />

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Splash />} />
              <Route path='/daos' element={<AllDaos />} />
              <Route path='/create-dao' element={<AllDaos />} />
              <Route path='/directory' element={<DaoProfile />} />
              <Route path='/profile' element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
