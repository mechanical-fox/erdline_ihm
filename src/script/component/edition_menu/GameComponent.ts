import { Component} from '@angular/core';
import { Util } from '../../util/Util';
import { Scene } from '../../data/ihm/Scene';
import { Message } from '../../data/ihm/Message';
import { GameMessage } from '../../data/ihm/GameMessage';
import { Background } from '../../data/ihm/Background';
import { GameBackground } from '../../data/ihm/GameBackground';
import { BackgroundComponent } from './BackgroundComponent';
import { CharacterComponent } from './CharacterComponent';
import { Color } from '../../data/ihm/Color';
import { Character } from '../../data/ihm/Character';
import { Sprite } from '../../data/ihm/Sprite';
import { GameSprite } from '../../data/ihm/GameSprite';
import { GameFirstSprites } from '../../data/ihm/GameFirstSprites';
import { SpriteLoader } from '../../util/SpriteLoader';

@Component({
    selector: 'Game',
    templateUrl: '../../../html/edition_menu/game.html',
})
export class GameComponent {

    static MAX_CHARACTER_BY_LINE = 85;
    static LINE_HEIGHT = 20;
    static LINE_FONT = "18px serif";
    static CHARACTER_NAME_FONT = "bold 22px serif";
    static USER_MESSAGE_MAX_CHARACTER_BY_LINE = 40;
    static USER_MESSAGE_FONT = "bold 30px serif"
    static USER_MESSAGE_LINE_HEIGHT = 33;
    messages : GameMessage[];
    gameBackground : GameBackground | null;
    leftSprite : GameSprite | null;
    rightSprite : GameSprite | null;
    messageNumber : number;

    constructor(){
        this.messages = [];
        this.gameBackground = null;
        this.leftSprite = null;
        this.rightSprite = null;
        this.messageNumber = -1;
    }

    /** A lifecycle happening after the content has been initialized. For this component, the goal is to 
     * initiate the first image of the canvas. */
    async ngAfterContentInit(){

        let firstScene : Scene | null = this.returnFirstScene();

        if(firstScene == null || firstScene.messages.length == 0){
            let message = "En attente de création d'une scène";
            this.drawUserMessage(message);
        }else{
            this.gameBackground = this.getBackground(firstScene.backgroundId);
            this.messages = this.convertMessage(firstScene.messages);
            this.messageNumber = 0;
            let firstSprites : GameFirstSprites = await SpriteLoader.loadFirstSprites(this.messages);
            this.leftSprite = firstSprites.leftSprite;
            this.rightSprite = firstSprites.rightSprite;
            SpriteLoader.initLoading(this.messages);
            this.drawSceneAt(0);
        }   
    }



    /** Go to the next message into the scene, and if necessary will change the background, or the sprites  */
    async nextMessage(){

        if(this.messages.length == 0){
            let message = "En attente de création d'une scène";
            this.drawUserMessage(message);
        }
        else if (this.messageNumber >= this.messages.length - 1){
            let message = "Fin du jeu";
            this.drawUserMessage(message);       
        }
        else{
            this.messageNumber++;
            this.drawSceneAt(this.messageNumber);
        }
            
    }

