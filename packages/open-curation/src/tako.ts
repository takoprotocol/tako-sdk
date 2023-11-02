import { json } from 'stream/consumers';
import { Network } from './constant';
import { LensOpenCuration } from './lens';
import { TakoV2, LensOpenCurationV2 } from 'tako-js';

class TakoOpenCuration {
    private _network: Network;
    //private _url: string;
    private _lensOpenCuration: LensOpenCuration;

    constructor(network: Network) {
        this._network = network;
        const tako = new TakoV2(network);
        this._lensOpenCuration = new LensOpenCuration(network, tako);
    }
    public get lensOpenCuration(): LensOpenCuration {
        return this._lensOpenCuration;
    }
}
export { TakoOpenCuration }