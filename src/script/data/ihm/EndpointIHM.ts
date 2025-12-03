

import { WritableSignal, signal } from "@angular/core";
import { Endpoint } from "../api/Endpoint";
import { Parameter } from "../api/Parameter";
import { Util } from "../../util/Util";

export class EndpointIHM{

    id : string;
    open : boolean;
    selectedTab : WritableSignal<string>;
    method: string;
    path: string;
    tag: string;
    status_list : number[];
    parameters : Parameter[];
    exampleBody : string | null;
    exampleBodyHtml: string | null;
    exampleResponse : string | null;
    exampleResponseHtml: string | null;


    constructor(id : string, open : boolean, endpoint : Endpoint){
        this.id = id;
        this.open = open;
        this.method = endpoint.method;
        this.path = endpoint.path;
        this.tag = endpoint.tag;
        this.status_list = endpoint.status_list;
        this.parameters = endpoint.parameters;
        this.exampleBody = null;
        this.exampleBodyHtml = null;
        this.exampleResponse = null;
        this.exampleResponseHtml = null;

        for(let example of endpoint.examples){
            if(example.name == "Body"){
                this.exampleBody = example.value;
                this.exampleBodyHtml = Util.toHtmlEscaped(example.value);
            }
            if(example.name == "Reponse"){
                this.exampleResponse = example.value;
                this.exampleResponseHtml = Util.toHtmlEscaped(example.value);
            }
        }

        if(endpoint.examples.length == 1 && endpoint.examples[0].name == "Reponse")
            this.selectedTab = signal("response");
        else
            this.selectedTab = signal("body");
    }

}