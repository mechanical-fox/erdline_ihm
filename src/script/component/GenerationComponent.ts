import { Component, signal, WritableSignal} from '@angular/core';
import { MessageUtil } from '../util/MessageUtil';
import { Endpoint } from '../data/api/Endpoint';
import { MethodOption } from '../data/ihm/MethodOption';
import { EMethod } from '../data/ihm/EMethod';
import { EnpointCreationComponent} from './EndpointCreationComponent';
import { Util } from '../util/Util';
import { EndpointIHM } from '../data/ihm/EndpointIHM';
import { ServerInfo } from '../data/api/ServerInfo';
import API_Util from '../util/APIUtil';
import DocReponse from '../data/api/DocReponse';
import API_Response from '../data/util/API_Response';
import { example } from '../data/example/example';


@Component({
    selector: 'erd-generation',
    imports :  [EnpointCreationComponent],
    templateUrl: '../../html/generation.html',
    styleUrl: '../../css/generation.css'
})
export class GenerationComponent {

    methodOption : MethodOption[];
    nameServer : WritableSignal<string>;
    versionServer : WritableSignal<string>;
    urlServer : WritableSignal<string>;
    endpoints : WritableSignal<EndpointIHM[]>;
    creationInProgress : WritableSignal<boolean>;
    tags : WritableSignal<string[]>;

    constructor(){
        this.endpoints = signal([]);
        this.tags = signal([]);
        this.methodOption = [];
        this.nameServer = signal("");
        this.versionServer = signal("");
        this.urlServer = signal("");
        this.creationInProgress = signal(false);
        MessageUtil.listen("endpointCreated", (args : string[])=>this.endpointCreated(args));

        this.methodOption.push(new MethodOption("0","", null));
        this.methodOption.push(new MethodOption("1","DELETE", EMethod.DELETE));
        this.methodOption.push(new MethodOption("2","GET", EMethod.GET));
        this.methodOption.push(new MethodOption("3","PATCH", EMethod.PATCH));
        this.methodOption.push(new MethodOption("4","POST", EMethod.POST));
        this.methodOption.push(new MethodOption("5","PUT", EMethod.PUT));
    }


    /** When an endpoint is Created, this function is called with the endpoint in JSON format given at args[0].
     * This function will add the endpoint in the actual component. */
    async endpointCreated(args : string[]){

        let endpointString : string = args[0];
        let endpoint : Endpoint = JSON.parse(endpointString);
        let endpointIHM : EndpointIHM = new EndpointIHM(`endpoint-${this.endpoints().length + 1}-close`, false, endpoint);

        let value = this.endpoints();
        value.push(endpointIHM);
        this.endpoints.set(value);

        if(!this.tags().includes(endpoint.tag)){
            let value = this.tags();
            value.push(endpoint.tag);
            this.tags.set(value);
        }

        this.creationInProgress.set(false);
        
    }


    /**  Load the screen to add a new Endpoint, if the user has filled the method, and the path of the endpoint. 
     * Else an error message will be send, by this method. */
    async addEndpoint() : Promise<void>{
        let methodNode : HTMLSelectElement | null = document.getElementById("endpoint_method") as HTMLSelectElement | null;
        let pathNode : HTMLInputElement | null = document.getElementById("endpoint_path") as HTMLInputElement | null;

        if(methodNode && pathNode){

            let method: EMethod | null = null;
            let path : string = pathNode.value.trim();

            for(let item of this.methodOption){
                if(methodNode.value == item.value)
                    method = item.method;
            }
            
            if(method == null)
                MessageUtil.call("logError", ["Merci de selectionner une méthode à associer à l'Url"]);
            else if(path == "")
                MessageUtil.call("logError", ["Impossible d'ajouter une Url sans chemin"]);
            else{
                MessageUtil.call("clearError", []);
                methodNode.value = "0";
                pathNode.value = "";
                this.creationInProgress.set(true);
                await Util.sleep(500); // wait for the hosted component to be created
                MessageUtil.call("initCreationEndpoint", [method, path]);                
            }
            
           
        }
    }

    /** Delete the endpoint with the id given */
    deleteEndpoint(id : string) : void{
        let oldEndpoints : EndpointIHM[] = this.endpoints();
        let newEndpoints : EndpointIHM[] = [];
        let oldTags : string[] = this.tags();
        let newTags : string[] = [];

        for(let endpoint of oldEndpoints){
            if(endpoint.id != id)
                newEndpoints.push(endpoint);
        }

        for(let tag of oldTags){
            let found : boolean = false;

            for(let endpoint of newEndpoints){
                if(endpoint.tag == tag)
                    found = true;
            }

            if(found)
                newTags.push(tag);
        }

       this.endpoints.set(newEndpoints);
       this.tags.set(newTags);
    }

    /** For the endpoint with the id given, change the tab displayed beetween body, and response. */
    switchTab(id: string, selected : string){

        for(let endpoint of this.endpoints()){
            if(endpoint.id == id)
                endpoint.selectedTab.set(selected);
        }

    }

    /** Open the tab of the endpoint matching the id given. */
    openEndpoint(id: string) : void{
        let endpointList : EndpointIHM[] = this.endpoints();

        for(let i in endpointList){
            if(endpointList[i].id == id){
                endpointList[i].id = `endpoint-${i + 1}-open`;
                endpointList[i].open = true;
            }
        }

        this.endpoints.set(endpointList);
    }


    /** Close the tab of the endpoint matching the id given. */
    closeEndpoint(id: string) : void{
        let endpointList : EndpointIHM[] = this.endpoints();

        for(let i in endpointList){
            if(endpointList[i].id == id){
                endpointList[i].id = `endpoint-${i + 1}-close`;
                endpointList[i].open = false;
            }
        }

        this.endpoints.set(endpointList);
    }


