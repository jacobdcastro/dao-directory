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
import { injected } from '../lib/connectors';

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

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

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

      return data;
    },
    { onSuccess: () => refetchProfile() }
  );

  useEagerConnect();

  return (
    <AuthContext.Provider value={{ profile, joinDao, refetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
