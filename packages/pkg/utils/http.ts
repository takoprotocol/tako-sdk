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
    return res;
}
async function get(url: string) {
    return await axios.get(url);
}
export { post, get, postWithToken }