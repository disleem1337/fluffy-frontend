import { createContext, useEffect, useContext, useState, useRef } from "react";
import { useFluffyWeb3 } from "./fluffyWeb3Provider";
import { utils } from "ethers";
import { login } from "../services/auth";

type TFluffyAuthContext = {};

const FluffyAuthContext = createContext<TFluffyAuthContext>({});

function FluffyAuthProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, provider, account } = useFluffyWeb3();

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
    if (!isConnected) return;

    async function signMessage() {
      try {
        const signedMessage = await signOrGetSignedMessage();
        localStorage.setItem("signedMessage", signedMessage);

        console.log(await login(account as string, signedMessage));
      } catch (err) {
        console.error(err);
      }
    }

    signMessage();
  }, [isConnected]);

  return (
    <FluffyAuthContext.Provider value={{}}>
      {children}
    </FluffyAuthContext.Provider>
  );
}

export const useFluffyAuth = () => {
  const context = useContext(FluffyAuthContext);

  return context;
};

export default FluffyAuthProvider;
