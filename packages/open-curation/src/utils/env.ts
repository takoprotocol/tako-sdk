import { Network } from "../constant";
enum Ecosystem {
    LENS = 'lens',
    FARCASTER = 'farcaster',
    LENS_OPEN_CURATION = "lens/open_curation"
}

function getTakoV2Url(network: Network): string {
    switch (network) {
        case Network.TESTNET:
            return "https://testapi.takoyaki.so/v2/";
        case Network.MAINNET:
            return "https://api.takoyaki.so/v2/";
        case Network.LOCALHOST:
            return "http://localhost:8000/v2/";
        default:
            return "https://api.takoyaki.so/v2/";
    }
}
export { Ecosystem, getTakoV2Url }