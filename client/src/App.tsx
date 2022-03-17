import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Layout from './components/Layout';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Web3ReactProvider>
  );
};

export default App;
