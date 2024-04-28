import { multicall } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { toFixed } from '@/lib/number';

import { tokens } from '@/constant/tokens';
import { config } from '@/constant/web3';

export default function MintPage({
  balance,
  selectedIndex,
  setSelectedIndex,
}: {
  balance: Record<string, string>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [toggled, setToggled] = useState(false);
  const [value, setValue] = useState('0');
  const { address } = useAccount();
  const [usdeBalance, setUsdeBalance] = useState('0');

  useEffect(() => {
    const request = async () => {
      if (!address) {
        setUsdeBalance('0');
        return;
      }

      const usdeContract = {
        address: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
        abi: erc20Abi,
      } as const;

      const result = await multicall(config, {
        contracts: [
          {
            ...usdeContract,
            functionName: 'balanceOf',
            args: [address],
          },
          {
            ...usdeContract,
            functionName: 'decimals',
          },
        ],
      });

      setUsdeBalance(
        formatUnits(result[0].result as bigint, result[1].result as number)
      );
    };

    request();
  }, [address]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <div className='transaction-controls m-2 my-20 flex w-full min-w-[300px] max-w-[472px] flex-col justify-between rounded-lg border border-[#181f25] p-6 backdrop-blur-[4.5px]'>
      <div className='flex w-full items-center'>
        <span className='mb-6 mr-auto text-xl font-medium'>Mint USDe</span>
      </div>
      <div className='relative'>
        <div className='w-stretch h-30 bg-cgray-800 flex max-w-full flex-col items-center justify-between rounded-t-lg border-b-[3px] border-gray-900 p-3'>
          <span className='text-cgray-200 mb-1 mr-auto text-xs'>
            You deposit
          </span>
          <div className='flex w-full items-center justify-between gap-1 sm:gap-2'>
            <input
              className='bg-cgray-800 min-w-none mr-1 w-1/2 max-w-none overflow-ellipsis text-2xl outline-none'
              data-type='currency'
              placeholder={0}
              type='text'
              value={value}
              onChange={onValueChange}
            />
            <div className='relative'>
              <button
                className='outline-none'
                id='headlessui-listbox-button-:r5:'
                type='button'
                aria-haspopup='listbox'
                aria-expanded='true'
                data-headlessui-state='open'
                aria-controls='headlessui-listbox-options-:r19:'
                onClick={() => setToggled(!toggled)}
              >
                <div className='border-cgray-400 hover:bg-cgray-600 flex w-fit min-w-[134px] items-center overflow-hidden rounded-lg border py-1.5 pl-2 pr-1 transition duration-200 ease-out'>
                  <img
                    alt={tokens[selectedIndex].name}
                    loading='lazy'
                    width={24}
                    height={24}
                    decoding='async'
                    data-nimg={1}
                    className='mr-3 mt-[1px]'
                    src={tokens[selectedIndex].logo}
                    style={{ color: 'transparent' }}
                  />
                  <span className='mr-1 whitespace-nowrap'>
                    {tokens[selectedIndex].name}
                  </span>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    strokeWidth={0}
                    viewBox='0 0 15 15'
                    className='ml-auto h-5 w-5 min-w-[20px]'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              </button>

              {toggled && (
                <ul
                  className='border-cgray-400 bg-cgray-700 absolute right-0 z-10 flex max-h-56 w-full min-w-fit scale-100 transform flex-col overflow-auto rounded-lg border text-gray-200 opacity-100 outline-none'
                  aria-labelledby='headlessui-listbox-button-:r5:'
                  aria-orientation='vertical'
                  id='headlessui-listbox-options-:r19:'
                  role='listbox'
                  tabIndex={0}
                  data-headlessui-state='open'
                  style={{ top: '110%' }}
                  aria-activedescendant='headlessui-listbox-option-:r1a:'
                >
                  {tokens.map((token, key) => {
                    return (
                      <li
                        key={token.name}
                        role='option'
                        tabIndex={-1}
                        className='group'
                        onClick={() => {
                          setToggled(false);
                          setSelectedIndex(key);
                        }}
                      >
                        <div className='group-hover:bg-cblue-400 flex w-full min-w-fit cursor-pointer items-center whitespace-nowrap rounded-t p-[7px] text-end text-white'>
                          {/* bg-cblue-400 text-black IF SELECTED */}
                          <img
                            alt={token.name}
                            loading='lazy'
                            width={24}
                            height={24}
                            decoding='async'
                            data-nimg={1}
                            className='mr-3 mt-[1px]'
                            src={token.logo}
                            style={{ color: 'transparent' }}
                          />
                          <div className='group-hover:text-cgray-400 flex flex-col items-start leading-[1.125rem]'>
                            {token.name}
                            <span className='group-hover:text-cgray-400 text-cgray-200 text-xs leading-none'>
                              {toFixed(+balance[token.name], 3)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className='text-2xs text-cgray-200 mt-1 flex h-4 w-full items-center sm:text-xs'>
            <div className='ml-auto mr-[1px] flex gap-2'>
              <div data-testid='balance-text'>
                Balance: {balance[tokens[selectedIndex].name]}
              </div>
              <button
                className='text-cblue-400 hover:text-cblue-200'
                onClick={() => setValue(balance[tokens[selectedIndex].name])}
              >
                Max
              </button>
            </div>
          </div>
        </div>
        <div className='w-stretch h-30 bg-cgray-800 flex max-w-full flex-col items-center justify-between rounded-b-lg p-3'>
          <span className='text-cgray-200 mb-1 mr-auto text-xs'>
            You receive
          </span>
          <div className='flex w-full items-center justify-between gap-1 sm:gap-2'>
            <div className='text-placeholderGray mr-1 flex max-w-[50%] items-center text-2xl'>
              <div className='flex w-full items-center'>
                <span
                  className='cursor-not-allowed overflow-hidden overflow-ellipsis'
                  data-testid='non-editable-token-input'
                >
                  0
                </span>
              </div>
            </div>
            <div className='border-cgray-400 flex w-fit min-w-[134px] items-center overflow-hidden rounded-lg border px-2 py-1.5'>
              <img
                alt='USDe'
                loading='lazy'
                width={24}
                height={24}
                decoding='async'
                data-nimg={1}
                className='mr-3 mt-[1px]'
                src='https://etherscan.io/token/images/ethenausde_32.png'
                style={{ color: 'transparent' }}
              />
              <span className='mr-1 whitespace-nowrap'>USDe</span>
            </div>
          </div>
          <div className='text-2xs text-cgray-200 mt-1 flex h-4 w-full items-center sm:text-xs'>
            <div className='ml-auto mr-[1px] flex gap-2'>
              <div data-testid='balance-text'>Balance: {usdeBalance}</div>
            </div>
          </div>
        </div>
        <button
          className='bg-cgray-800 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded border-[3px] border-[#191D24] p-[3px] transition duration-100 ease-in-out enabled:hover:scale-[1.03]'
          data-testid='change-directions-button'
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth={0}
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'
            />
          </svg>
        </button>
      </div>
      <div className='text-neutrals-500 mb-6 mt-4 flex w-full text-xs'>
        <div className='ml-auto flex gap-1 text-end'>
          <button data-state='closed'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 16'
              className='h-4 w-4'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.045 10.667V8m0-2.667h.007m-6.007-.039v5.412c0 .228 0 .342.034.444.03.09.078.173.142.243.073.079.173.134.373.245l4.933 2.74c.189.106.284.158.384.179.088.018.18.018.268 0 .1-.02.195-.073.384-.178l4.933-2.741c.2-.11.3-.166.372-.245a.667.667 0 0 0 .143-.243c.034-.102.034-.216.034-.444V5.294c0-.228 0-.342-.034-.444a.667.667 0 0 0-.143-.243c-.072-.079-.172-.134-.372-.245L8.563 1.62c-.19-.105-.284-.158-.384-.178a.666.666 0 0 0-.268 0c-.1.02-.195.073-.384.178l-4.933 2.74c-.2.112-.3.167-.373.246a.667.667 0 0 0-.142.243c-.034.102-.034.216-.034.444'
              />
            </svg>
          </button>
          Fees included
        </div>
      </div>
      <button
        className='h-9 w-full overflow-hidden overflow-ellipsis whitespace-nowrap rounded-lg rounded-lg bg-gray-200 p-2 text-sm font-medium font-semibold text-black transition ease-in-out enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white disabled:bg-opacity-30'
        type='button'
        name='Mint'
        data-testid='submit-button'
        disabled=''
      >
        Mint
      </button>
    </div>
  );
}
