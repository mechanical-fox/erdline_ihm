import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';

@Component({
    selector: 'Background',
    imports : [FormsModule],
    templateUrl: '../../html/background.html',
    styleUrl: '../../css/background.css'
})
export class BackgroundComponent {

    colors : any[];
    backgroundName: WritableSignal<string>;
    backgroundSelected: WritableSignal<string | null>;
    colorSelected: WritableSignal<string>;
    gradient : WritableSignal<string>;
    counterBackground : number;
    backgrounds : WritableSignal<any>;

    constructor(){

        if(Util.getVariable("backgrounds") != null){
            this.backgroundSelected = signal(Util.getVariable("backgroundSelected"));
            this.colorSelected = signal(Util.getVariable("colorSelected"));
            this.counterBackground = Util.getVariable("counterBackground");
            this.backgrounds = signal(Util.getVariable("backgrounds"));
        }
        else{
            this.backgroundSelected = signal("#1");
            this.colorSelected = signal("radio-orange");
            this.counterBackground = 2;
            this.backgrounds = signal([
                {
                    "name": "#1",
                    "color-id" : "radio-orange"
                }
            ]);
        }

        let value = this.backgroundSelected();
        value = value != null ? value : ""; 
        this.backgroundName = signal(value);
        this.colors = this.listColor();
        this.gradient = signal(`linear-gradient(180deg, rgb(7, 6, 4), rgb(231, 195, 36))`);

        for(let color of this.colors){
            if(color.id == this.colorSelected()){
                this.gradient.set(`linear-gradient(180deg, ${color.firstGradient},  ${color.secondGradient}`);
            }
        }
    }

    /** A function to save the state of the component. This function allow to quit the tab, return to the tab, and don't lost
     * data beetween this actions. */
    saveState(){
        Util.setVariable("backgroundSelected", this.backgroundSelected());
        Util.setVariable("colorSelected", this.colorSelected());
        Util.setVariable("counterBackground", this.counterBackground);
        Util.setVariable("backgrounds", this.backgrounds());
    }

    /** Add a new background, with a generic name like #1, #2... And if the number of actual background is 0, will select 
     * the new background.*/
    addBackground(){
        let backgroundsValue = this.backgrounds();
        let defaultName = `#${this.counterBackground}`;

        backgroundsValue.push({
            "name" : defaultName,
            "color-id" : "radio-orange"
        });

        this.counterBackground++;
        this.backgrounds.set(backgroundsValue);

        if(this.backgroundSelected() == null)
            this.selectBackground(defaultName);

        this.saveState();
    }

    /** Select the background with the name indicated */
    selectBackground(name : string){

        for(let background of this.backgrounds()){
            if(background.name == name){
                this.backgroundName.set(name);
                this.backgroundSelected.set(name);
                
                for(let color of this.colors){
                    if(color.id == background["color-id"]){
                        this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
                        this.colorSelected.set(color.id);
                    }
                }
            }
        }

        this.saveState();
        
    }

    /** Update the name of the background, in the list of backgrounds.*/
    updateBackgroungName(event : any){
        let backgroundsValue = this.backgrounds();

        for(let background of backgroundsValue){
            if(background.name == this.backgroundSelected() && event.target.value.trim().length > 0){
                background.name = event.target.value;
                this.backgrounds.set(backgroundsValue);
                this.backgroundSelected.set(event.target.value);
            }
        }

        this.saveState();
    }

    /** Delete the current Background, and switch the background selected. If the user happen to delete all the backgrounds,
     * the background selected will be null.*/
    deleteCurrentBackground(){

        let backgroundsValue = this.backgrounds();
        let newBackgroundsValue = [];
        let newSelected = null;

        for(let i in backgroundsValue){
            if(backgroundsValue[i].name == this.backgroundSelected()){
                let ind = parseInt(i);

                if(ind + 1 < backgroundsValue.length)
                    newSelected = backgroundsValue[ind + 1].name;
                else if(ind - 1 >= 0)
                    newSelected = backgroundsValue[ind -1].name;
                else //if the user is deleting the last background
                    newSelected = null;
            }
            else
                newBackgroundsValue.push(backgroundsValue[i]);
        }

        this.backgrounds.set(newBackgroundsValue);

        if(newSelected == null)
            this.backgroundSelected.set(null);
        else
            this.selectBackground(newSelected);
        
        this.saveState();
    }

    /** Change the color of the color preview, by the color with the color id given, if the target of the event 
     * indicate "checked".  */
    colorChange(id: string, event : any){

        let ind = -1;
        let backgroundsValue = this.backgrounds();

        for(let i in backgroundsValue){
            if(backgroundsValue[i].name == this.backgroundSelected())
                ind = parseInt(i);
        }

        for(let color of this.colors){
            if(color.id == id && event.target.checked){
                this.colorSelected.set(color.id);
                this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
                backgroundsValue[ind]["color-id"] = color.id;
                this.backgrounds.set(backgroundsValue);
            }       
        }

        this.saveState();
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