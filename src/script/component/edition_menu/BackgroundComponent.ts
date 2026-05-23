import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Storage} from '../../util/Storage';
import { Background } from '../../data/edition/Background';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { API_Util } from '../../util/APIUtil';
import { Color } from '../../data/api/Color';
import { API_Response } from '../../data/util/API_Response';

@Component({
    selector: 'Background',
    imports : [FormsModule],
    templateUrl: '../../../html/edition_menu/background.html',
    styleUrls: ['../../../css/edition_menu/background.css', '../../../css/others/viewList.css']
})
export class BackgroundComponent {

    colors : WritableSignal<ColorIHM[]>;
    backgroundName: WritableSignal<string>;
    colorSelected: WritableSignal<string>;
    gradient : WritableSignal<string>;
    backgrounds : WritableSignal<Background[]>;
    storage : Storage;
    counter : number;
    isLoaded : WritableSignal<boolean>;
    defaultColorId : string | null;

    constructor(){

        this.colors = signal([]);
        this.backgroundName = signal("");
        this.colorSelected = signal("");
        this.gradient = signal("");
        this.defaultColorId = null;

        if(Util.getVariable("backgrounds") != null){
            this.backgrounds = signal(Util.getVariable("backgrounds"));
            this.storage = Util.getVariable("backgrounds-storage");
            this.counter = Util.getVariable("backgrounds-counter");
            this.isLoaded = signal(false);
            this.flushAndSave();
        }
        else{
            this.backgrounds = signal([]);
            this.storage = new Storage();
            this.counter = 1;
            this.isLoaded = signal(false);
            
        }
 
    }

    /** A lifecycle happening after the content has been initialized. For this component, the goal is to 
     * initiate what colors display to the client.*/
    async ngAfterContentInit(){

        let colors : ColorIHM[] = await BackgroundComponent.listColors();
        this.colors.set(colors);

        if(colors.length > 0)
            this.defaultColorId = colors[0].databaseID;

        if(Util.getVariable("backgrounds") != null)
            this.flushAndSave();
        else
            this.addBackground();

        this.isLoaded.set(true);
        
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        for(let background of this.backgrounds()){
            if(background.name == selected && selected != null){
                this.backgroundName.set(selected);
                
                for(let color of this.colors()){
                    if(color.databaseID == background.color_id){
                        this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
                        this.colorSelected.set(color.databaseID);
                    }
                }
            }
        }

        Util.setVariable("backgrounds", this.backgrounds());
        Util.setVariable("backgrounds-storage", this.storage);
        Util.setVariable("backgrounds-counter", this.counter);
    }

    /** Add a new background, with a generic name like #1, #2... And if the number of actual background is 0, will select 
     * the new background.*/
    async addBackground(){
        let backgroundsValue = this.backgrounds();
        let newName  = this.storage.add();
        let id = `background-${this.counter}`;
        this.counter++;


        if(this.defaultColorId){
            let newBackground = new Background(this.counter - 1, id, newName, this.defaultColorId);
            backgroundsValue.push(newBackground);
        }
        else{
            let newBackground = new Background(this.counter - 1, id, newName, "1");
            backgroundsValue.push(newBackground);
        }

        this.backgrounds.set(backgroundsValue);
        this.flushAndSave();
    }

    /** Select the background with the name indicated */
    selectBackground(name : string){

        this.storage.select(name);
        this.flushAndSave();
        
    }

    /** Update the name of the current background.*/
    updateBackgroungName(event : any){
        let backgroundsValue = this.backgrounds();

        for(let background of backgroundsValue){
            if(background.name == this.storage.selected() && event.target.value.trim().length > 0){
                background.name = event.target.value;
                this.backgrounds.set(backgroundsValue);
                this.storage.updateSelected(event.target.value);
            }
        }

        this.flushAndSave();
    }

    /** Delete the current Background, and switch the background selected. If the user happen to delete all the backgrounds,
     * the background selected will be null.*/
    deleteCurrentBackground(){

        let newBackgroundsValue = [];

        for(let item of this.backgrounds()){
            if(item.name != this.storage.selected())
                newBackgroundsValue.push(item);
        }

        this.storage.deleteSelected();
        this.backgrounds.set(newBackgroundsValue);
        this.flushAndSave();
    }

    /** Change the color of the color preview, by the color with the color id given, if the target of the event 
     * indicate "checked".  */
    colorChange(databaseID: string, event : any){

        let ind = -1;
        let backgroundsValue = this.backgrounds();

        for(let i in backgroundsValue){
            if(event.target.checked && backgroundsValue[i].name == this.storage.selected()){
                ind = parseInt(i);
                backgroundsValue[ind].color_id = databaseID;
                this.backgrounds.set(backgroundsValue);
                this.flushAndSave();
            }       
        }
    }

    /** Returns a list of all the available colors. The answer isn't cached, because the admin users can configure the colors. And a admin can 
     * configure the colors, and go to this page just after, to see if the change was taked into account... */
    static async listColors() : Promise<ColorIHM[]>{


        let answer : API_Response<Color[]> = await API_Util.get<Color[]>("/color");

        if(!answer.hasFailed && answer.data){
            let result = [];

            for(let color of answer.data)
                result.push(new ColorIHM(color));

            return result;
        }
        else
            return [];
        
    
    }

}