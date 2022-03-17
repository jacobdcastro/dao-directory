import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Layout from './components/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
};

export default App;
