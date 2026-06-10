import { Component, WritableSignal, signal, input, Signal, InputSignal} from '@angular/core';
import { Util } from '../../util/Util';
import { Scene } from '../../data/edition/Scene';
import { Message } from '../../data/edition/Message';
import { GameMessage } from '../../data/game/GameMessage';
import { Background } from '../../data/edition/Background';
import { GameBackground } from '../../data/game/GameBackground';
import { BackgroundComponent } from './BackgroundComponent';
import { CharacterComponent } from './CharacterComponent';
import { ColorIHM } from '../../data/edition/ColorIHM';
import { Character } from '../../data/edition/Character';
import { Sprite } from '../../data/api/Sprite';
import { GameSprite } from '../../data/game/GameSprite';
import { GameFirstSprites } from '../../data/game/GameFirstSprites';
import { SpriteLoader } from '../../util/SpriteLoader';
import { GameInformation } from '../../data/game/GameInformation';
import { Drawer } from '../../util/Drawer';
import { Provider } from '../../app/Provider';
import { Example } from '../../data/api/Example';
import { API_Response } from '../../data/util/API_Response';
import { API_Util } from '../../util/APIUtil';

@Component({
    selector: 'Game',
    templateUrl: '../../../html/edition_menu/game.html',
    styleUrl: '../../../css/edition_menu/game.css'
})
export class GameComponent {

    static TIME_BEFORE_LOADING_CIRCLE = 2000;
    messages : GameMessage[];
    gameBackground : GameBackground | null;
    leftSprite : GameSprite | null;
    rightSprite : GameSprite | null;
    messageNumber : number;
    loaded : WritableSignal<boolean>;
    loadedFromExample : WritableSignal<boolean>;
    slowLoading : WritableSignal<boolean>;
    drawer : Drawer;
    loadFromExample = input(false);
    example : Example | null;

    constructor(){
        this.messages = [];
        this.gameBackground = null;
        this.leftSprite = null;
        this.rightSprite = null;
        this.messageNumber = -1;
        this.loaded = signal(false);
        this.loadedFromExample = signal(false);
        this.slowLoading = Util.createTimer('slowLoading', false);
        Util.startTimer('slowLoading', GameComponent.TIME_BEFORE_LOADING_CIRCLE);
        this.drawer = new Drawer(800,450);//temporary drawer (Object canvas not accesible)
        this.example = null;
    }



    /** A lifecycle happening after the content has been initialized. For this component, the goal is to 
     * initiate the first image of the canvas. */
    async ngAfterContentInit(){

        let firstScene : Scene | null = await this.returnFirstScene();
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        if(canvas != null){
            this.drawer = new Drawer(canvas.width, canvas.height);
            let ctx = Provider.getContext(canvas, '2d');

            if(firstScene == null || firstScene.messages.length == 0){
                this.loaded.set(true);
                let message = "En attente de création d'une scène";
                this.drawer.drawUserMessage(message, ctx);
            }else{
                this.gameBackground = await this.getBackground(firstScene.backgroundId);
                this.messages = await this.convertMessage(firstScene.messages);
                this.messageNumber = 0;
                SpriteLoader.resetCache();
                let firstSprites : GameFirstSprites = await SpriteLoader.loadFirstSprites(this.messages);
                this.leftSprite = firstSprites.leftSprite;
                this.rightSprite = firstSprites.rightSprite;
                this.loaded.set(true);
                SpriteLoader.initLoading(this.messages);
                let informations : GameInformation = await this.CalculateSceneAt(this.leftSprite, this.rightSprite, 
                                                this.gameBackground, this.messages, 0);
                this.leftSprite = informations.leftSprite;
                this.rightSprite = informations.rightSprite;
                this.gameBackground = informations.gameBackground;
                this.messages = informations.messages;
                this.messageNumber = informations.messageNumber;

                this.drawer.drawSceneFrom(informations, ctx);
            }   
        }
    }

    /** A function used to resize the game screen */
    async onResize(event : any){
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        if(canvas != null){
            let ctx = Provider.getContext(canvas, '2d');
            this.drawer.resizeWidth(canvas.width, ctx);
        }
    }


    /** Go to the next message into the scene, and if necessary will change the background, or the sprites  */
    async nextMessage(){

        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        if(canvas != null){
            let ctx = Provider.getContext(canvas, '2d');

            if(this.messages.length == 0){
                let message = "En attente de création d'une scène";
                this.drawer.drawUserMessage(message, ctx);
            }
            else if (this.messageNumber >= this.messages.length - 1){
                let message = "Fin du jeu";
                this.drawer.drawUserMessage(message, ctx);       
            }
            else{
                this.messageNumber++;
                let informations : GameInformation = await this.CalculateSceneAt(this.leftSprite, this.rightSprite, 
                                                this.gameBackground, this.messages, this.messageNumber);
                this.leftSprite = informations.leftSprite;
                this.rightSprite = informations.rightSprite;
                this.gameBackground = informations.gameBackground;
                this.messages = informations.messages;
                this.messageNumber = informations.messageNumber;
                this.drawer.drawSceneFrom(informations, ctx);
                this.drawer.drawSceneFrom(informations, ctx);
            }
        }  
     
    }

