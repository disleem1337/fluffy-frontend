import LoginSplash from "../assets/login-splash.jpg";
import TrustIcon from "../assets/trust-wallet.svg";
import BinanceIcon from "../assets/binance-wallet.png";
import MetamaskIcon from "../assets/metamask.png";
import tw from "twin.macro";

function Login() {
  return (
    <div tw="w-screen h-screen overflow-x-hidden">
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

              <div tw="flex flex-col w-[fit-content] gap-2">
                <button tw="bg-[#1877F2] flex items-center gap-2 p-3 pr-12 rounded-lg">
                  <img tw="w-8 h-8 rounded-full" src={TrustIcon} />
                  <span tw="font-bold text-white text-lg">
                    Trust Wallet ile giriş yap
                  </span>
                </button>

                <button tw="bg-white flex items-center gap-2 p-3 pr-12 rounded-lg">
                  <img tw="w-8 h-8" src={BinanceIcon} />
                  <span tw="font-bold text-black text-lg">
                    BSC Wallet ile giriş yap
                  </span>
                </button>

                <button tw="bg-black flex items-center gap-2 p-3 pr-12 rounded-lg">
                  <img tw="w-8 h-8" src={MetamaskIcon} />
                  <span tw="font-bold text-white text-lg">
                    Metamask ile giriş yap
                  </span>
                </button>
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

export default Login;
