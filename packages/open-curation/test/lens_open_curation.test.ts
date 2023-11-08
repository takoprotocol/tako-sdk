import { CONSTANT, TakoOpenCuration } from '../src';
import * as fs from 'fs';
import * as path from 'path';
const tako = new TakoOpenCuration(CONSTANT.Network.LOCALHOST);
const ecosystem = tako.lensOpenCuration;
let privateKey = "";
const address = "0xC439530f6A0582Bc09da70A3e52Ace7dF4b58A32";
const profileId = "0x01BD";
const pubIdWithMedia = "0x01bd-0x01-DA-84dddefe";
const postUriWithOutMedia = "ar://jZrE6RAeDhEhPDfZgSRvqFKOA9EYQzpxdFHLdDB4510";
const quotePostUriWithMedia = "ar://sE7gPSfgFFhStdyIMEg8KgYFWZj6dJqKRlKdyjtBdg0";
import * as ethers from 'ethers';
const url = "https://rpc.ankr.com/polygon_mumbai";
const web3Provider = new ethers.providers.JsonRpcProvider(url);
ecosystem.provider = web3Provider;
//1 0x01bd-0x01-DA-078b9925
//2 0x01bd-0x01-DA-606ded9f
(async () => {
    try {
        privateKey = await getPrivateKey();
        claimReward().catch(error => {
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
async function allBids() {
    const a = await ecosystem.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.All);
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function auth() {
    const lensV2 = ecosystem.lensProtocolV2;
    const challenge = await lensV2.generateChallenge(profileId);
    const signature = await lensV2.personalSignWithPrivateKey(privateKey, challenge.text);
    const authRes = await lensV2.auth(challenge.id, signature);
    console.log(`authenticate:${authRes}`);
}
async function publishQuotePost() {
    const lensV2 = ecosystem.lensProtocolV2;
    await auth();
    const typedData = await lensV2.generateMomokaQuoteTypedData(postUriWithOutMedia, "0x01bd-0x01-DA-da16dd1b");
    const signature = await lensV2.signTypeData(privateKey, typedData.typedData);
    const res = await lensV2.broadcastQuotePost(typedData.id, signature);
    console.log(`published quote post:${res.id}`);
    console.log(`${JSON.stringify(res)}`);
}
async function uploadToBundr() {
    const lensV2 = ecosystem.lensProtocolV2;
    const metadata = lensV2.buildPostMetadata("quote without media,2023.11.08 07:01", []);
    const txid = await ecosystem.uploadToBundlr(metadata);
    console.log(JSON.stringify(txid));
}
async function registerQuotePost() {
    const res = await ecosystem.register(2, "0x01bd-0x01-DA-606ded9f");
    console.log(`${JSON.stringify(res)}`);
}

async function createBidBatch() {
    const takoHubInfo = await ecosystem.takoHubInfo();
    const amounts = [BigInt(110), BigInt(120)];
    const totalAmount = amounts[0] + amounts[1];

    const contentIds = ["0x01bd-0x01-DA-84dddefe", "0x01bd-0x01-DA-da16dd1b"];
    const bidTokens = ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"];
    const abiData = await ecosystem.generateBidBatchAbiData(contentIds, bidTokens, amounts);
    const estimatedGas = await ecosystem.estimateGas(address, takoHubInfo.contract, abiData, totalAmount);
    const transaction = await ecosystem.generateTransaction(address, abiData, totalAmount, estimatedGas * BigInt(3));
    const wallet = new ethers.Wallet(privateKey);
    const signedRawTransaction = await wallet.signTransaction(transaction);
    //const res = await web3Provider.sendTransaction(signedRawTransaction);
    //console.log(`${JSON.stringify(res)}`);
}
async function createBid() {
    const takoHubInfo = await ecosystem.takoHubInfo();
    const amount = BigInt(110);
    const abiData = await ecosystem.generateBidAbiData("0x01bd-0x01-DA-84dddefe", "0x0000000000000000000000000000000000000000", amount);
    const estimatedGas = await ecosystem.estimateGas(address, takoHubInfo.contract, abiData, amount);
    const transaction = await ecosystem.generateTransaction(address, abiData, amount, estimatedGas * BigInt(3));
    const wallet = new ethers.Wallet(privateKey);
    const signedRawTransaction = await wallet.signTransaction(transaction);
    //sconst res = await web3Provider.sendTransaction(signedRawTransaction);
    //console.log(`${JSON.stringify(res)}`);
}

async function claimReward() {
    const index = 1;
    const contentId = "0x01bd-0x01-DA-078b9925";
    const sig = await ecosystem.verifyBid(address, index, contentId);
    console.log(`verify signature:${JSON.stringify(sig)}`);
    const abiData = await ecosystem.generateClaimRewardAbiData(index, 445, sig.relayer, contentId, sig.signature);
    const estimatedGas = await ecosystem.estimateGas(address, sig.contract, abiData, BigInt(0));
    const transaction = await ecosystem.generateTransaction(address, abiData, BigInt(0), estimatedGas * BigInt(3));
    const wallet = new ethers.Wallet(privateKey);
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await web3Provider.sendTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
}
async function curatorStatus() {
    const index = 1;
    const profileId = 445;
    const res = await ecosystem.curatorStatus(index, profileId);
    console.log(`${JSON.stringify(res)}`);
}