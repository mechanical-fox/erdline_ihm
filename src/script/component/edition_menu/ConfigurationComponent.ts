
import { Component, WritableSignal, signal} from '@angular/core';
import { ColorConfig } from '../../data/edition/ColorConfig';
import { BackgroundComponent } from './BackgroundComponent';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { ColorBody } from '../../data/api/ColorBody';
import { API_Util } from '../../util/APIUtil';


@Component({
    selector: 'Configuration',
    templateUrl: '../../../html/edition_menu/configuration.html',
    styleUrl: '../../../css/edition_menu/configuration.css'
})
export class ConfigurationComponent {

    isLoaded : WritableSignal<boolean>;
    initialColors  : WritableSignal<ColorConfig[]>;
    internColors : ColorConfig[];

    constructor(){
        this.isLoaded = signal(false);
        this.initialColors = signal([]);
        this.internColors = [];
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
    }

    /** Change the data "secondGradient" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    secondColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.secondGradient = event.target.value;
        }
    }

    /** Change the data "name" about the color matching the counter in intern. Will be saved in the database, if the
     * user click on the button "Enregistrer". */
    nameColorChange(counter : number, event : any){

        for(let color of this.internColors){
            if(color.counter == counter)
                color.name = event.target.value;
        }
    }


    /**Save the change performed by the client, by calling the API */
    save(){

        for(let i = 0; i < this.internColors.length;i++){
            let c1 = this.internColors[i];
            let c2 = this.initialColors()[i];

            if(c1.name != c2.name || c1.firstGradient != c2.firstGradient || c1.secondGradient != c2.secondGradient){
                let body = new ColorBody(c1.name, c1.firstGradient, c1.secondGradient);
                API_Util.put(`/color/${c1.databaseID}`, body);
            }
            
        }
    }

}