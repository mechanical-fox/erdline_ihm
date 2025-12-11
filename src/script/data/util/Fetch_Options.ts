

export default class Fetch_Options {

    method: string;
    headers: Record<string, string>;
    body: string | undefined;

    constructor(method: string, headers: Record<string, string>, body: string | undefined) {
        this.method = method;
        this.headers = headers;
        this.body = body;
    }
    
}

