import { NewFarcasterPostToken, Network, FarcasterPostToken } from '../src';
//import { NewPostToken, Network, PostToken, Ecosystem } from '../build/post-token/src';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';
let postToken: FarcasterPostToken;

(async () => {
    try {
        postToken = await NewFarcasterPostToken(Network.TESTNET);
        verifyFarcasterFid().catch(error => {
            console.log(`error:${error}`);
        });

    } catch (error) {
        console.log(`error:${error}`);
    }
})()

async function collectionsByAddress() {
    const res = await postToken.collectionsByAddress("0x90F79bf6EB2c4f870365E785982E1f101E93b906", 10, 0);
    console.log(JSON.stringify(res));
}
async function postsByAddress() {
    const res = await postToken.postsByAddress("0xddeCdC1fBF6e8d15cCDf83c3E817E16dBe419490", 10, 0);
    console.log(JSON.stringify(res));
}
async function profileInfo() {
    const res = await postToken.profileInfo(11588);
    console.log(JSON.stringify(res));
}
async function postInfo() {
    const res = await postToken.postInfo("0x2102b791156e09885c0c462621565f59f2fd999a");
    console.log(JSON.stringify(res));
}
async function postsInfo() {
    const ids: string[] = [
        "0x2102b791156e09885c0c462621565f59f2fd999a",
    ]
    const res = await postToken.postsInfo(ids);
    console.log(JSON.stringify(res));
}
async function profilesInfo() {
    const ids: number[] = [
        11588, 225385
    ]
    const res = await postToken.profilesInfo(ids);
    console.log(JSON.stringify(res));
}
async function verifyFarcasterFid() {
    const res = await postToken.verifyFarcasterFid(11588, "0x2102b791156e09885c0c462621565f59f2fd999a");
    console.log(JSON.stringify(res));
}
