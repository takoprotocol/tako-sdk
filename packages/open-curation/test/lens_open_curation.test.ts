import { CONSTANT, TakoOpenCuration } from '../src';
const tako = new TakoOpenCuration(CONSTANT.Network.TESTNET);
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

async function allBids() {
    const a = await ecosystem.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.All);
    const res = await a.get();
    console.log(JSON.stringify(res));
}