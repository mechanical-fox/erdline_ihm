import { Component, WritableSignal, signal, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Storage} from '../../util/Storage';
import { Background } from '../../data/edition/Background';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { API_Util } from '../../util/APIUtil';
import { Color } from '../../data/api/Color';
import { API_Response } from '../../data/util/API_Response';
import { AuthResponse } from '../../data/api/AuthResponse';
import { Session } from '../../data/api/Session';


@Component({
    selector: 'Saving',
    imports : [FormsModule],
    templateUrl: '../../../html/edition_menu/saving.html',
    styleUrl: '../../../css/edition_menu/saving.css'
})
export class SavingComponent {

    connection = output<string>();
    sessionName : WritableSignal<string>;
    password : WritableSignal<string>;
    errorMessage : WritableSignal<string | null>;

    constructor(){
        this.sessionName = signal("");
        this.password = signal("");
        this.errorMessage = signal(null);
    }

    /** Try to connect to a specific session, using the session name, and the password filled by the user.*/
    async connect(){
        let body = new Session(this.sessionName(), this.password());
        let response = await API_Util.post<Session, AuthResponse>("/auth", body);

        if(response.hasFailed && response.status == 401)
            this.errorMessage.set("Echec d'authentification");
        else{
            this.errorMessage.set(null);
            this.connection.emit(this.sessionName());
        }
        
    }
}