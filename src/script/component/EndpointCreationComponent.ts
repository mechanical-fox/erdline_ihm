import { Component, signal, WritableSignal} from '@angular/core';
import { MessageUtil } from '../util/MessageUtil';
import { ParameterIHM } from '../data/ihm/ParameterIHM';
import { Parameter } from '../data/api/Parameter';
import { Endpoint } from '../data/api/Endpoint';


@Component({
    selector: 'erd-endpoint-creation',
    templateUrl: '../../html/endpoint_creation.html',
    styleUrl: '../../css/endpoint_creation.css'
})
export class EnpointCreationComponent {

    method :  WritableSignal<string | null>;
    url : WritableSignal<string | null>;
    returned_codes : WritableSignal<number[]>;
    choices_number_parameter : number[];
    parameters : WritableSignal<ParameterIHM[]>;
    bodyText : WritableSignal<string>;
    responseText : WritableSignal<string>;
    selectedTab : WritableSignal<string>;

    constructor(){
        this.choices_number_parameter = [0,1,2,3,4,5,6];
        this.method = signal(null);
        this.url = signal(null);
        this.returned_codes = signal([]);
        this.parameters = signal([]);
        this.bodyText = signal("");
        this.responseText = signal("");
        this.selectedTab = signal("body");
        MessageUtil.listen("initCreationEndpoint", (args: string[])=>this.initCreationEndpoint(args));
    }

    /** Change the tab displayed beetween body, and response. */
    switchTab(selected : string) : void{

        let node : HTMLTextAreaElement = document.getElementById("field_textarea") as HTMLTextAreaElement;

        if(node && selected == "body")
            this.responseText.set(node.value);
        else if(node && selected != "body")
            this.bodyText.set(node.value);

        this.selectedTab.set(selected);
    }

    /** A function to initialize the creation of a endpoint, by given the method and the url of the endpoint, in first and 
     * second arguments. */
    initCreationEndpoint(args : string[]) : void{
        this.method.set(args[0]);
        this.url.set(args[1]);
    }

    /** Change the number of parameters expected, and so the number of input fields displayed */
    setNumberParameter(numberParameter : number) : void{

        if(numberParameter > this.parameters().length){
            let value : ParameterIHM[] = this.parameters();

            for(let i = this.parameters().length; i < numberParameter;i++){
                let idTypeInput = `input-type-${i + 1}`;
                let idNameInput = `input-name-${i + 1}`;
                let idExampleInput = `input-example-${i + 1}`;
                let parameter : ParameterIHM = new ParameterIHM(idTypeInput, idNameInput, idExampleInput);
                value.push(parameter);
            }

            this.parameters.set(value);
        }
        else if(numberParameter < this.parameters().length){
            let value : ParameterIHM[] = this.parameters().slice(0, numberParameter);
            this.parameters.set(value);
        }
    }

    /** Add the status code contained in the expected input. If the input is empty, or isn't a number,  
     * an error message will be displayed. */
    addStatusCode() : void{

        let node : HTMLInputElement | null = document.getElementById("statusInput") as HTMLInputElement | null;
        let statusCode : string | undefined =  node?.value;
        let statusCodeParsed : number | null =  statusCode ? parseInt(statusCode) : null;

        if(statusCode != undefined && statusCode != null && statusCode.trim() == "")
            MessageUtil.call("logError", ["Code de retour non renseigné"]);
        else if(!statusCodeParsed || isNaN(statusCodeParsed))
            MessageUtil.call("logError", ["Code de retour doit être un nombre"]);

        if(node && statusCodeParsed && !isNaN(statusCodeParsed)){
            node.value = "";
            let value = this.returned_codes();
            value.push(statusCodeParsed);
            this.returned_codes.set(value);
        }
        
    }

    /** This function check if all the inputs are correctly filled, and send true if its the case. If an input is empty, or
     * incorrectly filled, false is returned, and the error is displayed to the user. */
    checkValidity() : boolean{
         let nodeTag : HTMLInputElement | null = document.getElementById("input_tag") as HTMLInputElement | null;

        if(!nodeTag || nodeTag.value.trim() == ""){
            MessageUtil.call("logError", ["Tag est un champ obligatoire"]);
            return false;
        }
        else if(this.returned_codes().length == 0){
            MessageUtil.call("logError", ["Au moins un code de retour doit être renseigné"]);
            return false;
        }
        else{

            for(let parameter of this.parameters()){
                let nodeType = document.getElementById(parameter.idTypeInput) as HTMLSelectElement | null;
                let nodeName = document.getElementById(parameter.idNameInput) as HTMLInputElement | null;
                let nodeExample = document.getElementById(parameter.idExampleInput) as HTMLInputElement | null;

                if(nodeType && nodeName && nodeExample){
                    if(nodeType.value == "0"){
                        MessageUtil.call("logError", ["Le type des paramètres doit être renseigné"]);
                        return false;
                    }
                    else if(nodeName.value.trim() == ""){
                        MessageUtil.call("logError", ["Le nom des paramètres doit être renseigné"]);
                        return false;
                    }
                    else if(nodeExample.value.trim() == ""){
                        MessageUtil.call("logError", ["Un exemple doit être renseigné pour chaque paramètre"]);
                        return false;
                    }
                }
            }
        }

        return true;
    }


    /** Add the endpoint created, if the endpoint is valid.*/
    save() : void{
        let node : HTMLTextAreaElement = document.getElementById("field_textarea") as HTMLTextAreaElement;

        if(node && this.selectedTab() == "body")
            this.bodyText.set(node.value);
        else if(node && this.selectedTab() != "body")
            this.responseText.set(node.value);

        let nodeTag : HTMLInputElement | null = document.getElementById("input_tag") as HTMLInputElement | null;
        let valid = this.checkValidity();

        if(valid && node && nodeTag){
            let method = this.method();
            let path = this.url();
            let tag = nodeTag.value.trim();
            let status_list = this.returned_codes();
            let parsedParameters : Parameter[] = [];
            let exampleBody : string | null = this.bodyText().trim() != "" ? this.bodyText() : null;
            let exampleResponse : string | null = this.responseText().trim() != "" ? this.responseText() : null;

            for(let parameter of this.parameters()){
                let nodeType = document.getElementById(parameter.idTypeInput) as HTMLSelectElement | null;
                let nodeName = document.getElementById(parameter.idNameInput) as HTMLInputElement | null;
                let nodeExample = document.getElementById(parameter.idExampleInput) as HTMLInputElement | null;

                if(nodeType && nodeName && nodeExample){
                    let parsedParameter = new Parameter(nodeType.value, nodeName.value.trim(), nodeExample.value.trim());
                    parsedParameters.push(parsedParameter);
                }
            }

            if(method && path){
                let endpoint : Endpoint = new Endpoint(method, path,tag,status_list,parsedParameters,exampleBody,exampleResponse);
                let endpointJson : string = JSON.stringify(endpoint);
                MessageUtil.call("endpointCreated", [endpointJson]);
            }
            
        }
    }



}