import { useWeb3React } from '@web3-react/core';
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
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
  selectedDao: string | null;
  selectDao: (daoId: string) => void;
}

export const AuthContext = createContext<Context>({
  profile: {
    _id: 1,
    address: '0x',
    dateJoined: Date.now(),
    following: [],
    memberships: [],
  },
  selectedDao: null,
  selectDao: () => {},
});

const AuthContextProvider: FC = ({ children }) => {
  const [selectedDao, setSelectedDao] = useState<string | null>(null);
  const { account } = useWeb3React();
  const navigate = useNavigate();
  const location = useLocation();

  const selectDao = useCallback(
    (daoId: string) => {
      setSelectedDao(daoId);
      navigate('/directory');
    },
    [navigate]
  );

  const { data: profile } = useQuery(
    ['getProfile', account],
    async () => {
      if (account) {
        const { data } = await axios({
          url: setApiUrl(`/user/${account}`),
          method: 'GET',
        });
        return data;
      }
    },
    {
      onSuccess: profile =>
        profile && location.pathname === '/' && navigate('/profile'),
    }
  );

  return (
    <AuthContext.Provider value={{ profile, selectedDao, selectDao }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
