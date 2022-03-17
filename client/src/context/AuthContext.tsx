import { useWeb3React } from '@web3-react/core';
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { setApiUrl } from '../lib/apiUrl';
import { useLocation, useNavigate } from 'react-router';

interface Context {
  profile: {
    _id: number;
    address: string;
    dateJoined: number;
    following: any[];
    memberships: any[];
  };
  joinDao: any;
  refetchProfile: any;
}

export const AuthContext = createContext<Context>({
  profile: {
    _id: 1,
    address: '0x',
    dateJoined: Date.now(),
    following: [],
    memberships: [],
  },
  joinDao: () => {},
  refetchProfile: () => {},
});

const AuthContextProvider: FC = ({ children }) => {
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: profile, refetch: refetchProfile } = useQuery(
    ['getProfile', account, 'test'],
    async () => {
      if (account) {
        const { data } = await axios({
          url: setApiUrl(`/user/address/${account}`),
          method: 'GET',
        });
        return data;
      }
      return;
    },
    {
      onSuccess: profile => {
        if (profile) location.pathname === '/' && navigate('/profile');
      },
    }
  );

  const { mutate: joinDao } = useMutation(
    async daoId => {
      const { data } = await axios({
        url: setApiUrl('/orgs/join'),
        method: 'POST',
        data: { daoId, userId: profile._id },
      });
      console.log('joinDao', data);
      return data;
    },
    { onSuccess: () => refetchProfile() }
  );

  return (
    <AuthContext.Provider value={{ profile, joinDao, refetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
