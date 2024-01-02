import { BaseContract } from '../../../pkg/libs';
import { peripheralAbi } from '../assets';
class Peripheral extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, peripheralAbi);
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
    public bindAbiData(profileId: number, addr: string, basePrice: number, priceIndex: number): string {
        return this._contractInfo.iface.encodeFunctionData("bind", [profileId, addr, basePrice, priceIndex]);
    }
    //commentWithCall(DataTypesLensHub.CommentData calldata vars, address addr)
    public commentWithCallAbiData(commentData: CommentData, addr: string): string {
        return this._contractInfo.iface.encodeFunctionData("commentWithCall", [commentData, addr]);
    }
    //createWithPub(uint256 profileId, uint256 pubId)
    public createWithPubAbiData(profileId: number, pubId: number): string {
        return this._contractInfo.iface.encodeFunctionData("createWithPub", [profileId, pubId]);
    }
    //mirrorWithCall(DataTypesLensHub.MirrorData calldata vars, address addr)
    public mirrorWithCallAbiData(mirrorData: MirrorData, addr: string): string {
        return this._contractInfo.iface.encodeFunctionData("mirrorWithCall", [mirrorData, addr]);
    }
    //postWithCall(DataTypesLensHub.PostData calldata vars, address postAddr)
    public postWithCallAbiData(postData: PostData, addr: string): string {
        return this._contractInfo.iface.encodeFunctionData("postWithCall", [postData, addr]);
    }
}
interface CommentData {
    profileId: number,
    contentURI: string,
    profileIdPointed: number,
    pubIdPointed: number,
    referenceModuleData: Buffer,
    collectModule: string,
    collectModuleInitData: Buffer,
    referenceModule: string,
    referenceModuleInitData: Buffer
}

interface MirrorData {
    profileId: number,
    profileIdPointed: number,
    pubIdPointed: number,
    referenceModuleData: Buffer,
    referenceModule: string,
    referenceModuleInitData: Buffer
}
interface PostData {
    profileId: number,
    contentURI: string,
    collectModule: string,
    collectModuleInitData: Buffer,
    referenceModule: string,
    referenceModuleInitData: Buffer
}
export { Peripheral, CommentData, MirrorData, PostData }