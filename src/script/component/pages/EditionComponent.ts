
import { Component, WritableSignal, signal} from '@angular/core';
import { BackgroundComponent } from '../edition_menu/BackgroundComponent';
import { CharacterComponent } from '../edition_menu/CharacterComponent';
import { SceneComponent } from '../edition_menu/SceneComponent';
import { GameComponent } from '../edition_menu/GameComponent';
import { Util } from '../../util/Util';

@Component({
    selector: 'Edition',
    imports: [BackgroundComponent, CharacterComponent, SceneComponent, GameComponent],
    templateUrl: '../../../html/pages/edition.html',
    styleUrl: '../../../css/pages/edition.css'
})
export class EditionComponent {


    selected : WritableSignal<string>;
    focus_on : WritableSignal<string | null>;
    items : string[];


    constructor(){

        if(Util.getVariable("edition-selected") == null)
            this.selected = signal("Décors");
        else
            this.selected = signal(Util.getVariable("edition-selected"));

        this.focus_on = signal(null);
        this.items = ["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde"];
    }

    /** Function called when someone click on a item such as "Décors" */
    select(item : string){
        this.selected.set(item);
        Util.setVariable("edition-selected", item);
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