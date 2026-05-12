import { GameInformation } from "../data/game/GameInformation";


export class Drawer{

    static MAX_CHARACTER_BY_LINE = 85;
    static USER_MESSAGE_MAX_CHARACTER_BY_LINE = 40;

    static LINE_HEIGHT_AT_800_WIDTH = 20;
    static LINE_FONT_SIZE_AT_800_WIDTH = 18;
    static USER_MESSAGE_FONT_SIZE_AT_800_WIDTH = 30;
    static USER_MESSAGE_LINE_HEIGHT_AT_800_WIDTH = 33;
    static CHARACTER_NAME_FONT_SIZE_AT_800_WIDTH = 22;

    initialWidth : number;
    initialHeight : number;
    actualWidth : number;
    actualHeight : number;
    displayingDialog : boolean;
    displayingUserMessage : boolean;
    lastDialog : GameInformation | null;
    lastUserMessage : string | null;

    constructor(width : number, height : number){
        this.initialWidth = width;
        this.initialHeight = height;
        this.actualWidth = width;
        this.actualHeight = height;
        this.displayingDialog = false;
        this.displayingUserMessage = false;
        this.lastDialog = null;
        this.lastUserMessage = null;
    }

    /** Change the size used by the Drawer to draw the scene, and redraw immediatly the scene*/
    resizeWidth(width : number, context : CanvasRenderingContext2D){
        this.actualWidth = width;
        this.actualHeight = Math.round(this.initialHeight * width / this.initialWidth);

        if(this.displayingDialog && this.lastDialog)
            this.drawSceneFrom(this.lastDialog, context);
        else if(this.displayingUserMessage && this.lastUserMessage)
            this.drawUserMessage(this.lastUserMessage, context);
    }

    /** Draw in context, a scene with the informations provided */
    async drawSceneFrom(informations : GameInformation, context : CanvasRenderingContext2D){

        this.lastDialog = informations;
        this.displayingDialog = true;
        this.displayingUserMessage = false;
        let heightCharacter = Math.round(420 * this.actualWidth / 800);
        let widthCharacter = Math.round(330 * this.actualWidth / 800);
        let radius = Math.round(15 * this.actualWidth / 800);

        if(informations.isUserMessage)
            this.drawUserMessage(informations.text, context);

        if(informations.gameBackground){
            let gradient = context.createLinearGradient(0,0,0,450);
            gradient.addColorStop(0, informations.gameBackground.firstGradient);
            gradient.addColorStop(1, informations.gameBackground.secondGradient);
            context.fillStyle = gradient;
            context.roundRect(0,0,this.actualWidth,this.actualHeight,[radius,radius,radius,radius]);
            context.fill();

            if(informations.leftSprite && informations.leftSprite.data)
                this.drawSprite(informations.leftSprite.data, widthCharacter, heightCharacter, true, context);
            if(informations.rightSprite && informations.rightSprite.data)
                this.drawSprite(informations.rightSprite.data, widthCharacter, heightCharacter, false, context);

            this.drawText(informations.text, informations.isNarration, context);

            if(informations.drawNameInLeft != null && informations.drawNameInLeft == true && informations.characterName)
                this.drawCharacterName(informations.characterName, true, context);
            else if(informations.drawNameInLeft != null && informations.drawNameInLeft == false && informations.characterName)
                this.drawCharacterName(informations.characterName, false, context);
        }
    }

    /** Draw in context a character name above the texte box. The character name will be written at left, if drawLeft is true. Else
     * the character name will be drawned at right.*/
    drawCharacterName(characterName : string, drawLeft : boolean, context : CanvasRenderingContext2D){

        let characterNameParsed = characterName.slice(0,1).toUpperCase();
        characterNameParsed += characterName.slice(1, characterName.length).toLowerCase();

        let numberCharacter = Math.max(5, characterName.length);
        let lowerCharacterWidth = 11 * this.actualWidth / 800;

        let margin = Math.round(15 * this.actualWidth / 800);
        let widthBox = Math.round(numberCharacter * lowerCharacterWidth + 2 * margin);
        let heightBox = Math.round(40 * this.actualWidth / 800);

        let xDialogBox = Math.round(this.actualWidth / 16);
        let widthDialogBox = Math.round(0.87 * this.actualWidth);
        let yDialogBox = Math.round(0.7 * this.actualHeight);

        let xBox = drawLeft ? xDialogBox : xDialogBox + widthDialogBox - widthBox;
        let yBox = yDialogBox - heightBox;

        let font_size = Math.round(Drawer.CHARACTER_NAME_FONT_SIZE_AT_800_WIDTH * this.actualWidth / 800);

        context.strokeStyle = "rgba(0, 0, 0, 1)";
        context.lineWidth = 2;
        context.fillStyle = "rgba(170, 122, 226, 1)";
        context.fillRect(xBox,yBox,widthBox,heightBox);
        context.strokeRect(xBox,yBox,widthBox,heightBox);
        context.fillStyle = "rgb(0,0,0)";
        context.font =  `bold ${font_size}px serif`;
        context.fillText(characterNameParsed, xBox + margin, 320 - heightBox + 25);

    }