    /** Draw the scene, for the message of indice given */
    async drawSceneAt( indMessage : number){

        if(indMessage >= this.messages.length){
            let message = "Fin du jeu";
            this.drawUserMessage(message);
        }
        else if(this.messages[indMessage].characterName == "transition"){
            let nextSceneId = this.messages[indMessage].nextSceneId;
            let scenes = Util.getVariable("scenes") ? Util.getVariable("scenes") : [];

            for(let scene of scenes){
                if(scene.id == nextSceneId){
                    this.gameBackground = this.getBackground(scene.backgroundId);
                    this.messages = this.convertMessage(scene.messages);
                    this.messageNumber = 0;
                    let firstSprites : GameFirstSprites = await SpriteLoader.loadFirstSprites(this.messages);
                    this.leftSprite = firstSprites.leftSprite;
                    this.rightSprite = firstSprites.rightSprite;
                    SpriteLoader.initLoading(this.messages);
                    this.drawSceneAt(0);
                }
            }
        }
        else{
            let message : GameMessage = this.messages[indMessage];
            let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
            let heightCharacter = 420;
            let widthCharacter = 330;
        
            let drawNameInLeft : boolean | null = null;
            let replaceLeftCharacter : boolean | null = null;
            let replaceRightCharacter : boolean | null = null;

            if(message.characterName != "narration" && message.characterName != "transition"){

                if(this.leftSprite?.character == message.characterName){
                    drawNameInLeft = true;
                    replaceLeftCharacter = true;
                    replaceRightCharacter = false;
                }
                else if(this.rightSprite?.character == message.characterName){
                    drawNameInLeft = false;
                    replaceLeftCharacter = false;
                    replaceRightCharacter = true;
                }
                else{
                    let lastCharacterWithDialogInLeft : boolean | null = null;

                    for(let i = indMessage - 1; i >= 0 && lastCharacterWithDialogInLeft == null; i--){
                        if(this.messages[i].characterName != "narration" && message.characterName != "transition"){
                            if(this.messages[i].characterName == this.leftSprite?.character){
                                lastCharacterWithDialogInLeft = true;
                                drawNameInLeft = false;
                                replaceLeftCharacter = false;
                                replaceRightCharacter = true;
                            }
                            else{
                                lastCharacterWithDialogInLeft = false;
                                drawNameInLeft = true;
                                replaceLeftCharacter = true;
                                replaceRightCharacter = false;
                            }  
                        }
                    }

                    // lastCharacterWithDialogInLeft will never be null, because if message isn't a narration / transition,
                    // the message must match the left sprite, or match the left sprite, or ... there was at least 2 messages before
                    // Reasons: The sprites at left, and at right,  are the sprites matching the first messages
                } 
            }
            else{
                drawNameInLeft = null;
                replaceLeftCharacter = false;
                replaceRightCharacter = false;
            }

            if(message.characterName != "narration" && message.characterName != "transition"){
                if(message.spriteFilename && (replaceLeftCharacter || replaceRightCharacter)){
                    let data = await SpriteLoader.loadSpriteData(message.spriteFilename);
                    let sprite = new GameSprite(message.characterName, message.spriteFilename, data);
                            
                    if(replaceLeftCharacter)
                        this.leftSprite = sprite;
                    if(replaceRightCharacter)
                        this.rightSprite = sprite;
                }
            }

            if(canvas != null){
                let ctx = canvas.getContext('2d');

                if(ctx != null && this.gameBackground){
                    let gradient = ctx.createLinearGradient(0,0,0,450);
                    gradient.addColorStop(0, this.gameBackground.firstGradient);
                    gradient.addColorStop(1, this.gameBackground.secondGradient);
                    ctx.fillStyle = gradient;
                    ctx.roundRect(0,0,800,450,[15,15,15,15]);
                    ctx.fill();

                    if(this.leftSprite && this.leftSprite.data)
                        this.drawSprite(this.leftSprite.data, widthCharacter, heightCharacter, true);
                    if(this.rightSprite && this.rightSprite.data)
                        this.drawSprite(this.rightSprite.data, widthCharacter, heightCharacter, false);

                    if(message.characterName == "narration")
                        this.drawText(message.text, true);
                    else{
                        if(drawNameInLeft != null && drawNameInLeft == true)
                            this.drawCharacterName(message.characterName, true);
                        else if(drawNameInLeft != null && drawNameInLeft == false)
                            this.drawCharacterName(message.characterName, false);

                        this.drawText(message.text, false);
                    }
                }
            }    
        }
    }


