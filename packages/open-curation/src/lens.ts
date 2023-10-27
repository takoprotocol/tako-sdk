import { Network } from './constant';
import { TakoV2, AllBids } from 'tako-js';
import { env, utils } from './utils';
import { LensV2 } from './libs';


class LensOpenCuration {
    private _network: Network;
    private _url: string;
    private _tako: TakoV2;
    private _lensV2: LensV2;
    private _urlPrefix = "lens/open_curation";
    constructor(network: Network) {
        this._network = network;
        this._url = env.getTakoV2Url(network);
        this._tako = new TakoV2(network);
        this._lensV2 = new LensV2(network);
    }
    public get allBids(): AllBids {
        return this._tako.lensOpenCuration.allBids;
    }
    public async uploadToBundlr(metaData: any): Promise<string> {
        const url = `${this._url}${this._urlPrefix}/upload_bundlr`;
        const res = await utils.post(url, metaData);
        return res;
    }
    public get lensV2(): LensV2 {
        return this._lensV2;
    }
    public async register(index: number, pubId: string) {
        return await this._tako.lensOpenCuration.register(index, pubId);
    }

}

export { LensOpenCuration }