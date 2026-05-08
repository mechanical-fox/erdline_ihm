import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Storage} from '../../util/Storage';
import { Background } from '../../data/ihm/Background';
import { Color } from '../../data/ihm/Color';

@Component({
    selector: 'Background',
    imports : [FormsModule],
    templateUrl: '../../../html/edition_menu/background.html',
    styleUrls: ['../../../css/edition_menu/background.css', '../../../css/others/viewList.css']
})
export class BackgroundComponent {

    colors : Color[];
    backgroundName: WritableSignal<string>;
    colorSelected: WritableSignal<string>;
    gradient : WritableSignal<string>;
    backgrounds : WritableSignal<Background[]>;
    storage : Storage;
    counter : number;

    constructor(){

        this.colors = this.listColors();
        this.backgroundName = signal("");
        this.colorSelected = signal("");
        this.gradient = signal("");

        if(Util.getVariable("backgrounds") != null){
            this.backgrounds = signal(Util.getVariable("backgrounds"));
            this.storage = Util.getVariable("backgrounds-storage");
            this.counter = Util.getVariable("backgrounds-counter");
            this.flushAndSave();
        }
        else{
            this.backgrounds = signal([]);
            this.storage = new Storage();
            this.counter = 1;
            this.addBackground();
        }
 
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        for(let background of this.backgrounds()){
            if(background.name == selected && selected != null){
                this.backgroundName.set(selected);
                
                for(let color of this.colors){
                    if(color.id == background.color_id){
                        this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
                        this.colorSelected.set(color.id);
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
    addBackground(){
        let backgroundsValue = this.backgrounds();
        let newName  = this.storage.add();
        let id = `background-${this.counter}`;
        this.counter++;

        let newBackground = new Background(id, newName,"radio-orange");
        backgroundsValue.push(newBackground);

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
    colorChange(id: string, event : any){

        let ind = -1;
        let backgroundsValue = this.backgrounds();

        for(let i in backgroundsValue){
            if(event.target.checked && backgroundsValue[i].name == this.storage.selected()){
                ind = parseInt(i);
                backgroundsValue[ind].color_id = id;
                this.backgrounds.set(backgroundsValue);
                this.flushAndSave();
            }       
        }
    }

    /** Returns a list of all the available colors*/
    listColors() : any[]{

        let color1 = new Color("radio-orange", "Orange", "rgb(240, 138, 22)", "rgb(231, 195, 36)");
        let color2 = new Color("radio-noir", "Noir", "rgb(32, 32, 32)", "rgb(97, 97, 97)");
        let color3 = new Color("radio-blue", "Bleu", "rgb(21, 59, 226)", "rgb(44, 141, 206)");
        let colors = [color1, color2,color3];

        return colors;
    }

}