    /** Transform the messages, in GameMessage. The messages received by the GameComponent have id not resolved (characterId, 
     * expressionId), because it's necessary to impact the changes, if we change the name of a character by example. But...
     * here to play, we will resolve all the information, like search for the sprite for this character, and expression. We 
     * will keep only the informations necessary to play. And this informations, will be returned in the form of a GameMessage. */
    convertMessage(messages : Message[]) : GameMessage[]{
        let convertedMessages : GameMessage[] = [];
        let characters : Character[] = Util.getVariable("characters") ? Util.getVariable("characters") : [];
        let sprites : Sprite[] = CharacterComponent.listSprites();

        for(let message of messages){

            if(message.characterId == "narration"){
                let newConvertedMessage = new GameMessage(null, "narration", message.text, null);
                convertedMessages.push(newConvertedMessage); 
            }
            else if(message.characterId == "transition"){
                let newConvertedMessage = new GameMessage(null, "transition", "", message.nextSceneId);
                convertedMessages.push(newConvertedMessage); 
            }
            else{
                for(let character of characters){
                    if(character.id == message.characterId){
                        for(let expression of character.expressions){
                            if(expression.id == message.expressionId){
                                for(let sprite of sprites){
                                    if(sprite.id == expression.sprite_id){
                                        let newConvertedMessage = new GameMessage(sprite.image, character.name, message.text, message.nextSceneId);
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
     * will be returned. */
    getBackground(backgroundId : string) : GameBackground{
        let backgrounds : Background[] = Util.getVariable("backgrounds") ? Util.getVariable("backgrounds") : [];
        let colors : Color[] = BackgroundComponent.listColors();
        
        for(let background of backgrounds){
            if(background.id == backgroundId){
                for(let color of colors){
                    if(color.id == background.color_id){
                        return new GameBackground(background.name, color.firstGradient, color.secondGradient);
                    }
                }
            }
        }

        return new GameBackground("defaultBackground", "rgb(21, 59, 226)", "rgb(44, 141, 206)");
    }

    /** On the Game draw a message to the user, like by example "Game finished" */
    drawUserMessage(message : string){
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        
        if(canvas != null){
            let ctx = canvas.getContext('2d');

            if(ctx != null){
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.roundRect(0,0,800,450,[15,15,15,15]);
                ctx.fill();

                let lines = GameComponent.cutInLines(message, GameComponent.USER_MESSAGE_MAX_CHARACTER_BY_LINE);

                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = GameComponent.USER_MESSAGE_FONT;
                for(let i = 0; i < lines.length;i++){
                    let y = 220 + i * GameComponent.USER_MESSAGE_LINE_HEIGHT;
                    ctx.fillText(lines[i], 150, y);
                }
            }
        }
    }

    /** Return the first scene of the story, or null if no scenes exist. The first scene will be determined, because there is no
     * transitions that goes to this scene. If many scenes respect this criteria, the older scene will be returned. If all scenes 
     * can be access by transition, the older scene will be returned. Also, the scenes that are empty of all dialogues, will not be 
     * taken into account.*/
    returnFirstScene() : Scene | null{
        let scenes = Util.getVariable("scenes") ? Util.getVariable("scenes") : [];
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

    /** Will draw a character name above the texte box. The character name will be written at left, if drawLeft is true. Else
     * the character name will be drawned at right.*/
    drawCharacterName(characterName : string, drawLeft : boolean){

        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        if(canvas){
            let ctx = canvas.getContext('2d');
            if(ctx){
                let characterNameParsed = characterName.slice(0,1).toUpperCase();
                characterNameParsed += characterName.slice(1, characterName.length).toLowerCase();
                let numberCharacter = Math.max(5, characterName.length);
                let lowerCharacterWidth = 11;
                let margin = 15;
                let widthBox = numberCharacter * lowerCharacterWidth + 2 * margin;
                let heightBox = 40;
                let xBox = drawLeft ? 50 : 750 - widthBox;
                let yBox = 320 - heightBox;
                ctx.strokeStyle = "rgba(0, 0, 0, 1)";
                ctx.lineWidth = 2;
                ctx.fillStyle = "rgba(170, 122, 226, 1)";
                ctx.fillRect(xBox,yBox,widthBox,heightBox);
                ctx.strokeRect(xBox,yBox,widthBox,heightBox);
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.font =  GameComponent.CHARACTER_NAME_FONT;
                ctx.fillText(characterNameParsed, xBox + margin, 320 - heightBox + 25);
            }
        }

    }

    /** Draw in canvas, the message given. If too many lines are visibles to be displayed, the last lines won't be displayed.
     * If drawItalic is true, the text will be written in italic.*/
    drawText(message : string, drawItalic : boolean){
        let lines : string[] = GameComponent.cutInLines(message, GameComponent.MAX_CHARACTER_BY_LINE);
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        if(canvas){
            let ctx = canvas.getContext('2d');
            if(ctx){
                let xDialogBox = 50;
                let yDialogBox = 320;
                let widthDialogBox = 700;
                let heightDialogBox = 110;
                ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
                ctx.lineWidth = 2;
                ctx.fillStyle = "rgba(170, 122, 226, 0.8)";
                ctx.fillRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);
                ctx.strokeRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);


                ctx.fillStyle = "rgb(0,0,0)";
                ctx.font = drawItalic ?  "italic " + GameComponent.LINE_FONT : GameComponent.LINE_FONT;
                for(let i = 0; i < lines.length && i < 4;i++){
                    let y = 350 + i * GameComponent.LINE_HEIGHT;
                    ctx.fillText(lines[i], 90, y);
                }
            }
        }
    }

    /** Cut a message in a certain number of lines, and return the resulting array of strings. Each Line will have at most the number 
     * of character "maxCharacterByLine". A line is cutted if there is the character "\n", or if the maximum of character is 
     * reached. */
    private static cutInLines(message : string, maxCharacterByLine : number) : string[]{
        let result : string[] = [];
        let lines = message.split("\n");

        for(let line of lines){
            let words : string[] = [];
            let ind = 0;

            for(let i = 0; i < line.length; i++){
                if( i == line.length - 1 || (line[i] == ' ' && line[i + 1 ] != ' ' )){
                    let word = line.slice(ind, i + 1);
                    words.push(word);
                    ind = i + 1;
                }
            }

            let constructedLine : string = "";

            for(let i = 0; i < words.length; i++){
                if(constructedLine.length + words[i].length > maxCharacterByLine){
                    if(constructedLine.length == 0)
                        result.push(words[i].trim());
                    else{
                        result.push(constructedLine.trim());
                        constructedLine = words[i];
                    }
                }
                else
                    constructedLine = constructedLine + words[i];

                if(i == words.length - 1 && constructedLine.trim().length > 0)
                    result.push(constructedLine.trim());
                    
            }
        }

        return result;
    }

    /** Draw in screen the sprite given into parameter. If drawLeft is true, the sprite will be draw at the left of 
     * the screen, else it will be draw at the right of the screen.*/
    drawSprite(sprite : HTMLVideoElement, width : number, height : number, drawLeft : boolean) : void{
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let x = -1;

        if(drawLeft){
            let xMax = -1 * ((canvas.width / 2) - width);
            let xMin = 0;
            x = (xMin + xMax) / 2;
        }
        else{
            let xMax = canvas.width - width;
            let xMin = canvas.width / 2;
            x = (xMin + xMax) / 2;
        }

        if(canvas){
            let ctx = canvas.getContext('2d');

            if(ctx){
                
                if(drawLeft){
                    ctx.save();
                    ctx.scale(-1,1);
                    ctx.drawImage(sprite, x, canvas.height - height, -1 * width, height);
                    ctx.restore();
                }
                else
                    ctx.drawImage(sprite, x, canvas.height - height, width, height);

            }
        }
    }

}