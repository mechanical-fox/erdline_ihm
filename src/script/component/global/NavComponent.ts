import { Component, signal, WritableSignal} from '@angular/core';
import {ExampleComponent} from '../pages/ExampleComponent';
import { AboutComponent } from '../pages/AboutComponent';
import { TutorialComponent } from '../pages/Tutorial';
import { EditionComponent } from '../pages/EditionComponent';
import { API_Util } from '../../util/APIUtil';

 
@Component({
    selector: 'Nav',
    imports : [ExampleComponent, AboutComponent, TutorialComponent, EditionComponent],
    templateUrl: '../../../html/global/nav.html',
    styleUrl: '../../../css/global/nav.css'
})
export class NavComponent {

    static HEALTH_URL = "/health";
    static HEALTH_URL_TIMEOUT_MS = 2000;
    static MESSAGE_DURATION_MS : number = 7000;

    selected : WritableSignal<string>;
    items : WritableSignal<string[]>;
    connectionTested : WritableSignal<boolean>;
    connectionHealthy : WritableSignal<boolean>;

    constructor(){
        this.items = signal(["Edition", "Tutoriel", "Exemples", "A propos"]);
        this.selected = signal(this.items()[0]);
        this.connectionTested = signal(false);
        this.connectionHealthy = signal(false);
    }

   /** A lifecycle happening after the content has been initialized. For this component, the goal is to 
     * initiate the first image of the canvas. */
    async ngAfterContentInit(){
        let serverHealthy : boolean = await API_Util.testConnection(NavComponent.HEALTH_URL, NavComponent.HEALTH_URL_TIMEOUT_MS);

        this.connectionHealthy.set(serverHealthy);
        this.connectionTested.set(true);
    }


    /** Function called when someone click on a item such as "Accueil"  */
    select(item : string) : void {
        this.selected.set(item);
    }

}
