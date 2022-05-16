import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useRouter as router } from 'next/router';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify } from "../utils/notifications";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const { autoConnect } = useAutoConnect();
    const { autoConnect, setAutoConnect } = useAutoConnect()
    // TODO: WALLET ADAPTER IN GENERAL NEEDS WORK, CONNECTING DIFFERENT WALLETS, NETWORK, REFRESH, EVENTS

    {/* TODO: UPDATE CLUSTER PER NETWORK SETTINGS, ADD LOCALHOST + CUSTOMNET | ADAPTER REWORK */ }
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // localStorage.setItem('walletstorage','');

    useEffect(() => {
        setAutoConnect(true)
    }, [])

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    const onError = useCallback(
        (error: WalletError) => {
            notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
            setAutoConnect(false)
        },
        []
    );

    return (
        // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect} >
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
    );
};
