// export default async function (
//     library,
//     {

//     }
//   ) {
//     if (!library?.provider?.request) {
//       return;
//     }
  
//     try {
//       await library.provider.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: chainID }],
//       });
//     } catch (error) {
//       if (tryToAddChain) {
//         try {
//           await library.provider.request({
//             method: "wallet_addEthereumChain",
//             params: [
//               {
//                 chainId: chainID,
//                 chainName: chainName,
//                 rpcUrls: [rpcUrl],
//                 nativeCurrency: {
//                   name: nativeCurrency,
//                   symbol: nativeCurrency,
//                   decimals: 18,
//                 },
//                 blockExplorerUrls: [blockExplorerUrl],
//               },
//             ],
//           });
//         } catch (error) {
//           throw new Error(`Couldn't add network: ${error.message} ${error.code}`);
//         }
//         try {
//           await library.provider.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: chainID }],
//           });
//         } catch (error) {
//           throw new Error(
//             `Added network but could not switch chains: ${error.message} ${error.code}`
//           );
//         }
//       } else {
//         throw error;
//       }
//     }
//   }

export default async function({provider}:any){
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                rpcUrls: ["https://bsc-dataseed.binance.org/"],
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://bscscan.com/"],
              },
            ],
          });
          return true;
        } catch (error) {
          return false;
        }
}