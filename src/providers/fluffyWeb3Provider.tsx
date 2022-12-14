import { metaMask, hooks } from "../connectors/metamask";
import { createContext, useEffect, useContext, useState, useRef } from "react";

type TFluffyWeb3Context = {
	account: string | undefined;
	provider: any;
	isConnecting: boolean;
	isConnected: boolean | null;
	connectWithMetaMask: () => void;
};

export const FluffyWeb3Context = createContext<TFluffyWeb3Context>({
	account: undefined,
	provider: null,
	isConnecting: false,
	isConnected: false,
	connectWithMetaMask: () => {},
});

function FluffyWeb3Provider({ children }: { children: React.ReactNode }) {
	const account = hooks.useAccount();
	const provider = hooks.useProvider();
	const chainId = hooks.useChainId();
	const isActivating = hooks.useIsActivating();

	const [isConnected, setIsConnected] = useState<boolean | null>(null);
	const [isConnecting, setIsConnecting] = useState(false);

	const [triedEager, setTriedEager] = useState(false);

	const connectWithMetaMask = async () => {
		if (isConnected) return;
		setIsConnecting(true);
		try {
			await metaMask.activate(56);
		} catch (e) {
			setIsConnecting(false);
		}
	};

	useEffect(() => {
		if (!triedEager) return;
		if (account && !chainId) return;
		console.log("aa", account, chainId);
		if (!account) {
			setIsConnected(false);
			return;
		}

		setIsConnected(true);
		setIsConnecting(false);
	}, [account, chainId, triedEager]);

	useEffect(() => {
		async function connect() {
			try {
				const ret = await metaMask.connectEagerly();
			} catch (err) {
				console.log(err);
			}

			setTriedEager(true);
		}

		connect();
	}, []);

	return (
		<FluffyWeb3Context.Provider
			value={{
				account,
				provider,
				isConnecting,
				isConnected,
				connectWithMetaMask,
			}}
		>
			{children}
		</FluffyWeb3Context.Provider>
	);
}

export const useFluffyWeb3 = () => {
	const context = useContext(FluffyWeb3Context);

	return context;
};

export default FluffyWeb3Provider;
