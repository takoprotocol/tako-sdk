import { BaseContract } from '../../../pkg/libs';
import { contentProfileAbi } from '../assets';
class ContentProfile extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, contentProfileAbi);
    }
    //todo
    public async contentIdHashList(contentIdHash: string): Promise<number> {
        const res = await this._contractInfo.contract.contentIdHashList(contentIdHash);
        return res;
    }
    public async contentProfileKey(): Promise<string> {
        const res = await this._contractInfo.contract.contentProfileKey();
        return res;
    }
    //
    public buyAbiData(contentProfileId: number): string {
        return this._contractInfo.iface.encodeFunctionData("Buy", [contentProfileId]);
    }
    public claimAbiData(): string {
        return this._contractInfo.iface.encodeFunctionData("claim");
    }
    public createAbiData(creator: string, owner: string, basePrice: number,
        startPriceIndex: number, contentUrl: string, contentIdHash: string): string {
        return this._contractInfo.iface.encodeFunctionData("create",
            [creator, owner, basePrice, startPriceIndex, contentUrl, contentIdHash]);
    }
    public mintAbiData(contentProfileId: number, desitination: string): string {
        return this._contractInfo.iface.encodeFunctionData("Mint",
            [contentProfileId, desitination]);
    }
}
export { ContentProfile }