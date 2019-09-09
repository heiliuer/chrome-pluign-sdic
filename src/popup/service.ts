import axios from 'axios'
import {ApiSearchResult} from "../custom";
import {getValidSearchKey} from "../util";

export interface CookieData {
    userAgent: string;
    cookie: string;
    cookieJar: any;
    isMobile: boolean
}

export interface CookieItem {
    createAt: number,
    data: CookieData
}

export async function searchKey(key: string) {
    const response = await axios.get("http://fanyi.youdao.com/openapi.do?keyfrom=mypydict&doctype=json&version=1.2&key=27855339&type=data", {
        params: {
            q: getValidSearchKey(key)
        }
    });
    return response.data as ApiSearchResult.RootObject
}
