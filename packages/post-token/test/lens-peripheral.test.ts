import { LensPeripheral } from '../src';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';

let privateKey = "";
let key: LensPeripheral;

(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        //const takoKeyContract = await utils.getTakoKeyContract(Network.TESTNET);
        //takoKeysV1 = new TakoKeysV1();
        // = new TakoKeysV1("0x5FbDB2315678afecb367f032d93F642f64180aa3", 31337);
        key = new LensPeripheral("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", 31337);
        const url = "http://127.0.0.1:8545";
        //const url = "https://optimism.publicnode.com";
        key.provider = new ethers.JsonRpcProvider(url);
        lensHub().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()
//-------------
async function bind() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.bindAbiData(1, addr0, BigInt(1), BigInt(2), 2);
    console.log(abiData);
    //await sendTx(abiData, wallet, BigInt(0));
}
async function createWithPub() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.createWithPubAbiData(1, 20);
    console.log(abiData);
    //await sendTx(abiData, wallet, BigInt(0));
}

async function contentAssetCore() {
    const res = await key.contentAssetCore();
    console.log(res);
}
async function getNonce() {
    const res = await key.getNonce(addr0);
    console.log(res);
}
async function lensHub() {
    const res = await key.lensHub();
    console.log(res);
}

async function bytes() {
    const hexStr = "0102";
    const a = Buffer.from(hexStr, "hex")
    const b = a.toString("hex");

    console.log(b);
}