import { Component, Signal, signal, WritableSignal} from '@angular/core';
import {GenerationComponent} from './GenerationComponent';
import {ExampleComponent} from './ExampleComponent';
import {WelcomeComponent} from './WelcomeComponent';
import { AboutComponent } from './AboutComponent';
import { Util } from '../util/Util';
import { MessageUtil } from '../util/MessageUtil';
 
@Component({
    selector: 'erd-nav',
    imports : [GenerationComponent, ExampleComponent, WelcomeComponent, AboutComponent],
    templateUrl: '../../html/nav.html',
    styleUrl: '../../css/nav.css'
})
export default class NavComponent {

    static MESSAGE_DURATION_MS : number = 7000;

    errorMessage : WritableSignal<string | null>;
    errorTimer : Signal<boolean>;
    mouseSelect : WritableSignal<string | null>;
    selected : WritableSignal<string>;
    items : WritableSignal<string[]>;

    constructor(){
        this.items = signal(["Accueil", "Generation", "Exemples", "A propos"]);
        this.selected = signal(this.items()[0]);
        this.mouseSelect = signal(null);
        this.errorMessage = signal(null);
        this.errorTimer = Util.createTimer("errorTimer");
        MessageUtil.listen("logError", (args: string[])=>this.logError(args));
        MessageUtil.listen("clearError", ()=>this.clearError());
    }

    /** This function clear the previous error displayed to the user */
    clearError() : void {
        this.errorMessage.set(null);
    }

    /** This function display an error to the user */
    logError(args : string[]) : void {

        if(args.length >= 1){
            Util.startTimer("errorTimer", NavComponent.MESSAGE_DURATION_MS);
            this.errorMessage.set(args[0]);
        }

    }

    /** Function called when someone click on a item like "Accueil"  */
    select(item : string) : void {
        this.selected.set(item);
        Util.startTimer("errorTimer", 7000);
    }

    /** Function called when the cursor enters in an item like "Accueil"  */
    mouseSelected(item: string) : void {
        this.mouseSelect.set(item);
    }

    /** Function called when the cursor leaves an item like "Accueil"  */
    mouseLeave() : void {
        this.mouseSelect.set(null);
    }
}
