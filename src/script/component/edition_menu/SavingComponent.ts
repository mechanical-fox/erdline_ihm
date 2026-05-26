
import { Component, WritableSignal, signal, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import { API_Util } from '../../util/APIUtil';
import { AuthResponse } from '../../data/api/AuthResponse';
import { Session } from '../../data/api/Session';
import { ValidityResponse } from '../../data/api/ValidityResponse';
import { ConnectionStatus } from '../../data/edition/ConnectionStatus';
import { PartialSession } from '../../data/api/PartialSession';
import { SessionResponse } from '../../data/api/SessionResponse';
import { SessionTrackerUtil } from '../../util/SessionTrackerUtil';
import { SavingUtil } from '../../util/SavingUtil';

@Component({
    selector: 'Saving',
    imports : [FormsModule],
    templateUrl: '../../../html/edition_menu/saving.html',
    styleUrl: '../../../css/edition_menu/saving.css'
})
export class SavingComponent {

    connection = output<ConnectionStatus>();
    isConnected : WritableSignal<boolean>;
    isAdmin : WritableSignal<boolean>;
    sessionName : WritableSignal<string>;
    password : WritableSignal<string>;
    errorMessage : WritableSignal<string | null>;

    constructor(){

        if(Util.getVariable("saving-session-name")){
            this.isConnected = signal(Util.getVariable("saving-is-connected"));
            this.isAdmin = signal(Util.getVariable("saving-is-admin"));

            if(this.isConnected())
                this.sessionName = signal(Util.getVariable("saving-session-name"));
            else
                this.sessionName = signal("");
        }
        else{
            this.isConnected = signal(false);
            this.isAdmin = signal(false);
            this.sessionName = signal("");
        }

        this.password = signal("");
        this.errorMessage = signal(null);
    }

    /** Save the state of the component, to be able to remember informations even if the user change of tab */
    save(){
        Util.setVariable("saving-is-connected", this.isConnected());
        Util.setVariable("saving-is-admin", this.isAdmin());
        Util.setVariable("saving-session-name", this.sessionName()); 
    }

    /** Try to connect to a specific session, using the session name, and the password filled by the user.*/
    async connect(){
        let body = new PartialSession(this.sessionName(), this.password());
        let response = await API_Util.post<PartialSession, AuthResponse>("/auth", body);

        if(response.hasFailed && response.status == 401)
            this.errorMessage.set("Echec d'authentification");
        else if(response.data){
            let sessionId = response.data.sessionId;
            API_Util.setToken(response.data.token);
            let response2 = await API_Util.get<SessionResponse>(`/session/${sessionId}`);

            if(!response2.hasFailed && response2.data){
                SavingUtil.loadBackground(response2.data.json_backgrounds);
                SavingUtil.loadCharacters(response2.data.json_characters);
                SavingUtil.loadScenes(response2.data.json_scenes);
                this.errorMessage.set(null);
                this.isConnected.set(true);
                this.isAdmin.set(response.data.isAdmin);
                this.save();
                let connectionStatus = new ConnectionStatus(body.session, response.data.isAdmin);
                SessionTrackerUtil.startTracking(sessionId);
                this.connection.emit(connectionStatus);
            }
        }
    }


    /** Create a new session, using the session name, and the password filled by the user. If the informations filled by the user
     * don't respect some rule (ex: session name already taken, password contains at least 6 characters), an error is displayed. */
    async registerSession(){
        let partialBody = new PartialSession(this.sessionName(), this.password());
        let json_backgrounds = SavingUtil.getJsonBackgrounds();
        let json_characters = SavingUtil.getJsonCharacters();
        let json_scenes = SavingUtil.getJsonScenes();
        let body = new Session(this.sessionName(), this.password(), json_backgrounds, json_characters, json_scenes);
        let response = await API_Util.post<PartialSession, ValidityResponse>("/session/validity", partialBody);

        if(!response.hasFailed && response.data){
            let validityResponse : ValidityResponse = response.data;
            let error : string | null = null;
            let includeAllCharacterType : boolean = true;

            includeAllCharacterType = includeAllCharacterType && validityResponse.includeLowercaseCharacters;
            includeAllCharacterType = includeAllCharacterType && validityResponse.includeUppercaseCharacters;
            includeAllCharacterType = includeAllCharacterType && validityResponse.includeDigits;

            if(validityResponse.sessionAlreadyExisting)
                error = "Nom de session déjà utilisé";
            else if(this.sessionName().length < 4)
                error = "Le nom de session devrait être d'au moins 4 caractères";
            else if(!validityResponse.atLeastSixCharacters)
                error = "Le mot de passe doit être d'au moins 6 caractères";
            else if(!includeAllCharacterType)
                error = "Le mot de passe doit inclure des caractères minuscules, majuscules, et des digits";

            if(error != null)
                this.errorMessage.set(error);
            else{
                this.errorMessage.set(null);
                let response2 = await API_Util.post<Session, unknown>("/session", body);
                let response3 = await API_Util.post<PartialSession, AuthResponse>("/auth", partialBody);

                if(!response2.hasFailed && !response3.hasFailed && response3.data){
                    this.errorMessage.set(null);
                    this.isConnected.set(true);
                    this.isAdmin.set(response3.data.isAdmin);
                    this.save();
                    let connectionStatus = new ConnectionStatus(body.session, response3.data.isAdmin);
                    API_Util.setToken(response3.data.token);
                    SessionTrackerUtil.startTracking(response3.data.sessionId);
                    this.connection.emit(connectionStatus);
                }
            }
        }
    }


 

}