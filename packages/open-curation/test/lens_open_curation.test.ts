import { CONSTANT, TakoOpenCuration } from '../src';
const tako = new TakoOpenCuration(CONSTANT.Network.TESTNET);
const ecosystem = tako.lensOpenCuration;
const url = "https://rpc.ankr.com/polygon_mumbai";
const web3Provider = new ethers.providers.JsonRpcProvider(url);
ecosystem.provider = web3Provider;


//import { CONSTANT, TakoOpenCuration } from '../build/src';

import * as fs from 'fs';
import * as path from 'path';

let privateKey = "";
const address = "0xC439530f6A0582Bc09da70A3e52Ace7dF4b58A32";
const profileId = "0x01BD";
const pubIdWithMedia = "0x01bd-0x01-DA-84dddefe";
const postUriWithOutMedia = "ar://jZrE6RAeDhEhPDfZgSRvqFKOA9EYQzpxdFHLdDB4510";
const quotePostUriWithMedia = "ar://sE7gPSfgFFhStdyIMEg8KgYFWZj6dJqKRlKdyjtBdg0";
import * as ethers from 'ethers';

//1 0x01bd-0x01-DA-078b9925
//2 0x01bd-0x01-DA-606ded9f
(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        registerQuotePost().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()
async function httpTest() {
    tako.setProxy("http://127.0.0.1:19180");
    const res = await ecosystem.testGraphql();
    console.log(JSON.stringify(res));
    //await utils.get("https://google.com")
}
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
    const a = await ecosystem.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.All).ids([445]);
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
    //const res = await lensV2.broadcastQuotePost(typedData.id, signature);
    //console.log(`published quote post:${res.id}`);
    //console.log(`${JSON.stringify(res)}`);
}

async function registerQuotePost() {
    const res = await ecosystem.register(25, "0x01bd-0x01-DA-9323c7c9");
    console.log(`${JSON.stringify(res)}`);
}

async function createBidBatchTest() {
    const amounts = [BigInt(110)];
    const contentIds = ["0x01bd-0x01-DA-84dddefe"];
    await createBidBatch(amounts, contentIds);
}
async function createBidBatch(amounts: bigint[], contentIds: string[]) {
    const takoHubInfo = await ecosystem.takoHubInfo();
    let totalAmount = BigInt(0);
    let bidTokens: string[] = [];
    amounts.forEach(amount => {
        totalAmount += amount;
        bidTokens.push("0x0000000000000000000000000000000000000000");
    })
    const abiData = await ecosystem.generateBidBatchAbiData(contentIds, bidTokens, amounts);
    const estimatedGas = await ecosystem.estimateGas(address, takoHubInfo.contract, abiData, totalAmount);
    const transaction = await ecosystem.generateTransaction(address, abiData, totalAmount, estimatedGas * BigInt(3));
    const wallet = new ethers.Wallet(privateKey);
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await web3Provider.sendTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
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
    const index = 20;
    const profileId = 445;
    const res = await ecosystem.curatorStatus(index, profileId);
    console.log(`${JSON.stringify(res)}`);
}