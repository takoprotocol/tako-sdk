import {
    FarcasterPeripheral, CreateWithSig, EIP712Signature, NewFarcasterPostToken,
    Network
} from '../src';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';

let privateKey = "";
let key: FarcasterPeripheral;

(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        const postToken = await NewFarcasterPostToken(Network.TESTNET);
        key = postToken.peripheral;
        //const url = "http://127.0.0.1:8545";
        const url = "https://optimism.publicnode.com";
        key.provider = new ethers.JsonRpcProvider(url);
        contentAssetCore().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()

async function bind() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.bindAbiData(1, addr0, BigInt(1), BigInt(2), 2);
    console.log(abiData);
    //await sendTx(abiData, wallet, BigInt(0));
}
async function createWithSig() {
    const sigData: EIP712Signature = {
        v: 1, r: Buffer.from("ce6d7b5282bd9a3661ae061feed1dbda4e52ab073b1f9285be6e155d9c38d4ec", "hex"),
        s: Buffer.from("ce6d7b5282bd9a3661ae061feed1dbda4e52ab073b1f9285be6e155d9c38d4ec", "hex"),
        deadline: 1
    }
    const vars: CreateWithSig = {
        sig: sigData, profileId: 256,
        contentId: "0xde33643575401fb04caa9a60c5cccf0b37261880", contentUrl: "ipfs://farcaster"
    };
    const abiData = key.createWithSigAbiData(vars, addr0);
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
async function isRelayer() {
    const res = await key.isRelayer(addr0);
    console.log(res);
}
async function farcasterIdRegistry() {
    const res = await key.farcasterIdRegistry();
    console.log(res);
}

async function bytes() {
    const hexStr = "0102";
    const a = Buffer.from(hexStr, "hex")
    const b = a.toString("hex");

    console.log(b);
}