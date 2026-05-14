


export class API_Response<T> {

    url: string;
    status: number | undefined;
    hasFailed: boolean;
    textData: string | null;
    data: T | null;


    constructor(url: string, status: number | undefined, hasFailed: boolean, textData: string | null, data: T | null) {
        this.url = url;
        this.status = status;
        this.hasFailed = hasFailed;
        this.textData = textData;
        this.data = data;
    }
    
}
