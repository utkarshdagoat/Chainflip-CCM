import {ethers} from 'ethers';


async function main() {
    const value =ethers.zeroPadValue(ethers.toQuantity(123467891232), 32);
    console.log(value)
}
main()