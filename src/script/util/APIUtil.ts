import API_Response from "../data/util/API_Response";
import Fetch_Options from "../data/util/Fetch_Options";
import Fetch_Response from "../data/util/Fetch_Response";
import {environment} from "../../environments/environment";


export default class API_Util {

    static BASE_URL : string = environment.BASE_URL;

    /** A function able to send a POST call, and return the response immediatly. So a little different
     * of the observable of the class HttpClient. A little easier to manage when a error happen.*/
    static async post<T, V>(url: string, body: T): Promise<API_Response<V>> {
        let headers: Record<string, string> = {};

        if (body) 
            headers['Content-Type'] = 'application/json';

        return API_Util.request<T, V>(url, 'POST', headers, body);
    }

    /** A function able to send a GET call, and return the response immediatly. So a little different
     * of the observable of the class HttpClient. A little easier to manage when a error happen.*/
    static async get<V>(url: string): Promise<API_Response<V>> {
        return API_Util.request<undefined, V>(url, 'GET', {}, undefined);
    }

    /** This function perform a  request to a url, and return the response of the request.
     * In the case of a error, the message stored in the API_Response is volontary fuzzy, because the message will be
     * displayed on screen. And it's better to not display to the customer a error too much precise, because else
     * it's a security risk. */
    private static async request<T, V>(url: string,method: string, headers: Record<string, string>, 
    body: T): Promise<API_Response<V>> {
        const newUrl = API_Util.BASE_URL + url;
        let bodyParsed: string | undefined;

        if (body) 
            bodyParsed = JSON.stringify(body);

        const options: Fetch_Options = new Fetch_Options(method, headers, bodyParsed);
        let response: Fetch_Response | null = null;

        // this try/catch is designed to intercept the ERR_CONNECT error when the server is down
        try {
            response = await fetch(newUrl, options);
        } catch {
            return new API_Response<V>(newUrl, undefined, true, 'Serveur éteint ou non disponible', null, null);
        }

        if (response) {
            const textData: string = await response.text();
            const status: number | undefined = response.status;
            let hasFailed: boolean = response && response.ok ? false : true;
            let errorMessage: string | null = null;
            let data: V | null = null;

            if (!hasFailed && textData) {
                try {
                    data = JSON.parse(textData);
                } catch {
                    data = textData as V;
                }
            } else if (hasFailed && status) {
                errorMessage = `Reception d'un code ${status}`;
            } else if (hasFailed && !status) {
                errorMessage = `Serveur éteint ou non disponible`;
            }

            return new API_Response<V>(newUrl, status, hasFailed, errorMessage, textData, data);
        }

        return new API_Response<V>(newUrl, undefined, true, 'Serveur éteint ou non disponible', null, null);
    }
}