    /** Return the name of the last character with a dialog, in the messages given. Will return null, if no character had dialogs. */
    getLastCharacterWithDialog(messages : GameMessage[]) : string | null{
        for(let i = messages.length - 1; i >= 0; i--){
            if(messages[i].characterName != "narration" && messages[i].characterName != "transition")
                return messages[i].characterName;
        }

        return null;
    }


    /** Return the new game informations, for the message number given. This will allow to update the informations on screen, and
     * in memory.*/
    async CalculateSceneAt(leftSprite : GameSprite | null, rightSprite : GameSprite | null, gameBackground : GameBackground | null, 
    messages : GameMessage[], messageNumber : number) : Promise<GameInformation>{

        if(messageNumber >= messages.length){
            let text = "Fin du jeu";
            return new GameInformation(leftSprite, rightSprite, gameBackground, messages, messageNumber, text, true, false, null, null);
        }
        else if(messages[messageNumber].characterName == "transition"){
            let nextSceneId = this.messages[messageNumber].nextSceneId;
            let scenes = await this.accessScenes();

            for(let scene of scenes){
                if(scene.id == nextSceneId){
                    let nextGameBackground : GameBackground = await this.getBackground(scene.backgroundId);
                    let nextMessages = await this.convertMessage(scene.messages);
                    let nextMessageNumber = 0;
                    let firstSprites : GameFirstSprites = await SpriteLoader.loadFirstSprites(this.messages);
                    let nextLeftSprite = firstSprites.leftSprite;
                    let nextRightSprite = firstSprites.rightSprite;

                    let informations = await this.CalculateSceneAt(nextLeftSprite,nextRightSprite, nextGameBackground, nextMessages, nextMessageNumber);
                    return informations;
                }
            }

            let text = "Fin du jeu";
            return new GameInformation(leftSprite, rightSprite, gameBackground, messages, messageNumber, text, true, false, null, null);
        }
        else if(messages[messageNumber].characterName == "narration"){
            let text = messages[messageNumber].text;
            return new GameInformation(leftSprite, rightSprite, gameBackground, messages, messageNumber, text, false, true, null, null);
        }
        else{
            let message : GameMessage = messages[messageNumber];
            let replaceLeftCharacter : boolean = false;
            let previousMessages = messages.slice(0, messageNumber);
            let lastCharacterWithDialog = this.getLastCharacterWithDialog(previousMessages);

            if(this.leftSprite?.character == message.characterName)
                replaceLeftCharacter = true;
            else if(this.rightSprite?.character == message.characterName)
                replaceLeftCharacter = false;
            else if(lastCharacterWithDialog == null || lastCharacterWithDialog == rightSprite?.character)
                replaceLeftCharacter = true;
            else
                replaceLeftCharacter = false;

            if(message.expressionName && message.dataBase64){
                let data = await SpriteLoader.loadSpriteData(message.characterName, message.expressionName, message.dataBase64);
                let sprite = new GameSprite(message.characterName, message.expressionName, data);
                let nextLeftSprite = leftSprite;
                let nextRightSprite = rightSprite;
                            
                if(replaceLeftCharacter)
                    nextLeftSprite = sprite;
                else
                    nextRightSprite = sprite;

                return new GameInformation(nextLeftSprite, nextRightSprite, gameBackground, messages, messageNumber, 
                    message.text, false, false, message.characterName, replaceLeftCharacter);
            }
            else{
                return new GameInformation(leftSprite, rightSprite, gameBackground, messages, messageNumber, 
                    message.text, false, false, message.characterName, replaceLeftCharacter);
            }
        }
    }




