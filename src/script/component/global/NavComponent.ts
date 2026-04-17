import { Component, signal, WritableSignal} from '@angular/core';
import {ExampleComponent} from '../pages/ExampleComponent';
import { AboutComponent } from '../pages/AboutComponent';
import { TutorialComponent } from '../pages/Tutorial';
import { EditionComponent } from '../pages/EditionComponent';
 
@Component({
    selector: 'Nav',
    imports : [ExampleComponent, AboutComponent, TutorialComponent, EditionComponent],
    templateUrl: '../../../html/global/nav.html',
    styleUrl: '../../../css/global/nav.css'
})
export class NavComponent {

    static MESSAGE_DURATION_MS : number = 7000;

    selected : WritableSignal<string>;
    items : WritableSignal<string[]>;

    constructor(){
        this.items = signal(["Edition", "Tutoriel", "Exemples", "A propos"]);
        this.selected = signal(this.items()[0]);
    }



    /** Function called when someone click on a item such as "Accueil"  */
    select(item : string) : void {
        this.selected.set(item);
    }

}
