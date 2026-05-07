import { Component} from '@angular/core';
import { Util } from '../../util/Util';


@Component({
    selector: 'Game',
    templateUrl: '../../../html/edition_menu/game.html',
})
export class GameComponent {


    constructor(){

    }

    /** A lifecycle happening after the content has been initialized.
     * For this component, the goal is to initiate the first image of the canvas. */
    async ngAfterContentInit(){
        let canvas : HTMLCanvasElement = document.getElementById('game_screen') as HTMLCanvasElement;
        let firstGradient = "rgb(21, 59, 226)";
        let secondGradient = "rgb(44, 141, 206)";
        let heightCharacter = 420;
        let widthCharacter = 330;

        if(canvas != null){
            let ctx = canvas.getContext('2d');

            if(ctx != null){
                /** How render a background */
                let gradient = ctx.createLinearGradient(0,0,0,450);
                gradient.addColorStop(0, firstGradient);
                gradient.addColorStop(1, secondGradient);
                ctx.fillStyle = gradient;
                ctx.roundRect(0,0,800,450,[15,15,15,15]);
                ctx.fill();

                let image = new Image(); 
                let firstImageLoaded : boolean = false;
                image.src = 'images/Grace.png';

                // Cette fonction est appelée lorsque l'image a été chargée
                image.onload = function() {
                    let xMax = canvas.width - widthCharacter;
                    let xMin = canvas.width / 2;
                    let x = (xMin + xMax) / 2;
                    ctx.drawImage(this as HTMLVideoElement, x, canvas.height - heightCharacter, widthCharacter, heightCharacter);
                    firstImageLoaded = true;
                };

                let image2 = new Image();
                let secondeImageLoaded : boolean = false;
                image2.src = 'images/Adrien.png';

                // Cette fonction est appelée lorsque l'image a été chargée
                image2.onload = function() {
                    let xMax = -1 * ((canvas.width / 2) - widthCharacter);
                    let xMin = 0;
                    let x = (xMin + xMax) / 2;
                    ctx.save();
                    ctx.scale(-1,1);
                    ctx.drawImage(this as HTMLVideoElement, x, canvas.height - heightCharacter, -1 * widthCharacter, heightCharacter);
                    ctx.restore();
                    secondeImageLoaded = true;
                };

                // We must draw the image, and only after that the text
                while(!firstImageLoaded || !secondeImageLoaded){
                    await Util.sleep(200);
                }

                let xDialogBox = 50;
                let yDialogBox = 320;
                let widthDialogBox = 700;
                let heightDialogBox = 110;
                ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
                ctx.lineWidth = 2;
                ctx.fillStyle = "rgba(170, 122, 226, 0.8)";
                ctx.fillRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);
                ctx.strokeRect(xDialogBox,yDialogBox,widthDialogBox,heightDialogBox);
                
            }
            
        }
        
    }

}