import { Component, WritableSignal, signal, Signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {StorageUtil} from '../util/StorageUtil';

@Component({
    selector: 'Background',
    imports : [FormsModule],
    templateUrl: '../../html/background.html',
    styleUrl: '../../css/background.css'
})
export class BackgroundComponent {

    colors : any[];
    backgroundName: WritableSignal<string>;
    colorSelected: WritableSignal<string>;
    gradient : WritableSignal<string>;
    backgrounds : WritableSignal<any>;
    backgroundSelected : Signal<string | null>;

    constructor(){

        this.colors = this.listColor();
        this.backgroundName = signal("");
        this.colorSelected = signal("");
        this.gradient = signal("");
        this.backgroundSelected =  StorageUtil.getSelected("storage-background");

        if(Util.getVariable("backgrounds") != null){
            this.backgrounds = signal(Util.getVariable("backgrounds"));
        }
        else{
            this.backgrounds = signal([
                {
                    "name": StorageUtil.getDefaultName(),
                    "color-id" : "radio-orange"
                }
            ]);
        }

        this.flushAndSave();
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.backgroundSelected();

        for(let background of this.backgrounds()){
            if(background.name == selected && selected != null){
                this.backgroundName.set(selected);
                
                for(let color of this.colors){
                    if(color.id == background["color-id"]){
                        this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
                        this.colorSelected.set(color.id);
                    }
                }
            }
        }

        Util.setVariable("backgrounds", this.backgrounds());
    }

    /** Add a new background, with a generic name like #1, #2... And if the number of actual background is 0, will select 
     * the new background.*/
    addBackground(){
        let backgroundsValue = this.backgrounds();
        let newName  = StorageUtil.add("storage-background");

        backgroundsValue.push({
            "name" : newName,
            "color-id" : "radio-orange"
        });

        this.backgrounds.set(backgroundsValue);
        this.flushAndSave();
    }

    /** Select the background with the name indicated */
    selectBackground(name : string){

        StorageUtil.select("storage-background", name);
        this.flushAndSave();
        
    }

    /** Update the name of the background, in the list of backgrounds.*/
    updateBackgroungName(event : any){
        let backgroundsValue = this.backgrounds();

        for(let background of backgroundsValue){
            if(background.name == this.backgroundSelected() && event.target.value.trim().length > 0){
                background.name = event.target.value;
                this.backgrounds.set(backgroundsValue);
                StorageUtil.updateSelected("storage-background", event.target.value);
            }
        }

        this.flushAndSave();
    }

    /** Delete the current Background, and switch the background selected. If the user happen to delete all the backgrounds,
     * the background selected will be null.*/
    deleteCurrentBackground(){

        let newBackgroundsValue = [];

        for(let item of this.backgrounds()){
            if(item.name != this.backgroundSelected())
                newBackgroundsValue.push(item);
        }

        StorageUtil.deleteSelected("storage-background");//change the item selected
        this.backgrounds.set(newBackgroundsValue);
        this.flushAndSave();
    }

    /** Change the color of the color preview, by the color with the color id given, if the target of the event 
     * indicate "checked".  */
    colorChange(id: string, event : any){

        let ind = -1;
        let backgroundsValue = this.backgrounds();

        for(let i in backgroundsValue){
            if(event.target.checked && backgroundsValue[i].name == this.backgroundSelected()){
                ind = parseInt(i);
                backgroundsValue[ind]["color-id"] = id;
                this.backgrounds.set(backgroundsValue);
                this.flushAndSave();
            }       
        }
    }

    /** Returns a list of all the available colors*/
    listColor() : any[]{

        let colors = [
            {
                id: "radio-orange",
                value: "Orange",
                firstGradient: "rgb(240, 138, 22)",
                secondGradient: "rgb(231, 195, 36)",
                defaultChecked : true
            },
            {
                id: "radio-noir",
                value: "Noir",
                firstGradient: "rgb(32, 32, 32)",
                secondGradient: "rgb(97, 97, 97)",
                defaultChecked : false
            },
            {
                id: "radio-blue",
                value: "Bleu",
                firstGradient: "rgb(21, 59, 226)",
                secondGradient: "rgb(44, 141, 206)",
                defaultChecked : false
            }
        ];

        return colors;
    }

}