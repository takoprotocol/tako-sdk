import { Network } from "../constant";
enum Ecosystem {
    LENS = 'lens',
    FARCASTER = 'farcaster',
    LENS_OPEN_CURATION = "lens/open_curation",
    LENS_OPEN_CURATION_V2 = "lens_v2/open_curation",
    LENSV2 = 'lens_v2',
}

function getTakoV2Url(network: Network): string {
    switch (network) {
        case Network.TESTNET:
            return "https://testapi.tako.so/v2/";
        case Network.MAINNET:
            return "https://api.tako.so/v2/";
        case Network.LOCALHOST:
            return "http://localhost:8000/v2/";
        default:
            return "https://testapi.tako.so/v2/";
    }
}
export { Ecosystem, getTakoV2Url }