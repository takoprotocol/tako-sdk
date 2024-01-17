import { Network, getTakoUrl, get, Ecosystem, post } from '../../../pkg/utils';
import { AxiosResponse } from 'axios';
import { LensPeripheral, FarcasterPeripheral, ContentProfile, ContentProfileKey } from './index';
import * as ethers from 'ethers';
class PostToken {
    private _url: string;
    private _lensPeripheral: LensPeripheral;
    private _farcasterPeripheral: FarcasterPeripheral;
    private _contentProfile: ContentProfile;
    private _contentProfileKey: ContentProfileKey;

    constructor(network: Network, contractInfo: ContractInfo) {
        this._url = getTakoUrl(network);
        this._lensPeripheral = new LensPeripheral(contractInfo.lensPeripheral, contractInfo.chainId);
        this._farcasterPeripheral = new FarcasterPeripheral(contractInfo.farcasterPeripheral, contractInfo.chainId);
        this._contentProfile = new ContentProfile(contractInfo.contentProfile, contractInfo.chainId);
        this._contentProfileKey = new ContentProfileKey(contractInfo.contentProfileKey, contractInfo.chainId);
    }
    public get lensPeripheral(): LensPeripheral {
        return this._lensPeripheral
    }
    public get farcasterPeripheral(): FarcasterPeripheral {
        return this._farcasterPeripheral
    }
    public get contentProfile(): ContentProfile {
        return this._contentProfile
    }
    public get contentProfileKey(): ContentProfileKey {
        return this._contentProfileKey
    }
    private generateUrlWithParam(data: {}, url: string): string {
        let params = new URLSearchParams(data).toString();
        if (params != "") {
            params = "?" + params;
        }
        url = `${url}${params}`;
        return url;
    }
    private async nftsByAddress(ecosystem: Ecosystem, address: string, path: string, limit?: number, offset?: number) {
        if (!ethers.isAddress(address)) {
            throw "invalid address";
        }
        let url = `${this._url}/${API_PREFIX}/${ecosystem}/${path}`;
        const paramData = {};
        if (limit != undefined) {
            paramData["limit"] = limit;
        }
        if (offset != undefined) {
            paramData['offset'] = offset;
        }
        paramData['addr'] = address;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        return dealWithResponse(res);
    }
    //apis
    public async collectionsByAddress(ecosystem: Ecosystem, address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(ecosystem, address, Apis.CollectionsByAddress, limit, offset);
    }
    public async postsByAddress(ecosystem: Ecosystem, address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(ecosystem, address, Apis.PostsByAddress, limit, offset);
    }
    public async profileInfo(ecosystem: Ecosystem, id: number) {
        let url = `${this._url}/${API_PREFIX}/${ecosystem}/${Apis.ProfileInfo}`;
        const paramData = {};
        paramData['id'] = id;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        return dealWithResponse(res);
    }
    public async postInfo(ecosystem: Ecosystem, postId: string) {
        let url = `${this._url}/${API_PREFIX}/${ecosystem}/${Apis.PostInfo}`;
        const paramData = {};
        paramData['postId'] = postId;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        return dealWithResponse(res);
    }
    public async postsInfo(ecosystem: Ecosystem, postIds: string[]) {
        const body = { postIds: postIds };
        let url = `${this._url}/${API_PREFIX}/${ecosystem}/${Apis.PostsInfo}`;
        const res = await post(url, body);
        return dealWithResponse(res);
    }
}
const API_PREFIX = "token/post/v1/info";
enum Apis {
    CollectionsByAddress = `collections_by_address`,
    PostsByAddress = 'posts_by_address',
    ProfileInfo = 'profile_info',
    PostInfo = 'post_info',
    PostsInfo = 'posts_info',
}
interface ContractInfo {
    contentProfile: string,
    chainId: number,
    lensPeripheral: string,
    contentProfileKey: string,
    farcasterPeripheral: string
}
function dealWithResponse(res: AxiosResponse) {
    const data = res.data;
    if (data.msg) {
        if (data.msg.toUpperCase() == "OK") {
            return data.data;
        } else {
            throw data.msg;
        }
    } else {
        throw "invalid request";
    }
}
async function NewPostToken(network: Network): Promise<PostToken> {
    const url = getTakoUrl(network);
    const res = await get(`${url}/token/post/v1/contract`);
    const contractInfoRes = dealWithResponse(res);
    const contractInfo: ContractInfo = {
        contentProfile: contractInfoRes.addr,
        contentProfileKey: contractInfoRes.content_profile_key,
        lensPeripheral: contractInfoRes.lens_peripheral,
        chainId: contractInfoRes.chain_Id,
        farcasterPeripheral: contractInfoRes.farcaster_peripheral
    }
    return new PostToken(network, contractInfo);
}
export { PostToken, NewPostToken }