import { metaMask, hooks } from "../connectors/metamask";
import { createContext, useEffect, useContext, useState, useRef } from "react";

type TFluffyWeb3Context = {
  account: string | undefined;
  provider: any;
  isConnecting: boolean;
  isConnected: boolean | null;
  connectWithMetaMask: () => Promise<TConnectResult>;
};

export const FluffyWeb3Context = createContext<TFluffyWeb3Context>({
  account: undefined,
  provider: null,
  isConnecting: false,
  isConnected: false,
  connectWithMetaMask: () => Promise.resolve({ success: false }),
});

type TConnectResult = {
  success: boolean;
  error?: any;
};
function FluffyWeb3Provider({ children }: { children: React.ReactNode }) {
  const account = hooks.useAccount();
  const provider = hooks.useProvider();
  const chainId = hooks.useChainId();
  const isActive = hooks.useIsActive();

  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const [triedEager, setTriedEager] = useState(false);

  // MetaMask bağlantısını kurar.
  const connectWithMetaMask = async (): Promise<TConnectResult> => {
    if (isConnected) return { success: false, error: "Already connected." };
    setIsConnecting(true);
    try {
      await metaMask.activate(56);

      return { success: true };
    } catch (e) {
      setIsConnecting(false);
      console.log(metaMask);
      return { error: e, success: false };
    }
  };

  // MetaMask bağlantısı kurulduğunda, context'i günceller.
  useEffect(() => {
    console.log(account, chainId, isActive, triedEager);
    if (!triedEager) return;
    if (account && !chainId) return;
    if (!account && chainId) {
      connectWithMetaMask();
      return;
    }

    if (!account || chainId !== 56) {
      setIsConnected(false);
      return;
    }

    setIsConnected(true);
    setIsConnecting(false);
  }, [account, chainId, triedEager]);

  // Sayfa yüklendiğinde, MetaMask bağlantısını otomatik olarak kurmaya çalışır.
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
