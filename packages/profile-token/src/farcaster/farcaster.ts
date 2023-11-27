import * as ethers from 'ethers';
import { ERC721 } from '../libs';

class FarcasterKey extends ERC721 {

    constructor() {
        super("0x5FbDB2315678afecb367f032d93F642f64180aa3");
        this.initAbiFile("farcaster-key.abi");
    }
}
export { FarcasterKey }