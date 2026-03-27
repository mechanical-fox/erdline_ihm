import { Component, WritableSignal, signal, Signal, computed} from '@angular/core';
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
    gradient : WritableSignal<string>;
    selected : WritableSignal<string>;
    focus_on : WritableSignal<string | null>;
    items : string[];

    constructor(){
        this.gradient = signal(`linear-gradient(180deg, rgb(240, 138, 22), rgb(224, 129, 20))`);
        this.backgroundName = signal("");
        this.selected = signal("Décors");
        this.focus_on = signal(null);
        this.items = ["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde"];
        this.colors = [
            {
                id: "radio-orange",
                value: "Orange",
                firstGradient: "rgb(240, 138, 22)",
                secondGradient: "rgb(224, 129, 20)",
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

    colorChange(id: string, event : any){

        for(let color of this.colors){
            if(color.id == id && event.target.checked)
                    this.gradient.set(`linear-gradient(180deg, ${color.firstGradient}, ${color.secondGradient})`);
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