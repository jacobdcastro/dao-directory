import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Layout from './components/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContextProvider from './context/AuthContext';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Layout />
            <ReactQueryDevtools />
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Web3ReactProvider>
  );
};

export default App;
