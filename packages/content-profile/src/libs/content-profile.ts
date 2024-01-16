import { BaseContract } from '../../../pkg/libs';
import { contentProfileAbi } from '../assets';
class ContentProfile extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, contentProfileAbi);
    }
    public async contentIdHashList(contentIdHash: string): Promise<number> {
        const res = await this._contractInfo.contract.contentIdHashList(contentIdHash);
        return res;
    }
    public async contentProfileKey(): Promise<string> {
        const res = await this._contractInfo.contract.contentProfileKey();
        return res;
    }
    public async creatorBuyFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.creatorBuyFeePercent();
        return res;
    }
    public async protocolBuyFeePercent(): Promise<bigint> {
        const res = await this._contractInfo.contract.protocolBuyFeePercent();
        return res;
    }
    public async creatorInit(creator: string): Promise<boolean> {
        const res = await this._contractInfo.contract.creatorInit(creator);
        return res;
    }
    public async factor(): Promise<bigint> {
        const res = await this._contractInfo.contract.FACTOR();
        return res;
    }
    public async getBuyPrice(contentProfileId: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getBuyPrice(contentProfileId);
        return res;
    }
    public async getBuyPriceAfterFee(contentProfileId: number): Promise<bigint> {
        const res = await this._contractInfo.contract.getBuyPriceAfterFee(contentProfileId);
        return res;
    }
    public async getCurrentTokenId(): Promise<number> {
        const res = await this._contractInfo.contract.getCurrentTokenId();
        return res;
    }
    public async isOpenInit(): Promise<boolean> {
        const res = await this._contractInfo.contract.isOpenInit();
        return res;
    }
    public async isPeripheral(addr: string): Promise<boolean> {
        const res = await this._contractInfo.contract.isPeripheral(addr);
        return res;
    }
    public async userClaimable(address: string): Promise<bigint> {
        const res = await this._contractInfo.contract.userClaimable(address);
        return res;
    }
    public async profileClaimable(contentProfileId: number): Promise<bigint> {
        const res = await this._contractInfo.contract.profileClaimbale(contentProfileId);
        return res;
    }
    public async tokenPriceInfo(contentProfileId: number): Promise<AssetInfo> {
        const res = await this._contractInfo.contract.tokenPriceInfo(contentProfileId);
        const info: AssetInfo = {
            creator: res[0], owner: res[1], basePrice: res[2],
            currentPriceIndex: res[3]
        }
        return info;
    }

    //
    public buyAbiData(contentProfileId: number, creator: string): string {
        return this._contractInfo.iface.encodeFunctionData("Buy", [contentProfileId, creator]);
    }
    public claimAbiData(): string {
        return this._contractInfo.iface.encodeFunctionData("claim");
    }
    public mintAbiData(contentProfileId: number, desitination: string): string {
        return this._contractInfo.iface.encodeFunctionData("Mint",
            [contentProfileId, desitination]);
    }
    public updateAbiData(contentProfileId: number, basePrice: bigint, priceIndex: number): string {
        return this._contractInfo.iface.encodeFunctionData("update",
            [contentProfileId, basePrice, priceIndex]);
    }
}

interface AssetInfo {
    creator: string,
    owner: string,
    basePrice: bigint,
    currentPriceIndex: bigint
}
export { ContentProfile, AssetInfo }