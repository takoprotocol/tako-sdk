import { Network, getTakoUrl, get, Ecosystem, post } from '../../../../pkg/utils';
import { AxiosResponse } from 'axios';
import { FarcasterPeripheral, ContentProfile, ContentProfileKey, PostToken, ContractInfo } from '../index';
import * as ethers from 'ethers';

class FarcasterPostToken extends PostToken {
    private _farcasterPeripheral: FarcasterPeripheral;
    constructor(network: Network, contractInfo: ContractInfo) {
        super(network, contractInfo, Ecosystem.FARCASTER);
        this._url = getTakoUrl(network);
        this._farcasterPeripheral = new FarcasterPeripheral(contractInfo.peripheral, contractInfo.chainId);
    }
    public get peripheral(): FarcasterPeripheral {
        return this._farcasterPeripheral
    }
    public async verifyFarcasterFid(fid: number, castId: string): Promise<FarcasterSignature> {
        const body = { fid: fid, castId: castId };
        let url = `${this._url}/token/post/v1/${Apis.VerifyFarcaster}`;
        const res = await post(url, body);
        const data = PostToken.dealWithResponse(res);
        const converted = this.convertObjectKeysToHump(data);
        const sig = converted as FarcasterSignature;
        return sig;
    }
}
interface Signature {
    r: string,
    s: string,
    v: number,
    deadline: number,
}
interface FarcasterSignature {
    chainId: number,
    contract: string,
    nonce: number,
    relayer: string,
    signature: Signature,
}
enum Apis {
    VerifyFarcaster = 'peripheral/farcaster/verify_fid',
}
async function NewFarcasterPostToken(network: Network): Promise<FarcasterPostToken> {
    const url = getTakoUrl(network);
    const res = await get(`${url}/token/post/v1/${Ecosystem.FARCASTER}/contract`);
    const contractInfoRes = PostToken.dealWithResponse(res);
    const contractInfo: ContractInfo = {
        contentProfile: contractInfoRes.addr,
        contentProfileKey: contractInfoRes.content_profile_key,
        peripheral: contractInfoRes.peripheral,
        chainId: contractInfoRes.chain_Id,
    }
    return new FarcasterPostToken(network, contractInfo);
}
export { FarcasterPostToken, NewFarcasterPostToken, FarcasterSignature, Signature }