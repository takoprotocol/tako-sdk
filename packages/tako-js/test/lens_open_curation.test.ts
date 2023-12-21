import { CONSTANT, TakoV2 } from '../src';
const tako = new TakoV2(CONSTANT.Network.TESTNET);
const ecosystem = tako.lensOpenCuration;
(async () => {
    try {
        allBids().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }

})()
async function indexPairs() {
    const res = await ecosystem.indexPairs([1]);
    console.log(JSON.stringify(res));
}
async function recentCurators() {
    const res = await ecosystem.recentCurators();
    console.log(JSON.stringify(res));
}
async function curatorLastBidPrice() {
    const res = await ecosystem.curatorLastBidPrice([34370]);
    console.log(JSON.stringify(res));
}
async function curatorAccepted() {
    const res = await ecosystem.curatorAccepted(34370, 0);
    console.log(JSON.stringify(res));
}
async function bidsCreatedStats() {
    const res = await ecosystem.bidsCreatedStats.addresses(["0xCe41cdCCA1849CaD58DaACc6005B1990Be04e1F0"]).get();
    console.log(JSON.stringify(res));
}
async function bidsCreated() {
    //addresses
    const ids = [34550];
    const addresses = ["0xCe41cdCCA1849CaD58DaACc6005B1990Be04e1F0", "0xAA781B0e73c44E64a662CF1891a2A45176cD7932"];
    const bidTypes = ["QuotedPublication", "Post"];
    //addresses(addresses). bidType(bidTypes).
    const a = ecosystem.bidsCreated.addresses(addresses).bidType(bidTypes).
        limit(10).offset(0).sort(CONSTANT.Sort.CreateAt).DESC//.state(CONSTANT.State.Pass);
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function passedBids() {
    const a = ecosystem.passedBids.limit(0).offset(0);
    const res = await a.get();
    console.log(JSON.stringify(res));
}
async function register() {
    const res = await ecosystem.register(1, "0x923d-0x01");
    console.log(JSON.stringify(res));
}
async function verifyBid() {
    const res = await ecosystem.verifyBid("0xAA781B0e73c44E64a662CF1891a2A45176cD7932", 1, "0x01-0x01");//, [34370]
    console.log(JSON.stringify(res));
}
async function allBids() {
    const a = await ecosystem.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.Ended);
    const res = await a.get();
    console.log(JSON.stringify(res));
}