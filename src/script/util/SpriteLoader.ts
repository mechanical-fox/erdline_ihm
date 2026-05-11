
import { GameFirstSprites } from "../data/game/GameFirstSprites";
import { GameMessage } from "../data/game/GameMessage";
import { GameSprite } from "../data/game/GameSprite";
import { Util } from "./Util";

export class SpriteLoader{

    private static BATCH_SIZE = 3;
    private static SLEEP_TIME_BEETWEEN_BATCH = 200;
    private static sprites : Map<string, HTMLVideoElement | null> = new Map<string, HTMLVideoElement>();


    /** Load the first two sprites needed, and return them. The sprites can be null, if by example the scene is composed
     * only of messages of type "narration". You need to use await, to retrieve the data.*/
    static async loadFirstSprites(messages : GameMessage[]) : Promise<GameFirstSprites>{
        
        let leftCharacter : string | null = null;
        let leftSource : string | null = null;
        let promiseLeftData : Promise<HTMLVideoElement | null> | null = null;
        let rightCharacter : string | null = null;
        let rightSource : string | null = null;
        let promiseRightData : Promise<HTMLVideoElement | null> | null = null;
        let leftSprite : GameSprite | null = null;
        let rightSprite : GameSprite | null = null;

        for(let i = 0; i < messages.length; i++){
            if(leftCharacter == null){
                if(messages[i].spriteFilename != null){
                    leftCharacter = messages[i].characterName;
                    leftSource = messages[i].spriteFilename as string;
                    promiseLeftData = SpriteLoader.loadSpriteData(leftSource);
                }
            }
            else{
                if(messages[i].spriteFilename != null && messages[i].characterName != leftCharacter){
                    rightCharacter = messages[i].characterName;
                    rightSource = messages[i].spriteFilename as string;
                    promiseRightData = SpriteLoader.loadSpriteData(rightSource);
                }
            }
        }

        if(promiseLeftData  && leftCharacter && leftSource){
            let leftData = await promiseLeftData;
            leftSprite = new GameSprite(leftCharacter, leftSource, leftData);
        }
        if(promiseRightData && rightCharacter && rightSource){
            let rightData = await promiseRightData;
            rightSprite = new GameSprite(rightCharacter, rightSource, rightData);
        }

        return new GameFirstSprites(leftSprite, rightSprite);
    }

    /** This function will begin to download all sprites needed, because they are referenced in the messages given into parameter. It's often
     * better to not use await, because you can call loadSpriteData, even if this function isn't finished. Like this function will not be
     * finished, if there is really a lot of sprites to download.*/
    static async initLoading(messages : GameMessage[]) : Promise<void>{

        let treated : string[] = [];
        let names : string[] = [];
        let promises : Promise<HTMLVideoElement | null>[] = [];

        for(let key of this.sprites.keys())
            treated.push(key);

        for(let i in messages){

            if(messages[i].spriteFilename){
                if(!treated.includes(messages[i].spriteFilename) && !names.includes(messages[i].spriteFilename)){
                    let promise = SpriteLoader.subLoadSpriteData(messages[i].spriteFilename);
                    names.push(messages[i].spriteFilename);
                    promises.push(promise);
                }
            }
            
            if(parseInt(i) == messages.length  - 1 || promises.length >= SpriteLoader.BATCH_SIZE){
                for(let u = 0; u < names.length;u++){
                    let value = await promises[u];
                    this.sprites.set(names[u], value);
                }

                names = [];
                promises = [];
                await Util.sleep(SpriteLoader.SLEEP_TIME_BEETWEEN_BATCH);
            }
        }
    }


    /** For a source, return the data of the image asked in the form of a HTMLVideoElement. Returns null if an error is 
    * encounter. You need to use await, to retrieve the data. This function use a cache, to be faster. */
    static async loadSpriteData(source : string) : Promise<HTMLVideoElement | null>{

        if(!source)
            return null;

        let keys = [];
        for(let key of this.sprites.keys())
            keys.push(key);

        if(keys.includes(source)){
            let response = this.sprites.get(source);

            if(!response)
                return null;
            else
                return response;
        }
        else{
            let response = await SpriteLoader.subLoadSpriteData(source);
            this.sprites.set(source, response);
            return response;
        }
    }



    /** For a source, return the data of the image asked in the form of a HTMLVideoElement. Returns null if an error is 
    * encounter. You need to use await, to retrieve the data. This function is private, because this function is slow,
    * the function doesn't use a cache.*/
    private static async subLoadSpriteData(source : string) : Promise<HTMLVideoElement | null>{
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let data : HTMLVideoElement | null = null;

        if(!source)
            return null;

        if(canvas){
            let ctx = canvas.getContext('2d');

            if(ctx){
                let image = new Image(); 
                let imageLoaded : boolean = false;
                image.src = source;

                image.onload = function() {
                    data = this as HTMLVideoElement;
                    imageLoaded = true;
                };

                while(!imageLoaded)
                    await Util.sleep(200);
                
                return data;
            }
        }
        
        return null;
    }

    
}