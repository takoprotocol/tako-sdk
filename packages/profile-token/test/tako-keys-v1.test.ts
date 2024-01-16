import { TakoKeysV1, utils, Network } from '../src';

//import { TakoFarcaster } from '../build/src';
import * as fs from 'fs';
import * as path from 'path';
import * as ethers from 'ethers';

let privateKey = "";
let takoKeysV1: TakoKeysV1;

const hardhatKey0 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const hardhatKey1 = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const hardhatKey2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
const addr0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const addr1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const addr2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        //const takoKeyContract = await utils.getTakoKeyContract(Network.TESTNET);
        //takoKeysV1 = new TakoKeysV1();
        // = new TakoKeysV1("0x5FbDB2315678afecb367f032d93F642f64180aa3", 31337);
        takoKeysV1 = new TakoKeysV1("0xFc014AECdE06182A4ff3B888e378d0C8F945619b", 10);
        //const url = "http://127.0.0.1:8545";
        const url = "https://optimism.publicnode.com";

        takoKeysV1.provider = new ethers.JsonRpcProvider(url);
        createShares().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()
async function getTakoKeyInfo() {
    const res = await utils.getTakoKeyContract(Network.LOCALHOST);
    console.log(res);

}
async function getPrivateKey() {
    const fileName = 'privatekey';
    let base = __dirname;
    for (let index = 0; index < 3; index++) {
        base = path.dirname(base);
    }
    const prikey = await fs.readFileSync(path.join(base, fileName)).toString();
    if (prikey != "") {
        const wallet = new ethers.Wallet(prikey);
        console.log(`test key addr:${wallet.address}`);
    }
    return prikey;
}
async function sendTx(abiData: string, wallet: ethers.Wallet, amount: bigint) {
    const estimatedGas = await takoKeysV1.estimateGas(wallet.address, abiData, amount);
    const transaction = await takoKeysV1.generateTransaction(wallet.address, abiData, amount, estimatedGas * BigInt(3));
    const signedRawTransaction = await wallet.signTransaction(transaction);
    const res = await takoKeysV1.provider.broadcastTransaction(signedRawTransaction);
    console.log(`${JSON.stringify(res)}`);
}

async function info() {
    const creatorBuyFeePercent = await takoKeysV1.creatorBuyFeePercent();
    const creatorSellFeePercent = await takoKeysV1.creatorSellFeePercent();
    const protocolBuyFeePercent = await takoKeysV1.protocolBuyFeePercent();
    const protocolSellFeePercent = await takoKeysV1.protocolSellFeePercent();
    console.log(`creatorBuyFeePercent:${creatorBuyFeePercent},creatorSellFeePercent:${creatorSellFeePercent},
    protocolBuyFeePercent:${protocolBuyFeePercent},protocolSellFeePercent:${protocolSellFeePercent}`);
}
async function poolInfo() {
    const res = await takoKeysV1.poolInfo(11588);
    console.log(res);
}
async function farcasterKey() {
    const res = await takoKeysV1.farcasterKey();
    console.log(res);
}
async function sharesSupply() {
    const sharesSupply = await takoKeysV1.sharesSupply(1);
    console.log(`sharesSupply:${sharesSupply}`);
}
async function createShares() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = takoKeysV1.createSharesForPiecewiseAbiData(196785, 1, 5, 20, 1, 2, true, 3, true);
    console.log(abiData)
    //await sendTx(abiData, wallet, BigInt(0));
}
async function createSharesWithInitialBuy() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = takoKeysV1.createSharesWithInitialBuyAbiData(196784, 1, 5, 20, 1, 1, true, 1, true, 1);
    console.log()
    //await sendTx(abiData, wallet, BigInt(0));
}
async function buyShares() {
    const wallet = new ethers.Wallet(hardhatKey2);
    const amount = 1;
    const creatorId = 1;
    const totalAmount = await takoKeysV1.getBuyPriceAfterFee(creatorId, amount);
    const abiData = takoKeysV1.buySharesAbiData(creatorId, amount);
    await sendTx(abiData, wallet, totalAmount);
}
async function sellShares() {
    const wallet = new ethers.Wallet(hardhatKey2);
    const amount = 1;
    const creatorId = 1;
    const priceLimit = await takoKeysV1.getSellPriceAfterFee(creatorId, amount);
    const abiData = takoKeysV1.sellSharesAbiData([0], priceLimit);
    await sendTx(abiData, wallet, BigInt(0));
}
async function getBuyPrice() {
    const buyPrice = await takoKeysV1.getBuyPrice(1, 1);
    const buyPriceAfterFee = await takoKeysV1.getBuyPriceAfterFee(1, 1);
    console.log(`buyPrice:${buyPrice},buyPriceAfterFee:${buyPriceAfterFee}`);
}
async function getSellPrice() {
    const sellPrice = await takoKeysV1.getSellPrice(1, 1);
    const sellPriceAfterFee = await takoKeysV1.getSellPriceAfterFee(1, 1);
    console.log(`getSellPrice:${sellPrice},sellPriceAfterFee:${sellPriceAfterFee}`);
}
async function userClaimable() {
    const res = await takoKeysV1.userClaimable(addr1);
    console.log(`addr:${addr1} claimable:${res}`);
}
async function claim() {
    await userClaimable();
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = await takoKeysV1.claimAbiData();
    await sendTx(abiData, wallet, BigInt(0));
}
async function isOpenInit() {
    const res = await takoKeysV1.isOpenInit();
    console.log(`isOpenInit:${res}`);
}
async function decodeData() {
    const data = "0x8b24fb8900000000000000000000000000000000000000000000000000000000000041f9000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000221b262dd800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000e35fa931a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002"
    const decodedData = takoKeysV1.decodeAbiData("0x01");
    console.log(decodedData);
}