import { setTimeout } from 'timers';
import { CONSTANT, TakoV2 } from '../src';
//import { CONSTANT, TakoV2 } from '../build/src';

const tako = new TakoV2(CONSTANT.Network.LOCALHOST);
import * as ethers from 'ethers';
const phrase = "";
const privateKey = "0xaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbbaaaabbbb";//0xa68706Cd6607e0B8b86016971d72F85a60E8B7Ec

(async () => {
    try {

        await getToken().catch(err => {
            console.log(`error:${err}`);
        });
        //generateMessage();
    } catch (error) {
        console.log(`error:${error}`);
    }

})()
function getPrivateKey(phrase: string) {
    const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
    const walletMnemonic = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
    console.log(`address:${walletMnemonic.address} privateKey:${walletMnemonic.privateKey}`);
}

function generateMessage() {
    const res = tako.generateTokenMessage("0x0154eafa0dff0e4bd75400f068e97cb436dd14c3");
    console.log(JSON.stringify(res));
}
async function whitelistInfo() {
    const res = await tako.whitelistInfo("0x0154eafa0dff0e4bd75400f068e97cb436dd14c3");
    console.log(JSON.stringify(res));
}
async function isHashConfirmed() {
    const res = await tako.isHashConfirmed(["0x09df22b66b8431a3bf43bbe3cf7d2eef7f2bdf4b00afe44a6441935aaeafd93b",
        "0x09df22b66b8431a3bf43bbe3cf7d2eef7f2bdf4b00afe44a6441935aaeafd93b"]);
    console.log(JSON.stringify(res));
}
async function getToken() {
    const wallet = new ethers.Wallet(privateKey);
    const message = tako.generateTokenMessage(wallet.address);
    const signature = await tako.personalSignWithPrivateKey(privateKey, message);
    //const signature = await tako.personalSignWithPhrase(phrase, `m/44'/60'/0'/0/0`, message);
    const res = await tako.getToken(message, signature);
    console.log(`get token:${JSON.stringify(res)}`);
    //printToken();
    return res;
}
function printToken() {
    tako.lens.printToken();
    tako.farcaster.printToken();
    tako.lensOpenCuration.printToken();
}
async function refreshToken() {
    await getToken();
    setTimeout(async () => {
        const refreshRes = await tako.refreshToken();
        console.log(`refreshToken:${JSON.stringify(refreshRes)}`);
        //printToken();
    }, 3000)
}
async function sendBidCreateNotification() {
    await getToken();
    const txHash = "0xf47abea9ece2bab1197fdd4cbaba5a54344686091aec0be353fd6cb5d293ba47";
    //const txHash = "abc";
    const res = await tako.sendBidCreateNotification(txHash);
    console.log(res);

}