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

  const { selectedDao, profile } = useAuth();
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
              <Route path='/create-dao' element={<CreateDao />} />
              <Route
                path='/directory'
                element={
                  <DaoDirectory
                    selectedDao={selectedDao || profile?.memberships[0]}
                  />
                }
              />
              <Route path='/profile' element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
