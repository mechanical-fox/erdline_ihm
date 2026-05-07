import { Component} from '@angular/core';
import { Util } from '../../util/Util';


@Component({
    selector: 'Game',
    templateUrl: '../../../html/edition_menu/game.html',
})
export class GameComponent {

    static MAX_CHARACTER_BY_LINE = 85;
    static LINE_HEIGHT = 20;
    static LINE_FONT = "18px serif";

    constructor(){

    }

    /** A lifecycle happening after the content has been initialized. For this component, the goal is to 
     * initiate the first image of the canvas. */
    async ngAfterContentInit(){
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let firstGradient = "rgb(21, 59, 226)";
        let secondGradient = "rgb(44, 141, 206)";
        let heightCharacter = 420;
        let widthCharacter = 330;

        if(canvas != null){
            let ctx = canvas.getContext('2d');

            if(ctx != null){
                let promiseImage1 : Promise<HTMLVideoElement | null> = this.getSpriteData('images/Grace.png');
                let promiseImage2 : Promise<HTMLVideoElement | null> = this.getSpriteData('images/Adrien.png');
                let image1 = await promiseImage1;
                let image2 = await promiseImage2;

                /** How to render a background */
                let gradient = ctx.createLinearGradient(0,0,0,450);
                gradient.addColorStop(0, firstGradient);
                gradient.addColorStop(1, secondGradient);
                ctx.fillStyle = gradient;
                ctx.roundRect(0,0,800,450,[15,15,15,15]);
                ctx.fill();

                if(image1 && image2){
                    this.drawSprite(image1, widthCharacter, heightCharacter, false);
                    this.drawSprite(image2, widthCharacter, heightCharacter, true);
                }
                
                let message = "Grace et moi marchons en silence, pendant une quinzaine de minutes, jusqu'a rejoindre les autres" +
                " agents de sécurité. Ceux-ci forment une équipe assez diverse, avec juste en commun un petit blouson, et un insigne"
                + " en forme de croissant de lune. Il s'agit sans doute de leur uniforme, pour être identifiés.";
                this.drawText(message);
            }
        }
    }


    /** Draw in canvas, the message given. If too many lines are visibles to be displayed, the last lines won't be displayed.*/
    drawText(message : string){
        let lines : string[] = GameComponent.cutInLines(message, GameComponent.MAX_CHARACTER_BY_LINE);
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;

        console.log(`lines vaut ${JSON.stringify(lines, null,4)}`);

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
                ctx.font = GameComponent.LINE_FONT;
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

    /** For a source, return the data of the image asked in the form of a HTMLVideoElement. Returns null if an error is 
    * encounter. You need to use await, to retrieve the data.*/
    async getSpriteData(source : string) : Promise<HTMLVideoElement | null>{
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let data : HTMLVideoElement | null = null;

        if(canvas){
            let ctx = canvas.getContext('2d');

            if(ctx){
                let image = new Image(); 
                let imageLoaded : boolean = false;
                image.src = source;

                // This function is called when the image is loaded
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