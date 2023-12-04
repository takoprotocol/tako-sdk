import axios, { AxiosResponse } from 'axios';
import { getTakoV2Url, TakoHubInfo } from './env';
import { Network } from '../constant';

async function post(url: string, reqBody: object) {
    return await postRequest(url, "", reqBody);
}
async function postWithToken(url: string, token: string, reqBody: object) {
    return await postRequest(url, token, reqBody);
}
async function postRequest(url: string, token: string, reqBody: object) {
    const res = await axios({
        method: 'post',
        url: url,
        data: reqBody,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    return dealWithResponse(res);
}
async function get(url: string) {
    const res = await axios.get(url);
    //console.log(res.status);
    return dealWithResponse(res);
    //return await httpRequest(url, {});
}
async function getTakoKeyContract(network: Network): Promise<TakoHubInfo> {
    const url = `${getTakoV2Url(network)}takohub_info`;
    const res = await get(url);
    const takoKeysInfo: TakoHubInfo = res.tako_keys;

    return takoKeysInfo;
}
function dealWithResponse(res: AxiosResponse) {
    const data = res.data;
    if (data.data) {
        return data.data;
    } else if (data.error_msg) {
        throw data.error_msg;
    }
}

export { post, get, postWithToken, getTakoKeyContract }