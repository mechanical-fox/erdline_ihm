

export class ExampleResponse{

    htmlId : string;
    name: string;
    url_consultation : string;
    url_download : string;

    public constructor(htmlId : string, name: string, url_consultation : string, url_download : string){
        this.htmlId = htmlId;
        this.name = name;
        this.url_consultation = url_consultation;
        this.url_download = url_download;
    }
    
}
