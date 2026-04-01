import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'Edition',
    imports : [FormsModule],
    templateUrl: '../../html/edition.html',
    styleUrl: '../../css/edition.css'
})
export class EditionComponent {

    colors : any[];
    backgroundName: WritableSignal<string>;
    backgroundSelected: WritableSignal<string | null>;
    colorSelected: WritableSignal<string>;
    gradient : WritableSignal<string>;
    selected : WritableSignal<string>;
    focus_on : WritableSignal<string | null>;
    items : string[];
    counter_background : number;
    backgrounds : WritableSignal<any>;

    constructor(){
        this.gradient = signal(`linear-gradient(180deg, rgb(240, 138, 22), rgb(231, 195, 36))`);
        this.backgroundName = signal("#1");
        this.backgroundSelected = signal("#1");
        this.colorSelected = signal("radio-orange");
        this.selected = signal("Décors");
        this.focus_on = signal(null);
        this.items = ["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde"];
        this.counter_background = 2;
        this.backgrounds = signal([
            {
                "name": "#1",
                "color-id" : "radio-orange"
            }
        ]);
        this.colors = [
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
    }

    /** Add a new background, with a generic name like #1, #2... And if the number of actual background is 0, will select 
     * the new background.*/
    addBackground(){
        let backgroundsValue = this.backgrounds();
        let defaultName = `#${this.counter_background}`;

        backgroundsValue.push({
            "name" : defaultName,
            "color-id" : "radio-orange"
        });

        this.counter_background++;
        this.backgrounds.set(backgroundsValue);

        if(this.backgroundSelected() == null)
            this.selectBackground(defaultName);
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
    }

    /** Function called when someone click on a item such as "Décors" */
    select(item : string){
        this.selected.set(item);
    }

    /** Function called when someone put the mouse on an item */
    mouse_over(item : string){
        this.focus_on.set(item);
    }

    /** Function called when someone retrieve the mouse from an item */
    mouse_out(item : string){
        this.focus_on.set(null);
    }

}