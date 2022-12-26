import LoginSplash from "../assets/login-splash.jpg";
import TrustIcon from "../assets/trust-wallet.svg";
import BinanceIcon from "../assets/binance-wallet.png";
import MetamaskIcon from "../assets/metamask.png";
import "twin.macro";
import {
  BorderRadius,
  Button,
  ButtonSize,
  ButtonVariant,
} from "../components/Button/Button";
import { useFluffyWeb3 } from "../providers/fluffyWeb3Provider";
import addChain from "../utils/addChain";
import { metaMask } from "../connectors/metamask";

function LoginPage() {
  const { connectWithMetaMask, isConnecting } = useFluffyWeb3();

  const onClickMetamask = async () => {
    const result = await connectWithMetaMask();
    if (!result.success) {
      if (result.error?.code === 4902) {
        console.log("Ağ ekli değil, ağ eklenmeye çalışılıyor...");
        try {
          const addChainResult = await addChain(metaMask);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <div tw="w-screen h-screen overflow-x-hidden">
      {isConnecting && (
        <div tw="absolute top-0 left-0 w-screen h-screen bg-black/50 z-20"></div>
      )}
      <div tw="min-h-full w-full flex">
        <div tw="flex rounded-xl flex-1">
          <div tw="flex-[2] bg-white p-4 flex flex-col z-10 shadow-xl">
            <div>
              <div tw="text-2xl font-bold">Fluffy</div>
            </div>

            <div tw="mt-auto mb-auto px-2 md:px-24 flex flex-col gap-12 items-center">
              <div tw="text-center">
                <p tw="text-3xl font-bold">Selam!</p>
                <p tw="text-sm text-gray-400 px-20 font-medium mt-4">
                  Web3 ve sosyal medyayı aynı anda deneyimleyebileceğin bir
                  platforma hoş geldin!
                </p>
              </div>

              <div tw="flex flex-col w-[fit-content] gap-4">
                <Button
                  size={ButtonSize.LARGE}
                  borderRadius={BorderRadius.LARGE}
                  tw="pr-12 gap-2"
                  onClick={onClickMetamask}
                >
                  <img tw="w-8 h-8" src={MetamaskIcon} />
                  <span tw="font-bold text-white text-lg">
                    Metamask ile giriş yap
                  </span>
                </Button>

                <Button
                  size={ButtonSize.LARGE}
                  borderRadius={BorderRadius.LARGE}
                  tw="pr-12 gap-2"
                  variant={ButtonVariant.SECONDARY}
                >
                  <img tw="w-8 h-8 rounded-full" src={TrustIcon} />
                  <span tw="font-bold text-lg">Trust Wallet ile giriş yap</span>
                </Button>

                <Button
                  size={ButtonSize.LARGE}
                  borderRadius={BorderRadius.LARGE}
                  tw="pr-12 gap-2"
                  variant={ButtonVariant.SECONDARY}
                >
                  <img tw="w-8 h-8" src={BinanceIcon} />
                  <span tw="font-bold text-lg">BSC Wallet ile giriş yap</span>
                </Button>
              </div>
            </div>
          </div>
          <div tw="hidden md:block relative flex-[3]">
            <img
              tw="absolute w-full h-full object-cover object-center"
              src={LoginSplash}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
