import * as ethers from 'ethers';
import { ERC721 } from '../libs';
import { farcasterKeyabi } from '../assets';

class FarcasterKey extends ERC721 {

    constructor(contractAddress?: string, chainId?: number) {
        if (contractAddress && chainId) {
            super(contractAddress, chainId);
        } else {
            super("0x106484C61F2893C134E8E801C468E5A448ed150f", 10);
        }
        this.initAbiFile(farcasterKeyabi);
    }

    public async creatorIdOf(tokenId: number): Promise<number> {
        const res = await this._contractInfo.contract.creatorIdOf(tokenId);
        return res;
    }
    public async creatorIdsOf(tokenIds: number[]): Promise<number[]> {
        const res = await this._contractInfo.contract.creatorIdsOf(tokenIds);
        return res;
    }
    public async creatorIdsOfOwner(owner: string): Promise<number[]> {
        const res = await this._contractInfo.contract.creatorIdsOfOwner(owner);
        return res;
    }



}
export { FarcasterKey }