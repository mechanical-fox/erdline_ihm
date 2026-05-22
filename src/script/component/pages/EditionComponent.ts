
import { Component, WritableSignal, signal, output} from '@angular/core';
import { BackgroundComponent } from '../edition_menu/BackgroundComponent';
import { CharacterComponent } from '../edition_menu/CharacterComponent';
import { SceneComponent } from '../edition_menu/SceneComponent';
import { GameComponent } from '../edition_menu/GameComponent';
import { ConfigurationComponent } from '../edition_menu/ConfigurationComponent';
import { SavingComponent } from '../edition_menu/SavingComponent';
import { Util } from '../../util/Util';
import { ConnectionStatus } from '../../data/edition/ConnectionStatus';

@Component({
    selector: 'Edition',
    imports: [BackgroundComponent, CharacterComponent, SceneComponent, GameComponent, ConfigurationComponent, SavingComponent],
    templateUrl: '../../../html/pages/edition.html',
    styleUrl: '../../../css/pages/edition.css'
})
export class EditionComponent {

    connection = output<ConnectionStatus>();
    adminUser : WritableSignal<boolean>;
    selected : WritableSignal<string>;
    focus_on : WritableSignal<string | null>;
    items : WritableSignal<string[]>;


    constructor(){

        if(Util.getVariable("edition-selected") == null){
            this.selected = signal("Décors");
            this.adminUser = signal(false);
        }
        else{
            this.selected = signal(Util.getVariable("edition-selected"));
            this.adminUser = signal(Util.getVariable("edition-admin-user"));
        }

        this.focus_on = signal(null);

        if(this.adminUser())
            this.items = signal(["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde", "Configuration"]);
        else
            this.items = signal(["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde"]);
        
    }

    /** Save the state of the component, to be able to remember informations even if the user change of tab */
    save(){
        Util.setVariable("edition-selected", this.selected());
        Util.setVariable("edition-admin-user", this.adminUser());
    }

    /** Function called when someone click on a item such as "Décors" */
    select(item : string){
        this.selected.set(item);
        this.save();
    }

    /** Function called when someone put the mouse on an item */
    mouse_over(item : string){
        this.focus_on.set(item);
    }

    /** Function called when someone retrieve the mouse from an item */
    mouse_out(){
        this.focus_on.set(null);
    }

    /** Transmit an event connection to the parent, and for this composant will register if the user is admin or not.
    * An admin user, will be able to see tab inaccessible to others users. A reason, is to*/
    connectionReceived(session : ConnectionStatus){

        let adminItems = ["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde", "Configuration"];
        let nonAdminItems = ["Décors", "Personnages", "Scènes", "Jouer", "Sauvegarde"];

        if(session.isAdmin)
            this.items.set(adminItems);
        else
            this.items.set(nonAdminItems);

        this.adminUser.set(session.isAdmin);
        this.save();
        this.connection.emit(session);
    }

}