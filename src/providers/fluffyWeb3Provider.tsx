import { metaMask, hooks } from "../connectors/metamask";
import { createContext, useEffect, useContext, useState } from "react";

type TFluffyWeb3Context = {
	account: string | undefined;
	provider: any;
	isConnecting: boolean;
	isConnected: boolean;
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

	const [isConnected, setIsConnected] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);

	const connectWithMetaMask = async () => {
		if (isConnected) return;
		setIsConnecting(true);
		try {
			await metaMask.activate();
		} catch (e) {
			console.log(e);
			setIsConnecting(false);
		}
	};

	useEffect(() => {
		if (!account) {
			setIsConnected(false);
			return;
		}

		console.log("connected");
		setIsConnected(true);
		setIsConnecting(false);
	}, [account, chainId]);

	useEffect(() => {
		metaMask.connectEagerly();
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