    /** A function to generate in Html a report to documentate the API. And the documentation is open in a next tab. */
    async openHtml() : Promise<void>{
        let infos : ServerInfo | null = this.retrieveServerInfo();

        if(infos != null){
            let answer : API_Response<DocReponse> = await API_Util.post<ServerInfo,DocReponse>("/documentation/html", infos);

            if(answer.hasFailed == true && answer.status){
                MessageUtil.call("logError", ["Erreur Serveur " + answer.status]);
            }
            else if(answer.hasFailed == true && !answer.status){
                MessageUtil.call("logError", ["Erreur Serveur : " + answer.errorMessage]);
            }
            else if(answer.data && answer.data.url_consultation){
                open(API_Util.BASE_URL + answer.data.url_consultation);
            }
        }
    }

    /** A function to generate in Html a report to documentate the API. And the documentation is open in a next tab. */
    async downloadHtml() : Promise<void>{
        let infos : ServerInfo | null = this.retrieveServerInfo();

        if(infos != null){
            let answer : API_Response<DocReponse> = await API_Util.post<ServerInfo,DocReponse>("/documentation/html", infos);

            if(answer.hasFailed == true && answer.status){
                MessageUtil.call("logError", ["Erreur Serveur " + answer.status]);
            }
            else if(answer.hasFailed == true && !answer.status){
                MessageUtil.call("logError", ["Erreur Serveur : " + answer.errorMessage]);
            }
            else if(answer.data && answer.data.url_download){
                open(API_Util.BASE_URL + answer.data.url_download);
            }
        }
    }
    

    /** Retrieve the information on the server writted by the client on the web page, or null if the informations are incomplet.
     * If the informations are incomplet, an error message is displayed to the client. */
    retrieveServerInfo() : ServerInfo | null{
        let endpointValue : EndpointIHM[] = this.endpoints();
        let endpointsAPI: Endpoint[] = [];

        for(let endpoint of endpointValue){
            let e = Endpoint.fromIhm(endpoint);
            endpointsAPI.push(e);
        }

        let nodeName : HTMLInputElement = document.getElementById("input_name") as HTMLInputElement ;
        let nodeVersion : HTMLInputElement = document.getElementById("input_version") as HTMLInputElement ;
        let nodeUrl : HTMLInputElement = document.getElementById("input_url") as HTMLInputElement ;

        if(!nodeName || !nodeVersion || !nodeUrl){
            MessageUtil.call("logError", ["Erreur Serveur interne"]);
            return null;
        }
        else if(endpointsAPI.length == 0){
            MessageUtil.call("logError", ["Au moins une url doit être renseignée"]);
            return null;
        }
        else{
            let name : string = nodeName.value.trim();
            let version : string = nodeVersion.value.trim();
            let urlServer : string = nodeUrl.value.trim();

            if(name == ""){
                MessageUtil.call("logError", ["Le nom d'API doit être renseigné"]);
                return null;
            }
            if(version == ""){
                MessageUtil.call("logError", ["La version d'API doit être renseignée"]);
                return null;
            }
            if(urlServer == ""){
                MessageUtil.call("logError", ["L'adresse du serveur doit être renseigné"]);
                return null;
            }
            
            let infos : ServerInfo = new ServerInfo(name,version,urlServer, endpointsAPI); 
            return infos;   
        }    
    }

    /** Replace the informations displayed on screen by an example already prepared. The goal is to facilitate
     * for the user the posibility to generate a documentation, to test. Because a API documentation can't be writted in 
     * 5 second.*/
    loadExample() : void{

        let nodeName : HTMLInputElement = document.getElementById("input_name") as HTMLInputElement ;
        let nodeVersion : HTMLInputElement = document.getElementById("input_version") as HTMLInputElement ;
        let nodeUrl : HTMLInputElement = document.getElementById("input_url") as HTMLInputElement ;

        if(!nodeName || !nodeVersion || !nodeUrl)
            MessageUtil.call("logError", ["Erreur Serveur interne"]);
        else{

            for(let endpoint of example.endpoints){
                for(let e of endpoint.examples){
                    e.value = JSON.stringify(JSON.parse(e.value), null,4);
                }
            }

            nodeName.value = example.name;
            nodeVersion.value = example.version;
            nodeUrl.value = example.urlServer;

            let newTags : string[] = [];
            let newEndpoints : EndpointIHM[] = [];

            for(let i in example.endpoints){
                if(!newTags.includes(example.endpoints[i].tag))
                    newTags.push(example.endpoints[i].tag);

                let newEndpoint = new EndpointIHM(`endpoint-${i + 1}-close`, false, example.endpoints[i]);
                newEndpoints.push(newEndpoint);
            }

            this.tags.set(newTags);
            this.endpoints.set(newEndpoints);
        }
    }

    /** A function called when the server name is changed, to ask for the component to save the value 
     * internally.*/
    nameServerChanged(){
        let nodeName : HTMLInputElement = document.getElementById("input_name") as HTMLInputElement ;

        if(nodeName)
            this.nameServer.set(nodeName.value); 
    }

    /** A function called when the server version is changed, to ask for the component to save the value 
     * internally.*/
    versionServerChanged(){
        let nodeVersion : HTMLInputElement = document.getElementById("input_version") as HTMLInputElement ;

        if(nodeVersion)
            this.versionServer.set(nodeVersion.value); 
    }

    /** A function called when the server version is changed, to ask for the component to save the value 
     * internally.*/
    urlServerChanged(){
        let nodeUrl : HTMLInputElement = document.getElementById("input_url") as HTMLInputElement ;

        if(nodeUrl)
            this.urlServer.set(nodeUrl.value); 
    }

}