    /** Draw in context the message to the user, like by example "Game finished" */
    drawUserMessage(message : string, context : CanvasRenderingContext2D){
        
        this.lastUserMessage = message;
        this.displayingDialog = false;
        this.displayingUserMessage = true;

        context.fillStyle = "rgb(0,0,0)";
        context.roundRect(0,0,800,450,[15,15,15,15]);
        context.fill();

        let lines = Drawer.cutInLines(message, Drawer.USER_MESSAGE_MAX_CHARACTER_BY_LINE);
        let yBegin = Math.round(220 * this.actualWidth / 800);
        let font_size = Math.round(Drawer.USER_MESSAGE_FONT_SIZE_AT_800_WIDTH * this.actualWidth / 800);
        let line_height = Math.round(Drawer.USER_MESSAGE_LINE_HEIGHT_AT_800_WIDTH * this.actualWidth / 800);

        context.fillStyle = "rgb(255,255,255)";
        context.font = `bold ${font_size}px serif`;
        for(let i = 0; i < lines.length;i++){
            let y = yBegin + i * line_height;
            context.fillText(lines[i], 150, y);
        }
        
    }

    /** Draw in context, the message given. If too many lines are visibles to be displayed, the last lines won't be displayed.
     * If drawItalic is true, the text will be written in italic.*/
    drawText(message : string, drawItalic : boolean, context : CanvasRenderingContext2D){
        let lines : string[] = Drawer.cutInLines(message, Drawer.MAX_CHARACTER_BY_LINE);

        let xDialogBox = Math.round(this.actualWidth / 16);
        let textLeftMargin = Math.round(this.actualWidth / 20);
        let textTopMargin = Math.round(this.actualHeight / 15);
        let yDialogBox = Math.round(0.7 * this.actualHeight);
        let widthDialogBox = Math.round(0.87 * this.actualWidth);
        let heightDialogBox = Math.round(0.22 * this.actualHeight);
        let line_height = Math.round(Drawer.LINE_HEIGHT_AT_800_WIDTH * this.actualWidth / 800);
        let line_font_size = Math.round(Drawer.LINE_FONT_SIZE_AT_800_WIDTH * this.actualWidth / 800);
        context.strokeStyle = "rgba(0, 0, 0, 0.8)";
        context.lineWidth = 2;
        context.fillStyle = "rgba(170, 122, 226, 0.8)";
        context.fillRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);
        context.strokeRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);

        context.fillStyle = "rgb(0,0,0)";
        context.font = drawItalic ?  `italic ${line_font_size}px serif` : `${line_font_size}px serif`;
        for(let i = 0; i < lines.length && i < 4;i++){
            let x = xDialogBox + textLeftMargin;
            let y = yDialogBox + textTopMargin + i * line_height;
            context.fillText(lines[i], x, y);
        }  
    }



    /** Draw in context the sprite given into parameter. If drawLeft is true, the sprite will be draw at the left of 
     * the screen, else it will be draw at the right of the screen.*/
    drawSprite(sprite : HTMLVideoElement, imageWidth : number, imageHeight : number, drawLeft : boolean, context : CanvasRenderingContext2D) : void{
        let x = -1;

        if(drawLeft){
            let xMax = -1 * ((this.actualWidth / 2) - imageWidth);
            let xMin = 0;
            x = (xMin + xMax) / 2;
        }
        else{
            let xMax = this.actualWidth - imageWidth;
            let xMin = this.actualWidth / 2;
            x = (xMin + xMax) / 2;
        }

        if(drawLeft){
            context.save();
            context.scale(-1,1);
            context.drawImage(sprite, x, this.actualHeight - imageHeight, -1 * imageWidth, imageHeight);
            context.restore();
        }
        else
            context.drawImage(sprite, x, this.actualHeight - imageHeight, imageWidth, imageHeight);
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
        
}