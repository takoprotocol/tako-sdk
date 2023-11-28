import { BaseContract } from '../libs';

class TakoKeysV1 extends BaseContract {
    constructor() {
        super("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", 31337, "tako-keys-v1.abi");
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
    public async isOpenInit(): Promise<boolean> {
        const res = await this._contractInfo.contract.isOpenInit();
        return res;
    }
    public async sharesSupply(creatorId: number): Promise<number> {
        const res = await this._contractInfo.contract.sharesSupply(creatorId);
        return res;
    }
    public async moneySupply(creatorId: number): Promise<bigint> {
        const res = await this._contractInfo.contract.moneySupply(creatorId);
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

    public createSharesAbiData(creatorId: number, supplyAmount: number, totalPrice: bigint): string {
        return this._contractInfo.iface.encodeFunctionData("createShares",
            [creatorId, supplyAmount, totalPrice]);
    }

    //tobe test
    public sellSharesByAMMAbiData(tokenIds: number[], priceLimit: bigint): string {
        return this._contractInfo.iface.encodeFunctionData("sellSharesByAMM",
            [tokenIds, priceLimit]);
    }
    public buySharesByAMMAbiData(creatorId: number, supplyAmount: number): string {
        return this._contractInfo.iface.encodeFunctionData("buySharesByAMM",
            [creatorId, supplyAmount]);
    }
}
export { TakoKeysV1 }