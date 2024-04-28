import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
export const config = getDefaultConfig({
  appName: 'pretest',
  projectId: '421f50f8ef39f2832bcac599db690213',
  batch: { multicall: true },
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
