import React, { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Route, Routes } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ConnectModal from '../../views/ConnectModal';
import Splash from '../../views/Splash';
import AllDaos from '../../views/AllDaos';
import DaoDirectory from '../../views/DaoDirectory';
import UserProfile from '../../views/UserProfile';
import CreateDao from '../../views/CreateDao';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

const Layout = (props: Props) => {
  const [connectModalShown, setConnectModalShown] = useState(false);

  const { profile } = useAuth();
  const toggleConnectModal = useCallback(
    (value?: boolean) => {
      setConnectModalShown(value || !connectModalShown);
    },
    [connectModalShown]
  );

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
              <Route path='/' element={<AllDaos />} />
              <Route path='/daos' element={<AllDaos />} />
              <Route path='/daos/:daoId' element={<DaoDirectory />} />
              <Route path='/create-dao' element={<CreateDao />} />
              <Route path='/profile' element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
