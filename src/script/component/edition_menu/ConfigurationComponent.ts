
import { Component, WritableSignal, signal} from '@angular/core';
import { ColorConfig } from '../../data/edition/ColorConfig';
import { BackgroundComponent } from './BackgroundComponent';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { ColorBody } from '../../data/api/ColorBody';
import { API_Util } from '../../util/APIUtil';
import { Util } from '../../util/Util';


@Component({
    selector: 'Configuration',
    templateUrl: '../../../html/edition_menu/configuration.html',
    styleUrl: '../../../css/edition_menu/configuration.css'
})
export class ConfigurationComponent {

    static MESSAGE_DURATION_MS = 6000;

    isLoaded : WritableSignal<boolean>;
    initialColors  : WritableSignal<ColorConfig[]>;
    internColors : ColorConfig[];
    modifiedColors : boolean[];
    message : WritableSignal<string>;
    showMessage : WritableSignal<boolean>;
    isErrorMessage : WritableSignal<boolean>;

    constructor(){
        this.isLoaded = signal(false);
        this.initialColors = signal([]);
        this.internColors = [];
        this.modifiedColors = [];
        this.message = signal("");
        this.showMessage = Util.createTimer("showMessage", true);
        this.isErrorMessage = signal(false);
    }

    /** A lifecycle happening after the content has been initialized. Will initialize the colors to display, and the colors 
     * in intern. */
    async ngAfterContentInit(){

        let colors : ColorIHM[] = await BackgroundComponent.listColors();
        let parsedColors : ColorConfig[] = [];
        let i = 1;

        for(let color of colors){
            let parsedColor = new ColorConfig(color, i);
            i++;
            parsedColors.push(parsedColor);
        }

        while(i <= 4){
            let newColor : ColorConfig= {
                counter : i, 
                databaseID : null, 
                name : "", 
                firstGradient : "rgb(157,157,157)", 
                secondGradient : "rgb(157,157,157)"
            };
            i++;
            parsedColors.push(newColor); 
        }

        for(let color of parsedColors)
            this.modifiedColors.push(false);

        let copy = JSON.parse(JSON.stringify(parsedColors));
        this.initialColors.set(copy);
        this.internColors = parsedColors;
        this.isLoaded.set(true);
        
    }


    /** Change the data "firstGradient" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    firstColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.firstGradient = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }

    /** Change the data "secondGradient" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    secondColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.secondGradient = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }

    /** Change the data "name" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    nameColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.name = event.target.value;
        }

        this.modifiedColors[counter - 1] = true;
    }


    /**Save the change performed by the client, by calling the API */
    async save(){

        let emptyNameField : boolean = false;

        for(let color of this.internColors){
            
            if(color.databaseID != null && color.name.trim() == "")
                emptyNameField = true;
        }

        if(emptyNameField){
            this.message.set("Le champ Nom est obligatoire");
            this.isErrorMessage.set(true);
            Util.startTimer("showMessage", ConfigurationComponent.MESSAGE_DURATION_MS);
        }
        else{
            for(let i = 0; i < this.internColors.length; i++){
                let color = this.internColors[i];

                if(this.modifiedColors[i]){
                    if(color.databaseID != null){
                        let body = new ColorBody(color.name, color.firstGradient, color.secondGradient);
                        API_Util.put(`/color/${color.databaseID}`, body);
                    }
                    else{
                        let body = new ColorBody(color.name, color.firstGradient, color.secondGradient);
                        let response = await API_Util.post(`/color`, body);

                        if(!response.hasFailed && response.responseHeaders){
                            let location = response.responseHeaders.get("Location");

                            if(location && location.includes("/")){
                                let parts = location.split("/");
                                let idCreated = parts[parts.length - 1].trim();
                                this.internColors[i].databaseID = idCreated;
                            }
                        }
                    }
                    this.modifiedColors[i] = false;
                }
            }

            this.message.set("Enregistré avec succès");
            this.isErrorMessage.set(false);
            Util.startTimer("showMessage", ConfigurationComponent.MESSAGE_DURATION_MS);
        }
    }

}