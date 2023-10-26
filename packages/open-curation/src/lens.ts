import { Network } from './constant';
import { TakoV2, AllBids } from 'tako-js';

class LensOpenCuration {
    private _network: Network;
    private _tako: TakoV2;
    constructor(network: Network) {
        this._network = network;
        this._tako = new TakoV2(network);
    }
    public get allBids(): AllBids {
        return this._tako.lensOpenCuration.allBids;
    }
}
export { LensOpenCuration }