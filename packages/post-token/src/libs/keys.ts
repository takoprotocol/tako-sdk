import { ERC721 } from '@pkg/libs';
import { erc721abi } from '@pkg/assets';

class Key extends ERC721 {

    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId);
        this.initAbiFile(erc721abi);
    }
}
export { Key }