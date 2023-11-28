import * as ethers from 'ethers';
import { ERC721 } from '../libs';
import { farcasterKeyabi } from '../assets';

class FarcasterKey extends ERC721 {

    constructor() {
        super("0x5FbDB2315678afecb367f032d93F642f64180aa3", 31337);
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