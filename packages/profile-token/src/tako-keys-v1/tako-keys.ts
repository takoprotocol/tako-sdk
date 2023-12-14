import { BaseContract } from '../libs';
import { takoKeysV1abi } from '../assets';

class TakoKeysV1 extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, takoKeysV1abi);
    }
    public async creatorBuyFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.creatorBuyFeePercent();
        return res;
    }
    public async creatorSellFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.creatorSellFeePercent();
        return res;
    }
    public async protocolBuyFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.protocolBuyFeePercent();
        return res;
    }
    public async protocolSellFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.protocolSellFeePercent();
        return res;
    }
    public async farcasterKey(): Promise<string> {
        const res = await this._contractInfo.contract.farcasterKey();
        return res;
    }
    public async farcasterHub(): Promise<string> {
        const res = await this._contractInfo.contract.farcasterHub();
        return res;
    }
    public async poolInfo(creatorId: number): Promise<PoolInfo> {
        const res = await this._contractInfo.contract.poolInfo(creatorId);
        const info: PoolInfo = {
            idoPrice: res[0], idoAmount: res[1], sharesAmount: res[2],
            a: res[3], b: res[4], k: res[5], isCreated: res[6]
        }
        return info;
    }
    public async isOpenInit(): Promise<boolean> {
        const res = await this._contractInfo.contract.isOpenInit();
        return res;
    }
    public async sharesSupply(creatorId: number): Promise<number> {
        const res = await this._contractInfo.contract.sharesSupply(creatorId);
        return res;
    }
    public async userClaimable(address: string): Promise<bigint> {
        const res = await this._contractInfo.contract.userClaimable(address);
        return res;
    }

    public async getBuyPrice(creatorId: number, amount: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getBuyPrice(creatorId, amount);
        return res;
    }
    public async getBuyPriceAfterFee(creatorId: number, amount: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getBuyPriceAfterFee(creatorId, amount);
        return res;
    }
    public async getSellPrice(creatorId: number, amount: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getSellPrice(creatorId, amount);
        return res;
    }
    public async getSellPriceAfterFee(creatorId: number, amount: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getSellPriceAfterFee(creatorId, amount);
        return res;
    }
    public buySharesAbiData(creatorId: number, supplyAmount: number): string {
        return this._contractInfo.iface.encodeFunctionData("buyShares",
            [creatorId, supplyAmount]);
    }
    public sellSharesAbiData(tokenIds: number[], priceLimit: bigint): string {
        return this._contractInfo.iface.encodeFunctionData("sellShares",
            [tokenIds, priceLimit]);
    }
    public claimAbiData(): string {
        return this._contractInfo.iface.encodeFunctionData("claim");
    }
    public createSharesForPiecewiseAbiData(creatorId: number, startPrice: number, initialSupply: number, totalSupply: number, a: number, b: number, k: number): string {
        //uint256 creatorId, uint256 startPrice, uint256 initialSupply, uint256 totalSupply, uint256 a, uint256 b, uint256 k
        return this._contractInfo.iface.encodeFunctionData("createSharesForPiecewise",
            [creatorId, startPrice, initialSupply, totalSupply, a, b, k]);
    }
    public createSharesWithInitialBuyAbiData(creatorId: number, startPrice: number, initialSupply: number, totalSupply: number, a: number, b: number, k: number, shareNumber: number): string {
        //uint256 creatorId, uint256 startPrice, uint256 initialSupply, uint256 totalSupply, uint256 a, uint256 b, uint256 k
        return this._contractInfo.iface.encodeFunctionData("createSharesWithInitialBuy",
            [creatorId, startPrice, initialSupply, totalSupply, a, b, k, shareNumber]);
    }
}

interface PoolInfo {
    idoPrice: bigint,
    idoAmount: bigint,
    sharesAmount: bigint,
    a: bigint,
    b: bigint,
    k: bigint,
    isCreated: boolean
}
export { TakoKeysV1, PoolInfo }