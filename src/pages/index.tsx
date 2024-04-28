import { ConnectButton } from '@rainbow-me/rainbowkit';
import { multicall } from '@wagmi/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';
import MintPage from '@/components/MintPage';

import { tokens } from '@/constant/tokens';
import { config } from '@/constant/web3';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { address } = useAccount();
  const [balance, setBalance] = useState({} as Record<string, string>);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    const request = async () => {
      if (!address) {
        setBalance({});
        return;
      }

      const result = await multicall(config, {
        contracts: [
          ...tokens.map((token) => ({
            ...token.contract,
            functionName: 'balanceOf',
            args: [address],
          })),
          ...tokens.map((token) => ({
            ...token.contract,
            functionName: 'decimals',
          })),
        ],
      });

      const balance = result
        .slice(0, tokens.length)
        .map((r) => r.result as bigint);
      const decimals = result
        .slice(tokens.length)
        .map((r) => r.result as number);
      const structuredBalance = balance.reduce((prev, amount, key) => {
        prev[tokens[key].name] = formatUnits(amount, decimals[key]);
        return prev;
      }, {} as Record<string, string>);
      setBalance(structuredBalance);
    };

    request();
  }, [address]);
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
        <ConnectButton />
        <MintPage
          balance={balance}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
    </Layout>
  );
}
