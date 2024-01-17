import { Network } from "./constants";
function getTakoUrl(network: Network): string {
    switch (network) {
        case Network.TESTNET:
            return "https://testapi.tako.so";
        case Network.MAINNET:
            return "https://api.tako.so";
        case Network.LOCALHOST:
            return "http://localhost:8000";
        default:
            return "https://testapi.tako.so";
    }
}
export { getTakoUrl }