    /** Transform the messages, in GameMessage. The messages received by the GameComponent have id not resolved (characterId, 
     * expressionId), because it's necessary to impact the changes, if we change the name of a character by example. But...
     * here to play, we will resolve all the information, like search for the sprite for this character, and expression. We 
     * will keep only the informations necessary to play. And this informations, will be returned in the form of a GameMessage. */
    async convertMessage(messages : Message[]) : Promise<GameMessage[]>{
        let convertedMessages : GameMessage[] = [];
        let characters : Character[] = await this.accessCharacters();
        let sprites : Sprite[] = await CharacterComponent.listSprites();

        for(let message of messages){

            if(message.characterId == "narration"){
                let newConvertedMessage = new GameMessage("narration", null, null, message.text, null);
                convertedMessages.push(newConvertedMessage); 
            }
            else if(message.characterId == "transition"){
                let newConvertedMessage = new GameMessage("transition", null, null, "", message.nextSceneId);
                convertedMessages.push(newConvertedMessage); 
            }
            else{
                for(let character of characters){
                    if(character.id == message.characterId){
                        for(let expression of character.expressions){
                            if(expression.id == message.expressionId){
                                for(let sprite of sprites){
                                    if(sprite.id == expression.sprite_id){
                                        let newConvertedMessage = new GameMessage(character.name, expression.name, sprite.data, message.text, message.nextSceneId);
                                        convertedMessages.push(newConvertedMessage); 
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return convertedMessages;
    }


    /** Return the background matching the id. If no id is matching, like if the id is "empty", a default background 
     * will be returned. The keyword await must be used.*/
    async getBackground(backgroundId : string) : Promise<GameBackground>{
        let backgrounds : Background[] = await this.accessBackgrounds();
        let colors : ColorIHM[] = await BackgroundComponent.listColors();
        
        for(let background of backgrounds){
            if(background.id == backgroundId){
                for(let color of colors){
                    if(color.databaseID == background.color_id){
                        return new GameBackground(background.name, color.firstGradient, color.secondGradient);
                    }
                }
            }
        }

        return new GameBackground("defaultBackground", "rgb(21, 59, 226)", "rgb(44, 141, 206)");
    }


    /** Return the first scene of the story, or null if no scenes exist. The first scene will be determined, because there is no
     * transitions that goes to this scene. If many scenes respect this criteria, the older scene will be returned. If all scenes 
     * can be access by transition, the older scene will be returned. Also, the scenes that are empty of all dialogues, will not be 
     * taken into account. The keyword await must be used.*/
    async returnFirstScene() : Promise<Scene | null>{
        let scenes = await this.accessScenes();
        let mapSceneAccessibility : Map<string, boolean> = new Map<string, boolean>();
        let scenesWithMessage = [];

        for(let scene of scenes){
            if(scene.messages.length > 0)
                scenesWithMessage.push(scene);
        }

        for(let scene of scenesWithMessage){
            if(!mapSceneAccessibility.get(scene.id))
                mapSceneAccessibility.set(scene.id, false);

            let lastMessage : Message = scene.messages[scene.messages.length - 1];

            if(lastMessage.characterId == "transition" && lastMessage.nextSceneId)
                mapSceneAccessibility.set(lastMessage.nextSceneId, true);
        }

        let candidats : Scene[] = [];

        for(let key of mapSceneAccessibility.keys()){
            let accessible = mapSceneAccessibility.get(key);

            if(accessible == false){
                for(let scene of scenesWithMessage){
                    if(scene.id == key)
                        candidats.push(scene);
                }
            }
        }

        if(candidats.length == 0){
            if(scenes.length == 0)
                return null;
            else
                candidats = scenesWithMessage;
        }
            
        let olderScene : Scene = candidats[0];

        for(let i = 1; i < candidats.length;i++){
            if(candidats[i].createdAt < olderScene.createdAt)
                olderScene = candidats[i];
        }

        return olderScene;
    }

    /** Return the example of Visual Novel available by calling the API. This function is cached.
     * If the call to the API doesn't succeed, null is returned. The keyword await must be used.*/
    async accessExample() : Promise<Example | null>{
        if(this.loadedFromExample())
            return this.example;
        else{
            let response = await API_Util.get<Example>("/example");

            if(!response.hasFailed && response.data){
                this.loadedFromExample.set(true);
                this.example = response.data;
                return response.data;
            }
            else{
                this.loadedFromExample.set(true);
                this.example = null;
                return null;
            }
        }
    }

    /** Return the list of all the scenes. The scenes returned are different, depending if the html attribute
    * "loadFromExample" is set to false, or true. The keyword await must be used.*/
    async accessScenes() : Promise<Scene[]>{

        if(this.loadFromExample()){
            let example : Example | null = await this.accessExample();

            if(example == null || example.json_scenes == null)
                return [];
            else{
                let scenesInString : string = example.json_scenes;
                let scenes = JSON.parse(scenesInString);
                return scenes;
            }
        }
        else
            return Util.getVariable("scenes") ? Util.getVariable("scenes") : [];
    }

    /** Return the list of all the backgrounds. The backgrounds returned are different, depending if the html attribute
    * "loadFromExample" is set to false, or true. The keyword await must be used.*/
    async accessBackgrounds() : Promise<Background[]>{

        if(this.loadFromExample()){
            let example : Example | null = await this.accessExample();

            if(example == null || example.json_backgrounds == null)
                return [];
            else{
                let backgroundsInString : string = example.json_backgrounds;
                let backgrounds = JSON.parse(backgroundsInString);
                return backgrounds;
            }
        }
        else
            return Util.getVariable("backgrounds") ? Util.getVariable("backgrounds") : [];
    }

    /** Return the list of all the characters. The characters returned are different, depending if the html attribute
    * "loadFromExample" is set to false, or true. The keyword await must be used.*/
    async accessCharacters() : Promise<Character[]>{

        if(this.loadFromExample()){
            let example : Example | null = await this.accessExample();

            if(example == null || example.json_characters == null)
                return [];
            else{
                let charactersInString : string = example.json_characters;
                let characters = JSON.parse(charactersInString);
                return characters;
            }
        }
        else
            return Util.getVariable("characters") ? Util.getVariable("characters") : [];
    }


}