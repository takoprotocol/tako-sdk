import { FarcasterKey } from '../src';
//import { TakoFarcaster } from '../build/src';
import * as fs from 'fs';
import * as path from 'path';
import * as ethers from 'ethers';
let privateKey = "";
const farcasterKey = new FarcasterKey();
const url = "http://127.0.0.1:8545";
const web3Provider = new ethers.JsonRpcProvider(url);
farcasterKey.provider = web3Provider;
const hardhatKey0 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const hardhatKey1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const hardhatKey2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const addr0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const addr1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const addr2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        creatorIdsOfOwner().catch(error => {
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
async function ownerOf() {
    const owner = await farcasterKey.ownerOf(1);
    console.log(owner);
}
async function balanceOf() {
    const balance = await farcasterKey.balanceOf(addr0);
    console.log(balance);
}
async function getApproved() {
    const res = await farcasterKey.getApproved(1);
    console.log(res);
}
async function isApprovedForAll() {
    const res = await farcasterKey.isApprovedForAll(addr0, addr1);
    console.log(res);
}

async function approve() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = farcasterKey.approveAbiData(addr2, 0);
    await sendTx(abiData, wallet);
}
async function safeTransferFrom() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = farcasterKey.safeTransferFromAbiData(addr1, addr0, 1, new Uint8Array());
    await sendTx(abiData, wallet);
}
async function setApprovalForAll() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = farcasterKey.setApprovalForAllAbiData(addr1, true);
    await sendTx(abiData, wallet);
}
async function info() {
    const name = await farcasterKey.name();
    const owner = await farcasterKey.owner();
    const symbol = await farcasterKey.symbol();
    const totalBurned = await farcasterKey.totalBurned();
    const totalMinted = await farcasterKey.totalMinted();
    const totalSupply = await farcasterKey.totalSupply();
    const tokenUri = await farcasterKey.tokenURI(0);
    console.log(`name:${name},owner:${owner},symbol:${symbol}`);
    console.log(`totalBurned:${totalBurned},totalMinted:${totalMinted},totalSupply:${totalSupply},tokenUri:${tokenUri}`);
}
async function creatorIdOf() {
    const res = await farcasterKey.creatorIdOf(1);
    console.log(res);
}
async function creatorIdsOf() {
    const res = await farcasterKey.creatorIdsOf([0, 1]);
    console.log(res);
}
async function creatorIdsOfOwner() {
    const res = await farcasterKey.creatorIdsOfOwner(addr0);
    console.log(res);
}
async function explicitOwnershipOf() {
    const res = await farcasterKey.explicitOwnershipOf(1);
    console.log(res);
}
async function explicitOwnershipsOf() {
    const res = await farcasterKey.explicitOwnershipsOf([0, 1]);
    console.log(res);
}
async function tokensOfOwner() {
    const res = await farcasterKey.tokensOfOwner(addr0);
    console.log(res);
}
async function tokensOfOwnerIn() {
    const res = await farcasterKey.tokensOfOwnerIn(addr0, 0, 2);
    console.log(res);
}

async function sendTx(abiData: string, wallet: ethers.Wallet) {
    const estimatedGas = await farcasterKey.estimateGas(wallet.address, abiData, BigInt(0));
    const transaction = await farcasterKey.generateTransaction(wallet.address, abiData, BigInt(0), estimatedGas * BigInt(3));
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await farcasterKey.provider.broadcastTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
}