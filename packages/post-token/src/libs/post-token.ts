import { Network, getTakoUrl, get, Ecosystem, post } from '../../../pkg/utils';
import { AxiosResponse } from 'axios';
import { ContentProfile, ContentProfileKey } from './index';
import * as ethers from 'ethers';

class PostToken {
    private _ecosystem: Ecosystem;
    protected _url: string;
    private _contentProfile: ContentProfile;
    private _contentProfileKey: ContentProfileKey;

    constructor(network: Network, contractInfo: ContractInfo, ecosystem: Ecosystem) {
        this._url = getTakoUrl(network);
        this._contentProfile = new ContentProfile(contractInfo.contentProfile, contractInfo.chainId);
        this._contentProfileKey = new ContentProfileKey(contractInfo.contentProfileKey, contractInfo.chainId);
        this._ecosystem = ecosystem;
    }
    public static dealWithResponse(res: AxiosResponse) {
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
    public get contentProfile(): ContentProfile {
        return this._contentProfile
    }
    public get contentProfileKey(): ContentProfileKey {
        return this._contentProfileKey
    }
    public get ecosystem(): string {
        return this._ecosystem
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
        return PostToken.dealWithResponse(res);
    }
    //apis
    public async collectionsByAddress(address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(this._ecosystem, address, Apis.CollectionsByAddress, limit, offset);
    }
    public async postsByAddress(address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(this._ecosystem, address, Apis.PostsByAddress, limit, offset);
    }
    public async profileInfo(id: number) {
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.ProfileInfo}`;
        const paramData = {};
        paramData['id'] = id;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        return PostToken.dealWithResponse(res);
    }
    public async profilesInfo(ids: number[]) {
        const body = { ids: ids };
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.ProfilesInfo}`;
        const res = await post(url, body);
        return PostToken.dealWithResponse(res);
    }
    public async postInfo(postId: string) {
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.PostInfo}`;
        const paramData = {};
        paramData['postId'] = postId;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        return PostToken.dealWithResponse(res);
    }
    public async postsInfo(postIds: string[]) {
        const body = { postIds: postIds };
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.PostsInfo}`;
        const res = await post(url, body);
        return PostToken.dealWithResponse(res);
    }
}
const API_PREFIX = "token/post/v1/info";
enum Apis {
    CollectionsByAddress = `collections_by_address`,
    PostsByAddress = 'posts_by_address',
    ProfileInfo = 'profile_info',
    ProfilesInfo = 'profiles_info',
    PostInfo = 'post_info',
    PostsInfo = 'posts_info',
}
interface ContractInfo {
    contentProfile: string,
    chainId: number,
    contentProfileKey: string,
    peripheral: string
}

export { PostToken, ContractInfo }