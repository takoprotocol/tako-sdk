import axios, { AxiosResponse } from 'axios';

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
    return dealWithResponse(res);
    //return await httpRequest(url, {});
}
function dealWithResponse(res: AxiosResponse) {
    const data = res.data;
    if (data.data) {
        return data.data;
    } else if (data.error_msg) {
        throw data.error_msg;
    }
}

export { post, get, postWithToken }