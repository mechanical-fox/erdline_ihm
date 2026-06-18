
import { Provider } from "../app/Provider";
import { Sprite } from "../data/api/Sprite";
import { GameFirstSprites } from "../data/game/GameFirstSprites";
import { GameMessage } from "../data/game/GameMessage";
import { GameSprite } from "../data/game/GameSprite";
import { Util } from "./Util";

export class SpriteLoader{

    private static BATCH_SIZE = 3;
    private static SLEEP_TIME_BEETWEEN_BATCH = 200;
    private static htmlElements : Map<string, HTMLVideoElement | null> = new Map<string, HTMLVideoElement>();


    /** A function used to reset all data previously registered in the cache. This function is to use each type 
     * images are changed, for a character, and an expression given. Because the cache depend of the name of the character,
     * and the name of the expression, to see if HtmlElement were already loaded.*/
    static async resetCache(){
        this.htmlElements = new Map<string, HTMLVideoElement>();
    }

    /** Load the first two sprites needed, and return them. The sprites can be null, if by example the scene is composed
     * only of messages of type "narration". You need to use await, to retrieve the data.*/
    static async loadFirstSprites(messages : GameMessage[]) : Promise<GameFirstSprites>{
        

        let leftCharacter : string | null = null;
        let leftExpression : string | null = null;
        let promiseLeftHtmlElement : Promise<HTMLVideoElement | null> | null = null;
        let rightCharacter : string | null = null;
        let rightExpression : string | null = null;
        let promiseRightHtmlElement : Promise<HTMLVideoElement | null> | null = null;
        let leftSprite : GameSprite | null = null;
        let rightSprite : GameSprite | null = null;


        for(let i = 0; i < messages.length; i++){
            if(leftCharacter == null){
                if(messages[i].dataBase64 && messages[i].expressionName){
                    leftCharacter = messages[i].characterName;
                    leftExpression = messages[i].expressionName as string;
                    promiseLeftHtmlElement = SpriteLoader.loadSpriteData(leftCharacter, leftExpression, messages[i].dataBase64 as string);
                }
            }
            else if(rightCharacter == null){
                if(messages[i].dataBase64 && messages[i].expressionName && messages[i].characterName != leftCharacter){
                    rightCharacter = messages[i].characterName;
                    rightExpression = messages[i].expressionName as string;
                    promiseRightHtmlElement = SpriteLoader.loadSpriteData(rightCharacter, rightExpression, messages[i].dataBase64 as string);
                }
            }
        }

        if(promiseLeftHtmlElement  && leftCharacter && leftExpression){
            let leftHtmlElement = await promiseLeftHtmlElement;
            leftSprite = new GameSprite(leftCharacter, leftExpression, leftHtmlElement);
        }
        if(promiseRightHtmlElement  && rightCharacter && rightExpression){
            let rightHtmlElement = await promiseRightHtmlElement;
            rightSprite = new GameSprite(rightCharacter, rightExpression, rightHtmlElement);
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

        for(let key of this.htmlElements.keys())
            treated.push(key);

        for(let i in messages){

            if(messages[i].dataBase64 && messages[i].expressionName){
                let key = `${messages[i].characterName}-${messages[i].expressionName}`;

                if(!treated.includes(key) && !names.includes(key)){
                    let promise = SpriteLoader.subLoadSpriteData(messages[i].dataBase64);
                    names.push(key);
                    promises.push(promise);
                }
            }
            
            if(parseInt(i) == messages.length  - 1 || promises.length >= SpriteLoader.BATCH_SIZE){
                for(let u = 0; u < names.length;u++){
                    let value = await promises[u];
                    this.htmlElements.set(names[u], value);
                }

                names = [];
                promises = [];
                await Util.sleep(SpriteLoader.SLEEP_TIME_BEETWEEN_BATCH);
            }
        }
    }


    /** For datas in base 64, return the HTML Element generated. Returns null if an error is encounter. You need to use await, to retrieve 
     * the data. This function use a cache, to be faster. */
    static async loadSpriteData(character : string, expression : string, dataBase64 : string) : Promise<HTMLVideoElement | null>{

        if(!character || !expression || !dataBase64)
            return null;

        let key = `${character}-${expression}`;

        let keys = [];
        for(let key of this.htmlElements.keys())
            keys.push(key);

        if(keys.includes(key)){
            let response = this.htmlElements.get(key);

            if(!response)
                return null;
            else
                return response;
        }
        else{
            let response = await SpriteLoader.subLoadSpriteData(dataBase64);
            this.htmlElements.set(key, response);
            return response;
        }
    }



    /** For datas in base 64, return the HTML Element generated. Returns null if an error is encounter. You need to use await, to 
     * retrieve the data. This function is private, because this function is slow, the function doesn't use a cache.*/
    private static async subLoadSpriteData(dataBase64 : string) : Promise<HTMLVideoElement | null>{
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let data : HTMLVideoElement | null = null;

        if(!dataBase64)
            return null;

        if(canvas){
            let ctx = Provider.getContext(canvas, '2d');

            if(ctx){
                let image = new Image(); 
                let imageLoaded : boolean = false;
                image.src = dataBase64;

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