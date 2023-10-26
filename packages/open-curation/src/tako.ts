import { Network } from './constant';
import { LensOpenCuration } from './lens';

class TakoOpenCuration {
    private _network: Network;
    //private _url: string;

    private _lensOpenCuration: LensOpenCuration;

    constructor(network: Network) {
        this._network = network;
        this._lensOpenCuration = new LensOpenCuration(network);
    }
    public get lensOpenCuration(): LensOpenCuration {
        return this._lensOpenCuration;
    }
}
export { TakoOpenCuration }