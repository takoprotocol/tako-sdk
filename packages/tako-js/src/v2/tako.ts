import { Network } from '../constant';
import { env, utils } from '../utils';
import * as ethers from 'ethers';
import { Lens } from './lens';
import { LensV2 } from './lens_v2';
import { LensOpenCuration } from './lens_open_curation';
import { Farcaster } from './farcaster';
import { LensOpenCurationV2 } from './lens_open_curation_v2';
import { EcosystemBasic } from '../ecosystem';
import { Token } from '../libs';

enum Apis {
    TakohubInfo = 'takohub_info',
    WhitelistInfo = 'whitelist_info',
    IsHashConfirmed = 'hashes/confirmed',
    GetToken = 'token',
    RefreshToken = 'refresh_token',
    SendBidCreateNotification = 'notification/bid_create',
}

class TakoV2 {
    private _network: Network;
    private _url: string;
    private _lens: Lens;
    private _lensV2: LensV2;
    private _lensOpenCuration: LensOpenCuration;
    private _farcaster: Farcaster;
    private _lensOpenCurationV2: LensOpenCurationV2;
    private _token: Token = new Token();
    constructor(network: Network) {
        this._network = network;
        this._url = env.getTakoV2Url(network);
        EcosystemBasic.setToken(this._token);
        this._lens = new Lens(network, this._url);
        this._lensV2 = new LensV2(network, this._url);
        this._lensOpenCuration = new LensOpenCuration(network, this._url);
        this._farcaster = new Farcaster(network, this._url);
        this._lensOpenCurationV2 = new LensOpenCurationV2(network, this._url);
    }
    private generateDateString(): string {
        //2023-07-19T05:51:05.776Z Z UTC time
        const date = new Date();
        return date.toISOString();
    }
    private isValidTxHash(txHash: string): boolean {
        if (txHash.length != 66) {
            return false;
        }
        const reg = new RegExp("^0x[A-Fa-f0-9]{64}$");
        return reg.test(txHash);
    }

    public get network(): string {
        return this._network;
    }
    public get lens(): Lens {
        return this._lens;
    }
    public get lensV2(): LensV2 {
        return this._lensV2;
    }
    public get farcaster(): Farcaster {
        return this._farcaster;
    }
    public get lensOpenCuration(): LensOpenCuration {
        return this._lensOpenCuration;
    }
    public get lensOpenCurationV2(): LensOpenCurationV2 {
        return this._lensOpenCurationV2;
    }

    public async takoInfo() {
        const url = `${this._url}${Apis.TakohubInfo}`;
        return await utils.get(url);
    }
    public async whitelistInfo(address: string) {
        if (!ethers.isAddress(address)) {
            throw "invalid address";
        }
        const url = `${this._url}${Apis.WhitelistInfo}/${address}`;
        return await utils.get(url);
    }
    public async isHashConfirmed(hashes: string[]) {
        const _hashes = ([] as string[]).concat(hashes)
        const url = `${this._url}${Apis.IsHashConfirmed}`;
        const reqBody = { "hashes": _hashes };
        return await utils.post(url, reqBody);
    }
    public generateTokenMessage(address: string) {
        if (!ethers.isAddress(address)) {
            throw "invalid address";
        }
        const dateStr = this.generateDateString();
        return `https://takoyaki.so wants you to sign in with your Ethereum \naccount:\n${address}\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nURI: https://takoyaki.so\nIssued At:\n${dateStr}\n\n`;
    }
    public async personalSignWithPrivateKey(privateKey: string, message: string) {
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(message);
        return signature;
    }
    public async personalSignWithPhrase(phrase: string, path: string, message: string) {
        const mnemonic = ethers.Mnemonic.fromPhrase(phrase);
        const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, path);
        return await this.personalSignWithPrivateKey(wallet.privateKey, message);
    }
    public async getToken(message: string, signature: string) {
        const url = `${this._url}${Apis.GetToken}`;
        const reqBody = { "message": message, "signature": signature };
        try {
            const res = await utils.post(url, reqBody);
            this._token.set(res);
            return res;
        } catch (error) {
            throw error;
        }
    }
    public async refreshToken() {
        if (this._token.isExpired()) {
            throw "token expired";
        }
        const url = `${this._url}${Apis.RefreshToken}`;
        const reqBody = { "refresh_token": this._token.refreshToken };
        try {
            const res = await utils.post(url, reqBody);
            this._token.set(res);
            return res;
        } catch (error) {
            throw error;
        }
    }
    public async sendBidCreateNotification(txHash: string) {
        const isValidHash = this.isValidTxHash(txHash);
        if (!isValidHash) {
            throw "invalid transaction hash";
        }
        const url = `${this._url}${Apis.SendBidCreateNotification}`;
        const reqBody = { "txHash": txHash };
        const res = await utils.postWithToken(url, this._token.authorizationStr, reqBody);
        return res
    }
    public async test(address: string) {
        if (!ethers.isAddress(address)) {
            throw "invalid address";
        }
        const url = `${this._url}${Apis.WhitelistInfo}/${address}`;
        return await utils.get(url);
    }
}

export { TakoV2 }