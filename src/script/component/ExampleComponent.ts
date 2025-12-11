import { Component, signal, Signal, WritableSignal} from '@angular/core';
import { Util } from '../util/Util';
import API_Response from '../data/util/API_Response';
import { ExampleResponse } from '../data/api/ExampleResponse';
import API_Util from '../util/APIUtil';
import { MessageUtil } from '../util/MessageUtil';
import { environment } from '../../environments/environment';


@Component({
    selector: 'erd-example',
    templateUrl: '../../html/example.html',
    styleUrl: '../../css/example.css'
})
export class ExampleComponent {

    BASE_URL : string = environment.BASE_URL;
    hideLoadingTimer : Signal<boolean>;
    isLoaded : WritableSignal<boolean>;
    examples : WritableSignal<ExampleResponse[]>;

    constructor(){

        this.examples = signal([]);
        this.isLoaded = signal(false);
        this.hideLoadingTimer = Util.createTimer("hideLoading");
        Util.startTimer("hideLoading", 2000);
        this.loadExamples();
       
    }


    /** This function will call /example, and initialize the examples known by the component with the answer */
    async loadExamples(){
        let answer : API_Response<ExampleResponse[]> = await API_Util.get<ExampleResponse[]>("/example");
        this.isLoaded.set(true);
        
        if(answer.hasFailed == true && answer.status){
            MessageUtil.call("logError", ["Erreur Serveur " + answer.status]);
        }
        else if(answer.hasFailed == true && !answer.status){
            MessageUtil.call("logError", ["Erreur Serveur : " + answer.errorMessage]);
        }
        else if(answer.data && answer.data.length){
            this.examples.set(answer.data);
        }
    }


    openExample(htmlId : string){
        let found : boolean = false;

        for(let example of this.examples()){
            if(!found && example.htmlId == htmlId){
                open(this.BASE_URL + example.url_consultation);
                found = true;
            }    
        }
    }

    downloadExample(htmlId : string){
        let found : boolean = false;

        for(let example of this.examples()){
            if(!found && example.htmlId == htmlId){
                open(this.BASE_URL + example.url_download);
                found = true;
            }    
        }
    }
}