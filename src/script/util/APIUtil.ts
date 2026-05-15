import {API_Response} from "../data/util/API_Response";
import {Fetch_Options} from "../data/util/Fetch_Options";
import {Fetch_Response} from "../data/util/Fetch_Response";
import {Provider} from "../app/Provider";
import {environment} from "../../environments/environment";


export class API_Util {

    static BASE_URL : string = environment.BASE_URL;
    static DEFAULT_TIMEOUT : number = 30000;

    /** A function to send a POST call, and return the response immediatly. The keyword await is necessary to 
     * retrieve the answer. */
    static async post<T, V>(url: string, body: T): Promise<API_Response<V>> {
        let headers: Record<string, string> = {};

        if (body) 
            headers['Content-Type'] = 'application/json';

        return API_Util.request<T, V>(url, 'POST', headers, body, API_Util.DEFAULT_TIMEOUT);
    }

    /** A function to send a PUT call, and return the response immediatly. The keyword await is necessary to 
     * retrieve the answer. */
    static async put<T, V>(url: string, body: T): Promise<API_Response<V>> {
        let headers: Record<string, string> = {};

        if (body) 
            headers['Content-Type'] = 'application/json';

        return API_Util.request<T, V>(url, 'PUT', headers, body, API_Util.DEFAULT_TIMEOUT);
    }


    /** A function to send a GET call, and return the response immediatly. The keyword await is necessary to 
     * retrieve the answer.*/
    static async get<V>(url: string): Promise<API_Response<V>> {
        let headers: Record<string, string> = {};
        return API_Util.request<undefined, V>(url, 'GET', headers, undefined, API_Util.DEFAULT_TIMEOUT);
    }

   /** For a url accesible in GET without authentification, return true if the url is accessible, and false in
     * others cases. It will be necessary to use await, to retrieve the result. The timeout is in millisecond. The
     * goal of this function is to test if the APIs is down when a user connect. Because, it occurs sometimes 
     * than the website is up, but the API is down.*/
    static async testConnection(url : string, timeout : number) : Promise<boolean>{

        let response = await API_Util.request<undefined, undefined>(url, "GET", {}, undefined, timeout);
        return !response.hasFailed;
    }


    /** This function perform a request to a url, and return the response of the request. The keyword await is necessary to 
     * retrieve the answer. It is necessary to indicate a timeout in milliseconds, that is the maximum time to wait before
     * consider the call like a failure. */
    private static async request<T, V>(url: string,method: string, headers: Record<string, string>, 
    body: T, timeout : number): Promise<API_Response<V>> {
        const newUrl = API_Util.BASE_URL + url;
        let bodyParsed = body ? JSON.stringify(body) : undefined;
        let response: Fetch_Response | null = null;

        try {
            const options = new Fetch_Options(method, headers, bodyParsed, AbortSignal.timeout(timeout));
            response = await Provider.fetch(newUrl, options);

            if (response) {
                const textData: string = await response.text();
                let hasFailed: boolean = response && response.ok ? false : true;

                if (!hasFailed && textData && textData.trim() != "")
                    return new API_Response<V>(newUrl, response.status, hasFailed, textData, JSON.parse(textData));
                else
                    return new API_Response<V>(newUrl, response.status, hasFailed, textData, null);
            }
            else
                return new API_Response<V>(newUrl, undefined, true, null, null);
        } catch {
            return new API_Response<V>(newUrl, undefined, true, null, null);
        }

    }
}
