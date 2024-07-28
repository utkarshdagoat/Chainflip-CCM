import { SwapSDK, Chains, Assets } from "@chainflip/sdk/swap"
import { Wallet, getDefaultProvider, ethers  } from "ethers"
import { abi } from "./abi";
const sdk = new SwapSDK({ network: "perseverance" })

// const CCMReciever = "0x0199C36c9A40A70f5d2C3646944D515083b17C87";

async function main() {

    const provider = getDefaultProvider('sepolia');
    // const provider = getDefaultProvider("https://sepolia-rollup.arbitrum.io/rpc")

    const feeData = await provider.getFeeData();
    const abiCoder = new ethers.utils.AbiCoder();
    // These are not in a very useful format
    let gasPrice = feeData.gasPrice;
    let maxFeePerGas = feeData.maxFeePerGas;
    let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;

    // Convert the gas price from Wei to Gwei or Ether for better readability
    if (gasPrice) {
        // const gas = ethers.formatUnits(gasPrice, 'gwei');
        // const contract = new ethers.Contract(CCMReciever, abi, provider)
        // const srcChain = 1; // Replace with the source chain ID
        // const srcAddress = ethers.hexlify(ethers.toUtf8Bytes('0x0')); // Replace with the actual source address in bytes
        // const message = ethers.hexlify(ethers.toUtf8Bytes('Your message here')); // Replace with the message in bytes
        // const token = '0x0'; // Replace with the token address
        // const amount = ethers.parseUnits('100', 18);

        // const tx = await contract.cfReceive(srcChain, srcAddress, message, token, amount, {
        //     value: ethers.parseEther('0.01') // Adjust value if the function is payable
        // });
        // console.log(tx.gasLimit*)
        console.log((BigInt(2e7) * BigInt(ethers.utils.formatUnits(gasPrice, "wei"))))
        const gas = BigInt(2e7) * BigInt(ethers.utils.formatUnits(gasPrice, "wei"))
        const swapParams = {
            srcChain: Chains.Ethereum,
            srcAsset: Assets.ETH,
            destChain: Chains.Ethereum,
            destAsset: Assets.USDC,
            amount: (8e16).toString(),
            destAddress: "0x28aC2744Fff7e772E6450a34D68d661a7B35c660",
            ccmMetadata: {
                message: abiCoder.encode(["string", "address"], ["dagoatishere", "0x67ff09c184d8e9e7B90C5187ED04cbFbDba741C8"]) as `0x${string}`,
                gasBudget: gas.toString()
            }
        }
        console.log(BigInt(10e6) * BigInt(ethers.utils.formatUnits(gasPrice, "wei")))

        console.log(swapParams)
        // // // console.log(provider)
        const wallet = new Wallet("76585d57ace9d6a5baa80855f462f470aceaeecf3b7999a076ea5b9b861d1370", provider);
        // // // const usdc = new ethers.Contract("0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", abi, wallet)
        // // // const tx = await usdc.approve("0x36eaD71325604DC15d35FAE584D7b50646D81753",50 * 10 ** 6)
        // // // console.log(tx)
        const executeSwap = await sdk.executeSwap(swapParams, {
            signer: wallet
        })
        console.log(executeSwap)
        // // const myString = "wassup"
        // // const encoded = Buffer.from(myString).toString('hex');
        // // console.log(encoded)
        // // console.log(5e15/1e18);
    }


}



main()