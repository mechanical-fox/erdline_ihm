import { Background } from "../data/edition/Background";
import { Character } from "../data/edition/Character";
import { Scene } from "../data/edition/Scene";
import { Util } from "./Util";
import { Storage } from "./Storage";

export class SavingUtil{

    
    /** For the current session, replace the backgrounds by the backgrounds given in parameter. The parameter must be a string, 
     * in json format, or null. If the parameter is null, it will erase all backgrounds.*/
    public static loadBackground(json_backgrounds : string | null | undefined){

        if(!json_backgrounds){
            Util.deleteVariable("backgrounds");
            Util.deleteVariable("backgrounds-storage");
            Util.deleteVariable("backgrounds-counter");
        }
        else{
            let backgrounds : Background[] = JSON.parse(json_backgrounds);
            let storage : Storage = new Storage;
            let counter : number = 1;

            for(let background of backgrounds){
                storage.addExisting(background.name);
                if(counter <= background.counter)
                    counter = background.counter + 1;
            }

            storage.counter = counter;
            Util.setVariable("backgrounds", backgrounds);
            Util.setVariable("backgrounds-storage", storage);
            Util.setVariable("backgrounds-counter", counter);
        }
        
    }

    /** For the current session, replace the backgrounds by the backgrounds given in parameter. The parameter must be a string, 
     * in json format.*/
    public static loadCharacters(json_characters : string | null | undefined){

        if(!json_characters){
            Util.deleteVariable("characters");
            Util.deleteVariable("characters-storage");
            Util.deleteVariable("characters-counter");
        }
        else{
            let characters : Character[] = JSON.parse(json_characters);
            let storage : Storage = new Storage;
            let counter : number = 1;

            for(let character of characters){
                storage.addExisting(character.name);
                if(counter <= character.counter)
                    counter = character.counter + 1;
            }

            storage.counter = counter;
            Util.setVariable("characters", characters);
            Util.setVariable("characters-storage", storage);
            Util.setVariable("characters-counter", counter);
        }
    }

    /** For the current session, replace the scenes by the scenes given in parameter. The parameter must be a string, 
     * in json format.*/
    public static loadScenes(json_scenes : string | null | undefined){

        if(!json_scenes){
            Util.deleteVariable("scenes");
            Util.deleteVariable("scenes-storage");
            Util.deleteVariable("scenes-counter");
        }
        else{
            let scenes : Scene[] = JSON.parse(json_scenes);
            let storage : Storage = new Storage;
            let counter : number = 1;

            for(let scene of scenes){
                storage.addExisting(scene.name);
                if(counter <= scene.counter)
                    counter = scene.counter + 1;
            }

            storage.counter = counter;
            Util.setVariable("scenes", scenes);
            Util.setVariable("scenes-storage", storage);
            Util.setVariable("scenes-counter", counter);
        }
    }
    
    /** Return the actual backgrounds of the session in json format, or null if the backgrounds weren't configured */
    public static getJsonBackgrounds() : string | null{
        if(Util.getVariable("backgrounds") == null)
            return null;
        
        let backgrounds : Background[] = Util.getVariable("backgrounds");
        return JSON.stringify(backgrounds);
    }

    /** Return the actual characters of the session in json format, or null if the characters weren't configured */
    public static getJsonCharacters() : string | null{
        if(Util.getVariable("characters") == null)
            return null;
        
        let characters : Character[] = Util.getVariable("characters");
        return JSON.stringify(characters);
    }

    /** Return the actual scenes of the session in json format, or null if the scenes weren't configured */
    public static getJsonScenes() : string | null{
        if(Util.getVariable("scenes") == null)
            return null;
        
        let scenes : Scene[] = Util.getVariable("scenes");
        return JSON.stringify(scenes);
    }
}