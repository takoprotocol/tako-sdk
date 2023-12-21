import { EcosystemBasic } from './ecosystem';
import * as CONSTANT from '../constant';
import { utils } from '../utils';
import { GetBids } from '../libs';

class EcosystemP2p extends EcosystemBasic {
    constructor(network: CONSTANT.Network, url: string, ecosystem: string, idsKeyName: string, idKeyName: string) {
        super(network, url, ecosystem, idsKeyName, idKeyName);
    }
    public async bidsReceivedStats(ids: number[], includeIgnore: boolean) {
        if (ids.length != 0) {
            const url = `${this.url}${this.ecosystem}/${Apis.BidsReceivedStats}`;
            const reqBody = { includeIgnore: includeIgnore };
            reqBody[this._idsKeyName] = ids;
            return await utils.post(url, reqBody);
        }
        return {}
    }
    public async bidsConfirmingReceived(ids: number[]) {
        if (ids.length != 0) {
            const url = `${this.url}${this.ecosystem}/${Apis.BidsConfirmingReceived}`;
            const reqBody = {};
            reqBody[this._idsKeyName] = ids;
            return await utils.post(url, reqBody);
        }
        return {}
    }
    public get bidsIgnored(): BidsIgnored {
        return new BidsIgnored(this.url, this.ecosystem, this._idsKeyName);
    }
    public get bidsReceived(): BidsReceived {
        return new BidsReceived(this.url, this.ecosystem, this._idsKeyName);
    }
    protected async ignoreBidP2p(reqBody: object) {
        const token = this.getToken();//check token
        if (token.isExpired()) {
            throw "token expired, please get a token first";
        }
        const url = `${this.url}${this.ecosystem}/${Apis.IgnoreBid}`;
        return await utils.postWithToken(url, this.getToken().authorizationStr, reqBody);
    }
}
class BidsIgnored extends GetBids {
    constructor(url: string, ecosystem: string, idsKeyName: string) {
        super(url, ecosystem, idsKeyName, Apis.BidsIgnored);
    }
}
class BidsReceived extends GetBids {
    private _includeIgnore: boolean = false;
    private _state: string = "";

    constructor(url: string, ecosystem: string, idsKeyName: string) {
        super(url, ecosystem, idsKeyName, Apis.BidsReceived);
    }
    protected requestBody(): object {
        return {
            includeIgnore: this._includeIgnore,
            state: this._state
        };
    }

    public state(state: string) {
        this._state = state;
        return this;
    }
    public includeIgnore(includeIgnore: boolean) {
        this._includeIgnore = includeIgnore;
        return this;
    }
}

enum Apis {
    BidsReceivedStats = 'get_bids_received/stats',
    BidsConfirmingReceived = 'get_bids_confirming_received',
    BidsIgnored = 'get_bids_ignored',
    BidsReceived = 'get_bids_received',
    IgnoreBid = 'ignore_bid',
}
export { EcosystemP2p, BidsIgnored, BidsReceived }
