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
    private async nftsByAddress(ecosystem: Ecosystem, address: string, path: string, limit?: number, offset?: number): Promise<TokenInfoList> {
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
        return this.convertNftResponse(res);
    }
    protected toHump(name: string): string {
        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    }
    protected convertObjectKeysToHump(data: Object): Object {
        const converted: Object = {};
        for (var key in data) {
            converted[this.toHump(key)] = data[key];
        }
        return converted;
    }
    private convertNftResponse(res: AxiosResponse): TokenInfoList {
        const data = PostToken.dealWithResponse(res);
        const list: TokenInfo[] = [];
        if (data.list) {
            data.list.forEach(e => {
                const converted = this.convertObjectKeysToHump(e);
                const info = converted as TokenInfo;
                info.nextBuyPrice = BigInt(converted["nextBuyPrice"]);
                list.push(info);
            });
        }
        const result: TokenInfoList = { list: list, total: data.total };
        return result;
    }
    private convertPostInfo(data: Object): PostInfo {
        const converted = this.convertObjectKeysToHump(data);
        const info = converted as PostInfo;
        info.nextBuyPrice = BigInt(converted["nextBuyPrice"]);
        info.priceFactor = BigInt(converted["priceFactor"]);
        info.basePrice = BigInt(converted["basePrice"]);
        return info;
    }
    private convertProfileInfo(data: Object): ProfileInfo {
        const converted = this.convertObjectKeysToHump(data);
        const info = converted as ProfileInfo;
        info.priceFactor = BigInt(converted["priceFactor"]);
        info.basePrice = BigInt(converted["basePrice"]);
        return info;
    }
    //apis
    public async collectionsByAddress(address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(this._ecosystem, address, Apis.CollectionsByAddress, limit, offset);
    }
    public async postsByAddress(address: string, limit?: number, offset?: number) {
        return this.nftsByAddress(this._ecosystem, address, Apis.PostsByAddress, limit, offset);
    }
    public async profileInfo(id: number): Promise<ProfileInfo> {
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.ProfileInfo}`;
        const paramData = {};
        paramData['id'] = id;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        const data = PostToken.dealWithResponse(res);
        const info = this.convertProfileInfo(data);
        return info;
    }
    public async profilesInfo(ids: number[]): Promise<ProfileInfoList> {
        const body = { ids: ids };
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.ProfilesInfo}`;
        const res = await post(url, body);
        const data = PostToken.dealWithResponse(res);
        const result: ProfileInfoList = {};
        for (var key in data) {
            const info = this.convertProfileInfo(data[key]);
            result[key] = info;
        }
        return result;
    }
    public async postInfo(postId: string): Promise<PostInfo> {
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.PostInfo}`;
        const paramData = {};
        paramData['postId'] = postId;
        url = this.generateUrlWithParam(paramData, url);
        const res = await get(url);
        const data = PostToken.dealWithResponse(res);
        const info = this.convertPostInfo(data);
        return info;
    }
    public async postsInfo(postIds: string[]): Promise<PostInfoList> {
        const body = { postIds: postIds };
        let url = `${this._url}/${API_PREFIX}/${this._ecosystem}/${Apis.PostsInfo}`;
        const res = await post(url, body);
        const data = PostToken.dealWithResponse(res);
        const result: PostInfoList = {};
        for (var key in data) {
            const info = this.convertPostInfo(data[key]);
            result[key] = info;
        }
        return result;
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
interface TokenInfo {
    contentProfileId: number,
    contentId: string,
    contentIdHash: string,
    contentUri: string,
    creator: string,
    owner: string,
    tokenUri: string,
    username: string,
    nextBuyPrice: bigint,
}
interface TokenInfoList {
    total: number,
    list: TokenInfo[],
}
interface ProfileInfo {
    ecosystem: string,
    addr: string,
    priceFactor: bigint,
    priceIndex: number,
    basePrice: bigint,
    profileId: number,
}
interface PostInfo {
    id: string,
    nextBuyPrice: bigint,
    contentProfileId: number,
    contentIdHash: string,
    patron: string,
    holder: string,
    isClaimed: boolean,
    isTraded: boolean,
    currentPriceIndex: number,
    basePrice: bigint,
    priceFactor: bigint,
}
interface PostInfoList {
    [key: string]: PostInfo;
}
interface ProfileInfoList {
    [key: string]: ProfileInfo;
}
export { PostToken, ContractInfo, TokenInfo, TokenInfoList, PostInfo, PostInfoList, ProfileInfoList }