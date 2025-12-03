

import { EndpointIHM } from "../ihm/EndpointIHM";
import { Example } from "./Example";
import { Parameter } from "./Parameter";


export class Endpoint{

    method: string;
    path: string;
    tag: string;
    status_list : number[];
    parameters : Parameter[];
    examples : Example[];


    constructor(method: string, path : string, tag : string, status_list : number[], parameters : Parameter[], 
    exampleBody : string | null, exampleResponse : string | null){
        this.method = method;
        this.path = path;
        this.tag = tag;
        this.status_list = status_list;
        this.parameters = parameters;
        this.examples = [];

        if(exampleBody != null && exampleBody.trim() != ""){
            let example1 : Example = new Example("Body",exampleBody);
            this.examples.push(example1);
        }

        if(exampleResponse != null && exampleResponse.trim() != ""){
            let example2 : Example = new Example("Reponse",exampleResponse);
            this.examples.push(example2);
        }
    }

    static fromIhm(endpoint : EndpointIHM) : Endpoint{
        let method = endpoint.method;
        let path = endpoint.path;
        let tag = endpoint.tag;
        let status_list = endpoint.status_list;
        let parameters = endpoint.parameters;
        let exampleBody = endpoint.exampleBody;
        let exampleResponse = endpoint.exampleResponse;

        let result : Endpoint = new Endpoint(method, path, tag, status_list, parameters, exampleBody, exampleResponse);
        return result
    }

}