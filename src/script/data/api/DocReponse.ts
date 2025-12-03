


export default class DocReponse{

    url_consultation : string;
    url_download : string;
    expireIn : number;

    public constructor(url_consultation : string, url_download : string, expireIn : number){
        this.url_consultation = url_consultation;
        this.url_download = url_download;
        this.expireIn = expireIn;
    }
}