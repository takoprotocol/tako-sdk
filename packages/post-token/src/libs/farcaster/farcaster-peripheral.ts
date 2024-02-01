import { BaseContract } from '../../../../pkg/libs';
import { farcasterPeripheralAbi } from '../../assets';
class FarcasterPeripheral extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, farcasterPeripheralAbi);
    }
    public async contentAssetCore(): Promise<string> {
        const res = await this._contractInfo.contract.contentAssetCore();
        return res;
    }
    public async getNonce(account: string): Promise<number> {
        const res = await this._contractInfo.contract.getNonce(account);
        return res;
    }
    public async isRelayer(addr: string): Promise<boolean> {
        const res = await this._contractInfo.contract.isRelayer(addr);
        return res;
    }
    public async farcasterIdRegistry(): Promise<string> {
        const res = await this._contractInfo.contract.farcasterIdRegistry();
        return res;
    }

    //abi
    //bind(uint256 profileId, address addr, uint256 basePrice, uint256 priceIndex)
    public bindAbiData(profileId: number, addr: string, basePrice: bigint, priceFactor: bigint, priceIndex: number): string {
        return this._contractInfo.iface.encodeFunctionData("bind", [profileId, addr, basePrice, priceFactor, priceIndex]);
    }
    //createWithSig(DataTypes.CreateWithSig calldata vars, address relayer)
    public createWithSigAbiData(vars: CreateWithSig, relayer: string): string {
        return this._contractInfo.iface.encodeFunctionData("createWithSig", [vars, relayer]);
    }
}
interface CreateWithSig {
    sig: EIP712Signature,
    profileId: number,
    contentId: string,
    contentUrl: string
}

interface EIP712Signature {
    v: number,
    r: Buffer,
    s: Buffer,
    deadline: number
}

export { FarcasterPeripheral, EIP712Signature, CreateWithSig }