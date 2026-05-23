import { SavingComponent } from "../component/edition_menu/SavingComponent";
import { SessionPatchBody } from "../data/api/SessionPatchBody";
import { API_Util } from "./APIUtil";
import { Util } from "./Util";


export class SessionTrackerUtil{

    static MAX_CALL_BY_MINUTE : number = 60;
    static lastCalled : Map<string, number> = new Map<string, number>();
    static inProgress : Map<string, boolean> = new Map<string, boolean>();
    static sessionId : number | null = null;

    /** Start tracking, so start producing an effect when a function such as "notifyBackgroundChange()" is called */
    static startTracking(sessionId : number){
        SessionTrackerUtil.sessionId = sessionId;
    }

    /** Call the API, to change the backgrounds saved in database by the backgrounds actually present in the graphic interface.
     * If called very often, this function will wait a little before calling the API. To prevent calling the API, 5 time by second.*/
    static async notifyBackgroundChange(){
        
        if(SessionTrackerUtil.sessionId){

            let lastCalledValue = SessionTrackerUtil.lastCalled.get("background");
            let inProgressValue = SessionTrackerUtil.inProgress.get("background");

            if(inProgressValue == undefined || !inProgressValue){
                SessionTrackerUtil.inProgress.set("background", true);

                let now = new Date();
                let timeSinceEpoch = now.valueOf();
                let interval = 60000 / this.MAX_CALL_BY_MINUTE;
                
                if(lastCalledValue){
                    let allowedCalled = timeSinceEpoch + interval;
                    let waitingTime = allowedCalled - timeSinceEpoch;

                    if(waitingTime > 0)
                        await Util.sleep(waitingTime);
                }

                let json_backgrounds = SavingComponent.getJsonBackgrounds();

                if(json_backgrounds){
                    let id = SessionTrackerUtil.sessionId;
                    let body = new SessionPatchBody(json_backgrounds, null);
                    await API_Util.patch<SessionPatchBody, unknown>(`/session/${id}`, body);
                }

                let now2 = new Date();
                let timeSinceEpoch2 = now2.valueOf();
                SessionTrackerUtil.lastCalled.set("background", timeSinceEpoch2);
                SessionTrackerUtil.inProgress.set("background", false);
            }
        }
    }

    /** Call the API, to change the characters saved in database by the characters actually present in the graphic interface.
     * If called very often, this function will wait a little before calling the API. To prevent calling the API, 5 time by second.*/
    static async notifyCharacterChange(){
        
        if(SessionTrackerUtil.sessionId){

            let lastCalledValue = SessionTrackerUtil.lastCalled.get("character");
            let inProgressValue = SessionTrackerUtil.inProgress.get("character");

            if(inProgressValue == undefined || !inProgressValue){
                SessionTrackerUtil.inProgress.set("character", true);

                let now = new Date();
                let timeSinceEpoch = now.valueOf();
                let interval = 60000 / this.MAX_CALL_BY_MINUTE;
                
                if(lastCalledValue){
                    let allowedCalled = timeSinceEpoch + interval;
                    let waitingTime = allowedCalled - timeSinceEpoch;

                    if(waitingTime > 0)
                        await Util.sleep(waitingTime);
                }

                let json_characters = SavingComponent.getJsonCharacters();

                if(json_characters){
                    let id = SessionTrackerUtil.sessionId;
                    let body = new SessionPatchBody(null, json_characters);
                    await API_Util.patch<SessionPatchBody, unknown>(`/session/${id}`, body);
                }

                let now2 = new Date();
                let timeSinceEpoch2 = now2.valueOf();
                SessionTrackerUtil.lastCalled.set("character", timeSinceEpoch2);
                SessionTrackerUtil.inProgress.set("character", false);
            }
        }
    }
}