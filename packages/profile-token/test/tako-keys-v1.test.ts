import { TakoKeysV1 } from '../src';
//import { TakoFarcaster } from '../build/src';
import * as fs from 'fs';
import * as path from 'path';
import * as ethers from 'ethers';
let privateKey = "";
const takoKeysV1 = new TakoKeysV1();
const url = "http://127.0.0.1:8545";
const web3Provider = new ethers.JsonRpcProvider(url);
takoKeysV1.provider = web3Provider;
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
        userClaimable().catch(error => {
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
async function farcasterKey() {
    const res = await takoKeysV1.farcasterKey();
    console.log(res);
}
async function sharesMoneySupply() {
    const sharesSupply = await takoKeysV1.sharesSupply(1);
    const moneySupply = await takoKeysV1.moneySupply(1);
    const moneySupplyInEther = ethers.formatEther(moneySupply);
    console.log(`sharesSupply:${sharesSupply},moneySupply:${moneySupplyInEther} ether`);
}
async function createShares() {
    const wallet = new ethers.Wallet(hardhatKey1);
    const totalAmount = ethers.parseEther("0.1");//0.1eth
    const abiData = takoKeysV1.createSharesAbiData(1, 5, totalAmount);
    await sendTx(abiData, wallet, BigInt(0));
}
async function buySharesByAMM() {
    const wallet = new ethers.Wallet(hardhatKey2);
    const totalAmount = ethers.parseEther("0.1");//0.1eth
    //value
    //uint256 price = supply * money /(supply - supplyChangeAmount) - money;

    // uint256 protocolFee = (price * protocolBuyFeePercent) / 1 ether;
    //uint256 creatorFee = (price * creatorBuyFeePercent) / 1 ether;
    //msg.value >= fee.price + fee.protocolFee + fee.creatorFee
    const abiData = takoKeysV1.buySharesByAMMAbiData(1, 2);
    //await sendTx(abiData, wallet);
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
    console.log(res);
}
