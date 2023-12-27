import { ContentProfile } from '../src';
import {
    getPrivateKey, hardhatKey0, hardhatKey1,
    hardhatKey2, addr0, addr1, addr2, sendTx
} from '../../test';
import * as ethers from 'ethers';

let privateKey = "";
let key: ContentProfile;


(async () => {
    try {
        //tako.setProxy("http://127.0.0.1:19180");
        privateKey = await getPrivateKey();
        //const takoKeyContract = await utils.getTakoKeyContract(Network.TESTNET);
        //takoKeysV1 = new TakoKeysV1();
        // = new TakoKeysV1("0x5FbDB2315678afecb367f032d93F642f64180aa3", 31337);
        key = new ContentProfile("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", 31337);
        const url = "http://127.0.0.1:8545";
        //const url = "https://optimism.publicnode.com";
        key.provider = new ethers.JsonRpcProvider(url);
        contentProfileKey().catch(error => {
            console.log(`error:${error}`);
        });
    } catch (error) {
        console.log(`error:${error}`);
    }
})()
async function buy() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.buyAbiData(1);
    console.log()
    //await sendTx(abiData, wallet, BigInt(0));
}
async function claim() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const abiData = await key.claimAbiData();
    await sendTx(abiData, wallet, BigInt(0), key);
}
async function create() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const contentIdHash = "0x800e8dca929fd7b6ced10b5f84487c49f7be79b2eed662827eccba258ef883c6";
    console.log(contentIdHash.length);
    const abiData = key.createAbiData("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 1, 1, "", contentIdHash);
    console.log(abiData)
    //await sendTx(abiData, wallet, BigInt(0));
}
async function mint() {
    const wallet = new ethers.Wallet(hardhatKey0);
    const abiData = key.mintAbiData(1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log(abiData)
    //await sendTx(abiData, wallet, BigInt(0));
}
async function contentIdHashList() {
    const contentIdHash = "0x800e8dca929fd7b6ced10b5f84487c49f7be79b2eed662827eccba258ef883c6";
    const res = await key.contentIdHashList(contentIdHash);
    console.log(res);
}
async function contentProfileKey() {
    const res = await key.contentProfileKey();
    console.log(res);
}

/*
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

async function isOpenInit() {
    const res = await takoKeysV1.isOpenInit();
    console.log(`isOpenInit:${res}`);
}
async function decodeData() {
    const data = "0x8b24fb8900000000000000000000000000000000000000000000000000000000000041f9000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000221b262dd800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000e35fa931a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002"
    const decodedData = takoKeysV1.decodeAbiData("0x01");
    console.log(decodedData);
}*/