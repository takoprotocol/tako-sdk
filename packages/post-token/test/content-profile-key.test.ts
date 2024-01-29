import { ContentProfileKey, NewFarcasterPostToken, Network } from '../src';
//import { ContentProfileKey } from '../build/content-profile/src';
import * as fs from 'fs';
import * as path from 'path';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';
let privateKey = "";
let key: ContentProfileKey;

(async () => {
    try {
        privateKey = await getPrivateKey();
        //http://127.0.0.1:8545 31337
        // const takoKeyContract = await utils.getTakoKeyContract(Network.LOCALHOST);
        // const takoKeysV1 = new TakoKeysV1(takoKeyContract.contract, takoKeyContract.chain_id);
        //const url = "https://optimism.publicnode.com";
        // takoKeysV1.provider = new ethers.JsonRpcProvider(url);
        //const farcasterKeyAddr = await takoKeysV1.farcasterKey();
        const postToken = await NewFarcasterPostToken(Network.TESTNET);
        key = postToken.contentProfileKey;
        //const url = "http://127.0.0.1:8545";
        const url = "https://optimism.publicnode.com";
        key.provider = new ethers.JsonRpcProvider(url);
        balanceOf().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()

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
    //await sendTx(abiData, wallet);
}
async function balanceOf() {
    const balance = await key.balanceOf("0xddeCdC1fBF6e8d15cCDf83c3E817E16dBe419490");
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
