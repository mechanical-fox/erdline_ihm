import { Endpoint } from "./Endpoint";

export class ServerInfo{

    name : string;
    version: string;
    urlServer: string;
    endpoints : Endpoint[];

    public constructor(name: string, version : string, urlServer : string, endpoints: Endpoint[]){
        this.name = name;
        this.version = version;
        this.urlServer = urlServer;
        this.endpoints = endpoints;
    }

}