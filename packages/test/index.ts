import * as fs from 'fs';
import * as path from 'path';
import * as ethers from 'ethers';
import { BaseContract } from '../pkg';
const hardhatKey0 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const hardhatKey1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const hardhatKey2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const addr0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const addr1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const addr2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

async function getPrivateKey() {
    const fileName = 'privatekey';
    let base = __dirname;
    for (let index = 0; index < 2; index++) {
        base = path.dirname(base);
    }
    const prikey = await fs.readFileSync(path.join(base, fileName)).toString();
    return prikey;
}
async function sendTx(abiData: string, wallet: ethers.Wallet, amount: bigint, contract: BaseContract) {
    const estimatedGas = await contract.estimateGas(wallet.address, abiData, amount);
    const transaction = await contract.generateTransaction(wallet.address, abiData, amount, estimatedGas * BigInt(3));
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await contract.provider.broadcastTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
}
class Keys {
    public test(): string {
        return "asd";
    }
}
export { getPrivateKey, hardhatKey0, hardhatKey1, hardhatKey2, addr0, addr1, addr2 }
export { sendTx }