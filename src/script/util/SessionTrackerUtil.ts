import { SavingUtil } from "./SavingUtil";
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
     * This function has no effect if the function startTracking(sessionId), wasn't called before.
     * If called very often, this function will wait a little before calling the API. To prevent calling the API, 5 time by second.*/
    static async notifyBackgroundChange(){
        let id = SessionTrackerUtil.sessionId;
        let inProgressValue = SessionTrackerUtil.inProgress.get("background");

        if(id && (inProgressValue == undefined || !inProgressValue)){
            await SessionTrackerUtil.sleepingNotification("background");
            let json_backgrounds = SavingUtil.getJsonBackgrounds();

            if(json_backgrounds){
                let body = new SessionPatchBody(json_backgrounds, null, null);
                await API_Util.patch<SessionPatchBody, unknown>(`/session/${id}`, body);
            }
            
            SessionTrackerUtil.freeLockNotification("background");
        }
    }

    /** Call the API, to change the characters saved in database by the characters actually present in the graphic interface.
     * This function has no effect if the function startTracking(sessionId), wasn't called before.
     * If called very often, this function will wait a little before calling the API. To prevent calling the API, 5 time by second.*/
    static async notifyCharacterChange(){
        let id = SessionTrackerUtil.sessionId;
        let inProgressValue = SessionTrackerUtil.inProgress.get("characters");

        if(id && (inProgressValue == undefined || !inProgressValue)){
            await SessionTrackerUtil.sleepingNotification("characters");
            let json_characters = SavingUtil.getJsonCharacters();

            if(json_characters){
                let body = new SessionPatchBody(null, json_characters, null);
                await API_Util.patch<SessionPatchBody, unknown>(`/session/${id}`, body);
            }
            
            SessionTrackerUtil.freeLockNotification("characters");
        }
    }

    /** Call the API, to change the scenes saved in database by the scenes actually present in the graphic interface.
     * This function has no effect if the function startTracking(sessionId), wasn't called before.
     * If called very often, this function will wait a little before calling the API. To prevent calling the API, 5 time by second.*/
    static async notifySceneChange(){
        let id = SessionTrackerUtil.sessionId;
        let inProgressValue = SessionTrackerUtil.inProgress.get("scenes");

        if(id && (inProgressValue == undefined || !inProgressValue)){
            await SessionTrackerUtil.sleepingNotification("scenes");
            let json_scenes = SavingUtil.getJsonScenes();

            if(json_scenes){
                let body = new SessionPatchBody(null, null, json_scenes);
                await API_Util.patch<SessionPatchBody, unknown>(`/session/${id}`, body);
            }
            
            SessionTrackerUtil.freeLockNotification("scenes");
        }
    }


    /** Place a lock to indicate that the notification is in progress. And if the last notification was send there is a 
     * short time, will sleep a little. This function must be used with await. This function is private, and musn't be 
     * used outside the class SessionTrackerUtil.*/
    private static async sleepingNotification(notificationName : string) : Promise<void>{
        SessionTrackerUtil.inProgress.set(notificationName, true);
        let lastCalledValue = SessionTrackerUtil.lastCalled.get(notificationName);

        let now = new Date();
        let timeSinceEpoch = now.valueOf();
        let interval = 60000 / this.MAX_CALL_BY_MINUTE;
                
        if(lastCalledValue){
            let allowedCalled = timeSinceEpoch + interval;
            let waitingTime = allowedCalled - timeSinceEpoch;

            if(waitingTime > 0)
                await Util.sleep(waitingTime);
        }
    }

    /** Retrieve the lock indicating than a notification is in progress, and update the last time the notification
     * was performed. This function is private, and musn't be used outside the class SessionTrackerUtil.*/
    private static freeLockNotification(notificationName : string){
        let now = new Date();
        let timeSinceEpoch = now.valueOf();
        SessionTrackerUtil.lastCalled.set(notificationName, timeSinceEpoch);
        SessionTrackerUtil.inProgress.set(notificationName, false);
    }
}