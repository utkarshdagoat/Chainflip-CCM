import { Wallet, getDefaultProvider, ethers } from "ethers"
import { abi, tokenABI } from "./abi";
import { Chains } from "@chainflip/sdk/swap";
const contractAddr = "0x28aC2744Fff7e772E6450a34D68d661a7B35c660"
const VaultAddr ="0x36eaD71325604DC15d35FAE584D7b50646D81753";
async function main() {
    const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/PvfO5LG_yc2T_5n45hAAa9FME3UHgiw3');
    // // const srcChain = Chains.Ethereum; // Replace with the source chain ID
    const abiCoder = new ethers.AbiCoder();
    const srcAddress = abiCoder.encode(['address'], ['0x36eaD71325604DC15d35FAE584D7b50646D81753']);
    // // // Replace with the actual source address in bytes
    const message = abiCoder.encode(['string'], ['hello']) // Replace with the message in bytes
    const token = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // Replace with the token address
    const amount = ethers.parseUnits('300', 6);
    const contract = new ethers.Contract("0x28aC2744Fff7e772E6450a34D68d661a7B35c660", abi, provider)
    // // const gasVal =await contract.callStatic.cfReceive(1, srcAddress, message, token, amount)
    // // console.log(gasVal)
    const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    const usdc = new ethers.Contract("0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", tokenABI, provider)

    const encodedFunction = contract.interface.encodeFunctionData("cfReceive", [1, srcAddress, message, token, amount]);
    const slot = ethers.keccak256(abiCoder.encode(['address', 'uint256'], [contractAddr.toLowerCase(), 9]));
    console.log(slot)
    const resultWithoutOverride = await provider.getStorage(USDC, slot);
    console.log('balance w/o override:', abiCoder.decode(['uint256'], resultWithoutOverride));
    // // console.log('Slot:', slot);
    const desiredBalance = ethers.parseUnits('12345678', 6);
    const value = ethers.zeroPadValue(ethers.toQuantity(123467891232), 32)
    const stateDiff = {
        [USDC]: {
            stateDiff: {
                [slot]: value,
            },
        },
    };
    console.log(stateDiff)
    // const resultWithOverride = await provider.send('eth_call', [
    //     {
    //         from: contractAddr,
    //         to: USDC,
    //         data: usdc.interface.encodeFunctionData('balanceOf', [contractAddr]),
    //     },
    //     'latest',
    //     stateDiff,
    // ]);
    // console.log('DAI balance w/ override:', abiCoder.decode(['uint256'], resultWithOverride));
    // console.log(resultWithOverride)
    const result = await provider.send('eth_estimateGas', [
        {
            from:VaultAddr,
            to: contractAddr,
            data: encodedFunction
        },
        'latest',
        stateDiff,
    ]);
    console.log("gas",parseInt(result,16))
    // const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');

    // const DAI = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
    // const wallet = '0xF977814e90dA44bFA03b6295A0616a897441aceC';
    // const dai = new ethers.Contract(DAI, tokenABI, provider); 
    // const slot = ethers.keccak256(abiCoder.encode(['address', 'uint256'], [wallet.toLowerCase(), 0]));
    // const resultWithoutOverride = await provider.getStorage(DAI, slot);

    // const stateDiff = {
    //     [DAI]: {
    //         stateDiff: {
    //             [slot]: ethers.zeroPadValue(ethers.toQuantity(12345678), 32),
    //         },
    //     },
    // };
    // const resultWithOverride = await provider.send('eth_call', [
    //     {
    //         from: ethers.ZeroAddress,
    //         to: DAI,
    //         data: dai.interface.encodeFunctionData('balanceOf', [wallet]),
    //     },
    //     'latest',
    //     stateDiff,
    // ]);

    // console.log('DAI balance w/o override:', abiCoder.decode(['uint256'], resultWithoutOverride));
    // console.log('DAI balance w/ override:', abiCoder.decode(['uint256'], resultWithOverride));
}


main()
