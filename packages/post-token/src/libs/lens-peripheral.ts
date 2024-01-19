import { BaseContract } from '../../../pkg/libs';
import { lensPeripheralAbi } from '../assets';
class LensPeripheral extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, lensPeripheralAbi);
    }
    public async contentAssetCore(): Promise<string> {
        const res = await this._contractInfo.contract.contentAssetCore();
        return res;
    }
    public async getNonce(account: string): Promise<number> {
        const res = await this._contractInfo.contract.getNonce(account);
        return res;
    }
    public async lensHub(): Promise<string> {
        const res = await this._contractInfo.contract.lensHub();
        return res;
    }


    //abi
    //bind(uint256 profileId, address addr, uint256 basePrice, uint256 priceIndex)
    public bindAbiData(profileId: number, addr: string, basePrice: bigint, priceFactor: bigint, priceIndex: number): string {
        return this._contractInfo.iface.encodeFunctionData("bind", [profileId, addr, basePrice, priceFactor, priceIndex]);
    }
    //createWithPub(uint256 profileId, uint256 pubId)
    public createWithPubAbiData(profileId: number, pubId: number): string {
        return this._contractInfo.iface.encodeFunctionData("createWithPub", [profileId, pubId]);
    }
}

export { LensPeripheral }