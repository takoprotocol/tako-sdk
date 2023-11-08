import { Network } from '../constant';
import { TakoV2, AllBids } from 'tako-js';
import { env, utils, TakoHubInfo, VerifyBidResponse, Signature } from '../utils';
import { LensProtocolV2 } from '../libs';
import * as fs from 'fs';
import * as ethers from 'ethers';

//this is lens open curation v2
class LensOpenCuration {
    private _network: Network;
    private _url: string;
    private _takoV2: TakoV2;
    private _lensProtocolV2: LensProtocolV2;
    private _ecosystem = "lens_open_curation_v2";
    private _iface: ethers.ethers.utils.Interface;
    private _takoHubInfo: TakoHubInfo = { chain: "", chain_id: 0, contract: "" };
    private _web3Provider: ethers.ethers.providers.JsonRpcProvider | null;

    constructor(network: Network, takoV2: TakoV2) {
        this._network = network;
        this._url = env.getTakoV2Url(network);
        this._takoV2 = takoV2;
        this._lensProtocolV2 = new LensProtocolV2(network);
        const myABI = JSON.parse(fs.readFileSync(`${__dirname}/${this._ecosystem}.abi`).toString());
        this._iface = new ethers.utils.Interface(myABI);
        this._web3Provider = null;
    }
    private async getTakoHubInfo() {
        if (this._takoHubInfo.chain_id == 0) {
            const info = await this._takoV2.takoInfo();
            this._takoHubInfo = info[this._ecosystem];
        }
    }
    public get allBids(): AllBids {
        return this._takoV2.lensOpenCurationV2.allBids;
    }
    public async uploadToBundlr(metaData: any) {
        const url = `${this._url}upload_bundlr`;
        const res = await utils.post(url, metaData);
        return res;
    }
    public get lensProtocolV2(): LensProtocolV2 {
        return this._lensProtocolV2;
    }
    public set provider(provider: ethers.ethers.providers.JsonRpcProvider) {
        this._web3Provider = provider;
    }

    public async takoHubInfo(): Promise<TakoHubInfo> {
        await this.getTakoHubInfo();
        return this._takoHubInfo;
    }
    public async register(index: number, pubId: string) {
        return await this._takoV2.lensOpenCurationV2.register(index, pubId);
    }
    public async generateBidAbiData(contentId: string, bidToken: string, bidAmount: bigint, merkleIndex?: number, merkleProof?: string[]): Promise<string> {
        return await this.generateBidBatchAbiData([contentId], [bidToken], [bidAmount], merkleIndex, merkleProof);
    }
    public async generateBidBatchAbiData(contentIds: string[], bidTokens: string[], bidAmounts: bigint[], merkleIndex?: number, merkleProof?: string[]): Promise<string> {
        if (contentIds.length != bidTokens.length || contentIds.length != bidAmounts.length || contentIds.length == 0) {
            throw "invalid input parameters";
        }
        for (let index = 0; index < bidTokens.length; index++) {
            if (!ethers.utils.isAddress(bidTokens[index])) {
                throw "invalid address";
            }
        }
        if (this._network == Network.MAINNET) {
            if (merkleIndex == undefined || merkleProof == undefined) {
                throw "invalid index or proof";
            }
        } else {
            merkleIndex = 0;
            merkleProof = [];
        }
        /*
        for (let index = 0; index < contentIds.length; index++) {
            const contentId = contentIds[index];
            const pub = await this._lensProtocolV2.fetchPublication(contentId);
            if (pub == null) {
                throw `"invalid pub id:${contentId}"`;
            }
        }*/
        //contentId,bidToken address, bidAmount,  proof index, proof []
        let bidData: any[] = [];
        for (let index = 0; index < contentIds.length; index++) {
            const contentId = contentIds[index];
            const bidToken = bidTokens[index];
            const bidAmount = bidAmounts[index];
            bidData.push([contentId, bidToken, bidAmount]);
        }
        const abiData = this._iface.encodeFunctionData("bidBatch",
            [bidData, [merkleIndex, merkleProof]]);
        return abiData;
    }
    public async estimateGas(from: string, to: string, data: string, value: bigint): Promise<bigint> {
        if (this._web3Provider == null) {
            throw "please set a provider before calling this function";
        }
        const estimatedGas = await this._web3Provider.estimateGas({
            from: from,
            to: to,
            data: data,
            value: value
        }).catch(error => {
            //console.log(error)
        });
        if (estimatedGas) {
            //return parseInt(estimatedGas['_hex'], 16);
            return estimatedGas.toBigInt();
        }
        return BigInt(1000000);
    }
    public async generateTransaction(from: string, abiData: string, value: bigint, gasLimit: bigint): Promise<ethers.ethers.providers.TransactionRequest> {
        await this.getTakoHubInfo();
        if (this._web3Provider == null) {
            throw "please set a provider before calling this function";
        }
        if (this._takoHubInfo.contract == "" || this._takoHubInfo.chain_id == 0) {
            throw "can't get tako hub info";
        }
        const feeData = await this._web3Provider.getFeeData();
        const nonce = await this._web3Provider.getTransactionCount(from);
        const transaction: ethers.ethers.providers.TransactionRequest = {
            to: this._takoHubInfo.contract,
            value: value,
            gasLimit: gasLimit,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(1),
            maxFeePerGas: feeData.maxFeePerGas?.mul(1),
            nonce: nonce,
            type: 2,
            chainId: this._takoHubInfo.chain_id,
            data: abiData
        };
        return transaction;
    }

    public async verifyBid(address: string, index: number, pubId: string): Promise<VerifyBidResponse> {
        return await this._takoV2.lensOpenCurationV2.verifyBid(address, index, pubId);
    }

    public async generateClaimRewardAbiData(index: number, curatorId: number, relayer: string, contentId: string, signature: Signature) {
        //index,curatorId relayer, contentId,  sig(v,r,s,deadline);
        if (!ethers.utils.isAddress(relayer)) {
            throw "invalid address";
        }
        const abiData = this._iface.encodeFunctionData("loanWithSig",
            [index, curatorId, relayer, contentId, [signature.v, signature.r, signature.s, signature.deadline]]);
        return abiData;
    }
    public async curatorStatus(index: number, profileId: number) {
        return await this._takoV2.lensOpenCurationV2.curatorStatus(index, profileId);
        //passed: claimed
        //not enrolled:Curated but not eligible
        //enrolled, best:claimable
    }
}

export { LensOpenCuration }