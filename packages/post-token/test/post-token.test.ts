import { NewPostToken, Network, PostToken, Ecosystem } from '../src';
//import { NewPostToken, Network, PostToken, Ecosystem } from '../build/post-token/src';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';
let postToken: PostToken;

(async () => {
    try {
        postToken = await NewPostToken(Network.TESTNET);
        verifyFarcasterFid().catch(error => {
            console.log(`error:${error}`);
        });

    } catch (error) {
        console.log(`error:${error}`);
    }
})()

async function collectionsByAddress() {
    const res = await postToken.collectionsByAddress(Ecosystem.FARCASTER, "0x90F79bf6EB2c4f870365E785982E1f101E93b906", 10, 0);
    console.log(JSON.stringify(res));
}
async function postsByAddress() {
    const res = await postToken.postsByAddress(Ecosystem.LENS, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 10, 0);
    console.log(JSON.stringify(res));
}
async function profileInfo() {
    const res = await postToken.profileInfo(Ecosystem.FARCASTER, 1);
    console.log(JSON.stringify(res));
}
async function postInfo() {
    const res = await postToken.postInfo(Ecosystem.LENS, "0x01-0x14");
    console.log(JSON.stringify(res));
}
async function postsInfo() {
    const ids: string[] = [
        "0xde33643575401fb04caa9a60c5cccf0b37261880",
        "0xc63982f4e05a8c055d85631a91472d501e420250",
        "0x4879db43ab47e71f721c05b99eb12578674c33e0"
    ]
    const res = await postToken.postsInfo(Ecosystem.FARCASTER, ids);
    console.log(JSON.stringify(res));
}
async function verifyFarcasterFid() {
    const res = await postToken.verifyFarcasterFid("0xF6fd7deEc77d7B1061435585DF1d7FDfD4682577", 129, "0xde33643575401fb04caa9a60c5cccf0b37261880");
    console.log(JSON.stringify(res));
}
