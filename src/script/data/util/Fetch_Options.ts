

export class Fetch_Options {

    method: string;
    headers: Record<string, string>;
    body: string | undefined;
    signal : AbortSignal | undefined;

    constructor(method: string, headers: Record<string, string>, body: string | undefined, signal : AbortSignal | undefined) {
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.signal = signal;
    }
    
}

