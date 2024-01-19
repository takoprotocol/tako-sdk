import { ERC721 } from '../../../pkg/libs';
import { contentProfileKeyabi } from '../assets';

class ContentProfileKey extends ERC721 {

    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId);
        this.initAbiFile(contentProfileKeyabi);
    }
    public async contentIdHash(contentId: number): Promise<string> {
        const res = await this._contractInfo.contract.contentIdHash(contentId);
        return res;
    }
    public async contentUrl(tokenId: number): Promise<string> {
        const res = await this._contractInfo.contract.contentUrl(tokenId);
        return res;
    }
    public async coreContract(): Promise<string> {
        const res = await this._contractInfo.contract.coreContract();
        return res;
    }
    public async creatorIdOf(tokenId: number): Promise<number> {
        const res = await this._contractInfo.contract.creatorIdOf(tokenId);
        return res;
    }

    //overwrite basic class
    public async totalBurned(): Promise<number> {
        return 0;
    }
    public async totalMinted(): Promise<number> {
        return 0;
    }
    public async totalSupply(): Promise<number> {
        return 0;
    }
}
export { ContentProfileKey }