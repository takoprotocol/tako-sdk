import * as CONSTANT from '../constant';
import { EcosystemOpenCuration } from '../ecosystem';
import { PassedBids } from '../libs';
import { env } from '../utils';
import { utils } from '../utils';
enum Apis {
    PassedBids = 'passed_bids',
    CuratorStatus = 'curator_status',
}
class LensOpenCurationV2 extends EcosystemOpenCuration {
    constructor(network: CONSTANT.Network, url: string) {
        super(network, url, env.Ecosystem.LENS_OPEN_CURATION, "profileIds", "profileId");
    }
    public get passedBids(): PassedBids {
        return new PassedBids(this.url, this.ecosystem, Apis.PassedBids);
    }
    public async verifyBid(address: string, index: number, pubId: string) {
        if (index == 0) {
            throw "invalid index";
        }
        if (pubId == "") {
            throw "invalid pubId";
        }
        const body = { address: address, index: index, pubId: pubId };
        return await this.verifyBidBasic(body);
    }
    public async curatorStatus(index: number, profileId: number) {
        const data = {};
        data["index"] = index;
        data["profileId"] = profileId;
        let params = new URLSearchParams(data).toString();
        if (params != "") {
            params = "?" + params;
        }
        const url = `${this.url}${this.ecosystem}/${Apis.CuratorStatus}${params}`;
        return await utils.get(url);
    }
}

export { LensOpenCurationV2 }