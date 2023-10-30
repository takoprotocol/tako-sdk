import { CONSTANT, TakoOpenCuration } from '../src';
const tako = new TakoOpenCuration(CONSTANT.Network.LOCALHOST);
const ecosystem = tako.lensOpenCuration;
const privateKey = "0x...";
const address = "0xC439530f6A0582Bc09da70A3e52Ace7dF4b58A32";
const profileId = "0x01BD";
const pubIdWithMedia = "0x01bd-0x01-DA-84dddefe";
const postUriWithMedia = "ar://r2hzi8GBstdQdlA1J9gxWh07ZszSC8rtd1YHRB7lloM";
const quotePostUriWithMedia = "ar://sE7gPSfgFFhStdyIMEg8KgYFWZj6dJqKRlKdyjtBdg0";

(async () => {
    try {
        publishQuotePost().catch(error => {
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
async function auth() {
    const lensV2 = ecosystem.lensV2;
    const challenge = await lensV2.generateChallenge(profileId);
    const signature = await lensV2.personalSignWithPrivateKey(privateKey, challenge.text);
    const authRes = await lensV2.auth(challenge.id, signature);
    console.log(`authenticate:${authRes}`);
}
async function publishQuotePost() {
    const lensV2 = ecosystem.lensV2;
    await auth();
    const typedData = await lensV2.generateMomokaQuoteTypedData(quotePostUriWithMedia, pubIdWithMedia);
    const signature = await lensV2.signTypeData(privateKey, typedData.typedData);
    const res = await lensV2.broadcastQuotePost(typedData.id, signature);
    console.log(`published quote post:${res.id}`);
    console.log(`${JSON.stringify(res)}`);
}
async function uploadToBundr() {
    const lensV2 = ecosystem.lensV2;
    const metadata = lensV2.buildPostMetadata("quote without media", []);
    const txid = await ecosystem.uploadToBundlr(metadata);
    console.log(txid);
}
async function registerQuotePost() {
    const res = await ecosystem.register(1, "0x01bd-0x01-DA-84dddefe");
    console.log(`${JSON.stringify(res)}`);
}