import { CONSTANT, TakoV2 } from '../src';
import * as ethers from 'ethers';
const tako = new TakoV2(CONSTANT.Network.LOCALHOST);
const ecosystem = tako.lens;
const privateKey = "0xaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbb";//0xa68706Cd6607e0B8b86016971d72F85a60E8B7Ec

(async () => {
    try {
        await passedBids().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }

})()
async function indexPairs() {
    const res = await ecosystem.indexPairs([34550]);
    console.log(JSON.stringify(res));
}
async function recentCurators() {
    const res = await ecosystem.recentCurators();
    console.log(JSON.stringify(res));
}
async function curatorLastBidPrice() {
    const res = await ecosystem.curatorLastBidPrice([34550]);
    console.log(JSON.stringify(res));
}
async function curatorAccepted() {
    const res = await ecosystem.curatorAccepted(34550, 0);
    console.log(JSON.stringify(res));
}
async function bidsReceivedStats() {
    const res = await ecosystem.bidsReceivedStats([34370], false);
    console.log(JSON.stringify(res));
}
async function bidsCreatedStats() {
    const res = await ecosystem.bidsCreatedStats.ids([35354]).addresses(["0x793eC059cCc2Ceeb8c6748111550b23c4e0072Bb"]).get();
    console.log(JSON.stringify(res));
}
async function bidsConfirmingReceived() {
    const res = await ecosystem.bidsConfirmingReceived([35354]);
    console.log(JSON.stringify(res));
}
async function bidsCreated() {
    const ids = [34550];
    const addresses = ["0x793eC059cCc2Ceeb8c6748111550b23c4e0072Bb"];
    const bidTypes = ["QuotedPublication", "Post", "Mirror"];
    //addresses(addresses). bidType(bidTypes).
    const a = ecosystem.bidsCreated.ids(ids).bidType(bidTypes).addresses(addresses).
        limit(3).offset(0).DESC//.state("Pending");
    const res = await a.get();
    console.log(JSON.stringify(res));
    const b = ecosystem.bidsCreated.ids(ids).bidType(bidTypes).addresses(addresses).
        limit(3).offset(0).DESC.state("Pending");
    const resb = await b.get();
    console.log(JSON.stringify(resb));
}
async function bidsIgnored() {
    const ids = [34370];
    const bidTypes = ["Mirror", "Post"];
    const a = ecosystem.bidsIgnored.ids(ids).bidType(bidTypes).
        limit(3).offset(0).DESC.sort("bid_amount");
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function bidsReceived() {
    const ids = [34370];
    const bidTypes = ["Mirror", "Post", "Comment"];
    const a = ecosystem.bidsReceived.ids(ids).bidType(bidTypes).
        limit(3).offset(0).DESC.sort("bid_amount").includeIgnore(false).state("Pending");
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function passedBids() {
    const a = ecosystem.passedBids.limit(0).offset(0);
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
    const res = await ecosystem.ignoreBid(false, 3, "polygon");//, [34370]
    console.log(JSON.stringify(res));
}
async function verifyBid() {
    const res = await ecosystem.verifyBid("0xAA781B0e73c44E64a662CF1891a2A45176cD7932", 1, "0x01-0x01");//, [34370]
    console.log(JSON.stringify(res));
}