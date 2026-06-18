
import {Fetch_Response} from '../../../script/data/util/Fetch_Response';

export default class Fetch_Response_Impl implements Fetch_Response {

    status: number;
    ok: boolean;
    data: string;
    headers : Headers | undefined;

    constructor(status: number, data: string, headers : Record<string, string>) {
        this.status = status;

        if (this.status && this.status >= 0 && this.status <= 400) 
            this.ok = true;
        else 
            this.ok = false;

        this.data = data;
        this.headers = new Headers();

        for(let key of Object.keys(headers))
            this.headers.append(key, headers[key]);
    }

    async text(): Promise<string> {
        return this.data;
    }
}
