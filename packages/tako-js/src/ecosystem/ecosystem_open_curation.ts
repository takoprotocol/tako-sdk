import { EcosystemBasic } from './ecosystem';
import { utils } from '../utils';
import { GetBids, SortType } from '../libs';
import { Sort, OpenCurationAllBidsStatus } from '../constant';

enum Apis {
    Register = 'register',
    AllBids = 'all_bids',
}
class EcosystemOpenCuration extends EcosystemBasic {
    public async register(index: number, pubId: string) {
        const url = `${this.url}${this.ecosystem}/${Apis.Register}`;
        const reqBody = { index: index, pubId: pubId };
        return await utils.post(url, reqBody);
    }
    public get allBids(): AllBids {
        return new AllBids(this.url, this.ecosystem, this._idsKeyName, Apis.AllBids);
    }
}
class AllBids {
    protected _url: string;
    protected _ecosystem: string;
    protected _idsKeyName: string;
    protected _path: string;

    protected _limit: number = 10;
    protected _offset: number = 0;
    protected _ids: number[] = [];
    protected _sortType: string = SortType.DESC;
    protected _sort: string = Sort.BidAmount;
    protected _status: string = OpenCurationAllBidsStatus.All;
    constructor(url: string, ecosystem: string, idsKeyName: string, path: string) {
        this._url = url;
        this._ecosystem = ecosystem;
        this._idsKeyName = idsKeyName;
        this._path = path;
    }
    protected requestBody(): object {
        return {};
    }
    public limit(limit: number) {
        this._limit = limit;
        return this;
    }
    public offset(offset: number) {
        this._offset = offset;
        return this;
    }
    public get DESC() {
        this._sortType = SortType.DESC;
        return this;
    }
    public get ASC() {
        this._sortType = SortType.ASC;
        return this;
    }
    public ids(ids: number[]) {
        this._ids = ([] as number[]).concat(ids);
        return this;
    }
    public sort(sort: string) {
        this._sort = sort;
        return this;
    }
    public status(status: OpenCurationAllBidsStatus) {
        this._status = status;
        return this;
    }
    public async get() {
        const url = `${this._url}${this._ecosystem}/${this._path}`;
        const reqBody = this.requestBody();
        reqBody["status"] = this._status;
        reqBody["limit"] = this._limit;
        reqBody["offset"] = this._offset;
        reqBody["sort"] = this._sort;
        reqBody["sortType"] = this._sortType;
        reqBody[this._idsKeyName] = this._ids;
        return await utils.post(url, reqBody);
    }
}
export { EcosystemOpenCuration, AllBids }