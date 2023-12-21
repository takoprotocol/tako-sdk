import { CONSTANT, TakoV2 } from '../src';
import { get, post } from '../src/utils/utils';
import * as ethers from 'ethers';
const privateKey = "0xaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbb";//0xa68706Cd6607e0B8b86016971d72F85a60E8B7Ec
const tako = new TakoV2(CONSTANT.Network.LOCALHOST);
const ecosystem = tako.farcaster;
(async () => {
    try {
        //bidsCreated();
        verifyBid().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }

})()
async function indexPairs() {
    const res = await ecosystem.indexPairs([11588, 15706]);
    console.log(JSON.stringify(res));
}
async function recentCurators() {
    const res = await ecosystem.recentCurators();
    console.log(JSON.stringify(res));
}
async function curatorLastBidPrice() {
    const res = await ecosystem.curatorLastBidPrice([11654]);
    console.log(JSON.stringify(res));
}
async function curatorAccepted() {
    //const res = await ecosystem.curatorAccepted(12449, 0);
    const res = await ecosystem.curatorAccepted(undefined, 0);
    console.log(JSON.stringify(res));
}
async function bidsReceivedStats() {
    const res = await ecosystem.bidsReceivedStats([11588], false);
    console.log(JSON.stringify(res));
}
async function bidsCreatedStats() {
    const res = await ecosystem.bidsCreatedStats.addresses(["0xAA781B0e73c44E64a662CF1891a2A45176cD7932"]).get();
    console.log(JSON.stringify(res));
}
async function bidsConfirmingReceived() {
    const res = await ecosystem.bidsConfirmingReceived([11588]);
    console.log(JSON.stringify(res));
}
//addresses ids bidtype limit offset sort sorttype state
async function bidsCreated() {
    //addresses
    const ids = [34550];
    const addresses = ["0xAA781B0e73c44E64a662CF1891a2A45176cD7932"];
    const bidTypes = ["Cast", "Reply", "Recast"];
    //addresses(addresses). bidType(bidTypes).
    const a = ecosystem.bidsCreated.addresses(addresses).bidType(bidTypes).
        limit(10).offset(0).sort("bid_expires").DESC.state("Cancel");
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function bidsIgnored() {
    const ids = [11588];
    const bidTypes = ["Cast"];
    const a = ecosystem.bidsIgnored.ids(ids).bidType(bidTypes).
        limit(3).offset(0).DESC.sort("bid_amount");
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function bidsReceived() {
    const ids = [11588];
    const bidTypes = ["Cast", "Reply", "Recast"];
    const a = ecosystem.bidsReceived.ids(ids).bidType(bidTypes).
        limit(3).offset(0).DESC.sort("bid_amount").includeIgnore(false).state("Pending");
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function getToken() {
    const wallet = new ethers.Wallet(privateKey);
    const message = tako.generateTokenMessage(wallet.address);
    const signature = await tako.personalSignWithPrivateKey(privateKey, message);
    //const signature = await tako.personalSignWithPhrase(phrase, `m/44'/60'/0'/0/0`, message);
    const res = await tako.getToken(message, signature);
    console.log(`get token:${JSON.stringify(res)}`);
    return res;
}
async function ignoreBid() {
    await getToken();
    const res = await ecosystem.ignoreBid(false, 1, [11588]);
    console.log(JSON.stringify(res));
}
async function verifyBid() {
    const res = await ecosystem.verifyBid("0xAA781B0e73c44E64a662CF1891a2A45176cD7932", 1, "0x01-0x01");//, [34370]
    console.log(JSON.stringify(res));
}