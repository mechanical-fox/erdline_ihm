


export class API_Response<T> {

    url: string;
    status: number | undefined;
    hasFailed: boolean;
    textData: string | null;
    responseHeaders : Headers | undefined;
    data: T | null;


    constructor(url: string, status: number | undefined, hasFailed: boolean, textData: string | null, 
    responseHeaders : Headers | undefined, data: T | null) {
        this.url = url;
        this.status = status;
        this.hasFailed = hasFailed;
        this.textData = textData;
        this.responseHeaders = responseHeaders;
        this.data = data;
    }
    
}
