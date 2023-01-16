import { createContext, useEffect, useContext, useState, useRef } from "react";
import { useFluffyWeb3 } from "./fluffyWeb3Provider";
import { utils } from "ethers";
import { login } from "../services/auth";
import { me } from "../services/user";

type TFluffyAuthContext = {
  token?: string;
  user?: any;
  isConnecting: boolean;
  isConnected: boolean | null;
  refreshUser: () => Promise<void>;
};

const FluffyAuthContext = createContext<TFluffyAuthContext>({
  token: undefined,
  user: undefined,
  isConnecting: false,
  isConnected: null,
  refreshUser: async () => {},
});

function FluffyAuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected: isWalletConnected, provider, account } = useFluffyWeb3();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any | undefined>(undefined);

  const signOrGetSignedMessage = async () => {
    let signedMessage = localStorage.getItem("signedMessage");

    if (signedMessage) {
      try {
        const messageSigner = utils.verifyMessage("fluffy", signedMessage);
        if (messageSigner === account) return signedMessage;
      } catch (err) {}
    }

    const signer = provider.getSigner().connectUnchecked();
    const signature = await signer.signMessage("fluffy");

    return signature;
  };

  useEffect(() => {
    if (isWalletConnected === false) {
      setToken(undefined);
      setUser(undefined);
      setIsConnected(false);
    }

    if (!isWalletConnected) return;

    async function signMessage() {
      setIsConnecting(true);
      try {
        const signedMessage = await signOrGetSignedMessage();
        localStorage.setItem("signedMessage", signedMessage);

        const loginResponse = await login(account as string, signedMessage);
        const userResponse = await me(loginResponse.token);

        setToken(loginResponse.token);
        setUser(userResponse.user);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
      setIsConnecting(true);
    }

    signMessage();
  }, [isWalletConnected]);

  async function refreshUser() {
    if (!token) return;
    const userResponse = await me(token);
    setUser(userResponse.user);
  }

  return (
    <FluffyAuthContext.Provider
      value={{
        token,
        user,
        isConnecting,
        isConnected,
        refreshUser,
      }}
    >
      {children}
    </FluffyAuthContext.Provider>
  );
}

export const useFluffyAuth = () => {
  const context = useContext(FluffyAuthContext);

  return context;
};

export default FluffyAuthProvider;
