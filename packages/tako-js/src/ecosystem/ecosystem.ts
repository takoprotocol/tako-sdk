import * as CONSTANT from '../constant';
import { utils } from '../utils';
import { GetBids, Token } from '../libs';
import * as ethers from 'ethers';

class EcosystemBasic {
    private _network: CONSTANT.Network;
    private _url: string;
    private _ecosystem: string;
    protected _idsKeyName: string = '';
    protected _idKeyName: string = '';
    private static _token: Token;
    public static setToken(token: Token) {
        this._token = token;
    }
    public getToken(): Token {
        return EcosystemBasic._token;
    }
    constructor(network: CONSTANT.Network, url: string, ecosystem: string, idsKeyName: string, idKeyName: string) {
        this._network = network;
        this._url = url;
        this._ecosystem = ecosystem;
        this._idsKeyName = idsKeyName;
        this._idKeyName = idKeyName;
    }
    private async fetchByIds(ids: number[], key: string, path: string) {
        const _ids = ([] as number[]).concat(ids);
        if (_ids.length != 0) {
            const url = `${this._url}${this._ecosystem}/${path}`;
            const reqBody = {};
            reqBody[key] = _ids;
            return await utils.post(url, reqBody);
        }
        return {}
    }

    //protected
    protected get url(): string {
        return this._url;
    }
    protected get ecosystem(): string {
        return this._ecosystem;
    }

    //public
    public get network(): string {
        return this._network;
    }
    public async indexPairs(ids: number[]) {
        return await this.fetchByIds(ids, this._idsKeyName, Apis.IndexPairs);
    }
    public async curatorLastBidPrice(ids: number[]) {
        const res = await this.fetchByIds(ids, this._idsKeyName, Apis.CuratorLastBidPrice);
        return res.data;
    }
    public async recentCurators() {
        const url = `${this._url}${this._ecosystem}/${Apis.RecentCurators}`;
        return await utils.get(url);
    }
    public async curatorAccepted(id: number | undefined, cursor: number | undefined) {
        const data = {};
        if (id != undefined) {
            data[this._idKeyName] = id;
        }
        if (cursor != undefined) {
            data['cursor'] = cursor;
        }

        let params = new URLSearchParams(data).toString();
        if (params != "") {
            params = "?" + params;
        }
        const url = `${this._url}${this._ecosystem}/${Apis.CuratorAccepted}${params}`;
        return await utils.get(url);
    }
    public get bidsCreatedStats(): BidsCreatedStats {
        return new BidsCreatedStats(this._url, this._ecosystem, this._idsKeyName);
    }
    public get bidsCreated(): BidsCreated {
        return new BidsCreated(this._url, this._ecosystem, this._idsKeyName);
    }
    public printToken() {
        //console.log(`${this._ecosystem}:${JSON.stringify(this._token)}`);
        console.log(`${this._ecosystem}:${JSON.stringify(this.getToken())}`);
    }
    protected async verifyBidBasic(reqBody: object) {
        if (!ethers.isAddress(reqBody["address"])) {
            throw "invalid address";
        }
        const url = `${this.url}${this.ecosystem}/${Apis.VerifyBid}`;
        return await utils.post(url, reqBody);
    }
}
class BidsCreated extends GetBids {
    private _addresses: string[] = [];
    private _state: string = "";

    constructor(url: string, ecosystem: string, idsKeyName: string) {
        super(url, ecosystem, idsKeyName, Apis.BidsCreated);
    }
    protected requestBody(): object {
        return {
            addresses: this._addresses,
            state: this._state
        };
    }
    public addresses(addresses: string[]) {
        this._addresses = ([] as string[]).concat(addresses);
        this._ids = [];
        return this;
    }
    public state(state: string) {
        this._state = state;
        return this;
    }
}
class BidsCreatedStats extends GetBids {
    private _addresses: string[] = [];
    constructor(url: string, ecosystem: string, idsKeyName: string) {
        super(url, ecosystem, idsKeyName, Apis.BidsCreatedStats);
    }
    protected requestBody(): object {
        return {
            addresses: this._addresses,
        };
    }
    public addresses(addresses: string[]) {
        this._addresses = ([] as string[]).concat(addresses);
        this._ids = [];
        return this;
    }
}

enum Apis {
    IndexPairs = 'id_index/pairs',
    RecentCurators = 'recent/curators',
    CuratorLastBidPrice = 'curator/last_bid_price',
    CuratorAccepted = 'curator/accepted',
    BidsCreatedStats = 'get_bids_created/stats',
    BidsCreated = 'get_bids_created',
    VerifyBid = 'verify_bid',
}
export { EcosystemBasic, BidsCreated, BidsCreatedStats }