import { ContentProfileKey } from '../src';
//import { ContentProfileKey } from '../build/content-profile/src';
import * as fs from 'fs';
import * as path from 'path';
import * as ethers from 'ethers';
let privateKey = "";
let key: ContentProfileKey;

const hardhatKey0 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const hardhatKey1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const hardhatKey2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const addr0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const addr1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const addr2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
(async () => {
    try {
        privateKey = await getPrivateKey();
        //http://127.0.0.1:8545 31337
        // const takoKeyContract = await utils.getTakoKeyContract(Network.LOCALHOST);
        // const takoKeysV1 = new TakoKeysV1(takoKeyContract.contract, takoKeyContract.chain_id);
        //const url = "https://optimism.publicnode.com";
        // takoKeysV1.provider = new ethers.JsonRpcProvider(url);
        //const farcasterKeyAddr = await takoKeysV1.farcasterKey();
        key = new ContentProfileKey("0x5FbDB2315678afecb367f032d93F642f64180aa3", 31337);
        const url = "http://127.0.0.1:8545";
        key.provider = new ethers.JsonRpcProvider(url);
        safeTransferFrom().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()

async function getPrivateKey() {
    const fileName = 'privatekey';
    let base = __dirname;
    for (let index = 0; index < 3; index++) {
        base = path.dirname(base);
    }
    const prikey = await fs.readFileSync(path.join(base, fileName)).toString();
    return prikey;
}
async function approve() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = key.approveAbiData(addr2, 0);
    console.log(abiData)
    //await sendTx(abiData, wallet);
}
async function safeTransferFrom() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = key.safeTransferFromAbiData(addr1, addr0, 1, new Uint8Array());
    console.log(abiData)
    //await sendTx(abiData, wallet);
}
async function setApprovalForAll() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.setApprovalForAllAbiData(addr1, true);
    await sendTx(abiData, wallet);
}
async function balanceOf() {
    const balance = await key.balanceOf(addr1);
    console.log(balance);
}
async function contentIdHash() {
    const res = await key.contentIdHash(1);
    console.log(res);
}
async function contentUrl() {
    const res = await key.contentUrl(1);
    console.log(res);
}
async function tokenUri() {
    const res = await key.tokenURI(1);
    console.log(res);
}
async function coreContract() {
    const res = await key.coreContract();
    console.log(res);
}
async function creatorIdOf() {
    const res = await key.creatorIdOf(1);
    console.log(res);
}
async function getApproved() {
    const res = await key.getApproved(1);
    console.log(res);
}
async function isApprovedForAll() {
    const res = await key.isApprovedForAll(addr0, addr1);
    console.log(res);
}
async function info() {
    const name = await key.name();
    const owner = await key.owner();
    const symbol = await key.symbol();
    const tokenUri = await key.tokenURI(1);
    console.log(`name:${name},owner:${owner},symbol:${symbol}`);
}
async function ownerOf() {
    const owner = await key.ownerOf(1);
    console.log(owner);
}

async function sendTx(abiData: string, wallet: ethers.Wallet) {
    const estimatedGas = await key.estimateGas(wallet.address, abiData, BigInt(0));
    const transaction = await key.generateTransaction(wallet.address, abiData, BigInt(0), estimatedGas * BigInt(3));
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await key.provider.broadcastTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
}