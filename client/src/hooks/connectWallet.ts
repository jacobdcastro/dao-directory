import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { injected, walletlink, walletconnect } from '../lib/connectors';

export const useConnectWallet = () => {
  const { activate, active, account } = useWeb3React();
  const [isActivating, setIsActivating] = useState(false);

  const connectWallet = useCallback(
    async (walletType: 'metamask' | 'coinbase' | 'walletconnect') => {
      const connector =
        walletType === 'metamask'
          ? injected
          : walletType === 'coinbase'
          ? walletlink
          : walletType === 'walletconnect'
          ? walletconnect
          : null;

      if (connector) {
        setIsActivating(true);
        await activate(connector);
      }
    },
    [activate]
  );

  useEffect(() => {
    if (isActivating === true && active && account) setIsActivating(false);
  }, [account, active, isActivating]);

  return { connectWallet, isActivating };
};
