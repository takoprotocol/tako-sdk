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

(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        balanceOf().catch(error => {
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
    const owner = await farcasterKey.ownerOf(2);
    console.log(owner);
}
async function balanceOf() {
    const balance = await farcasterKey.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    console.log(balance);
}