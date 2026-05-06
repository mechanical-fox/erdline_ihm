
import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../../util/Util';
import {Storage} from '../../util/Storage';
import { Message } from '../../data/ihm/Message';
import {Scene} from '../../data/ihm/Scene';
import { DisplayMessage } from '../../data/ihm/DisplayMessage';
import { MessageBoxComponent } from '../others/MessageBoxComponent';


@Component({
    selector: 'Scene',
    imports : [FormsModule, MessageBoxComponent],
    templateUrl: '../../../html/edition_menu/scene.html',
    styleUrls: ['../../../css/edition_menu/scene.css', '../../../css/others/viewList.css']
})
export class SceneComponent {

    backgroundSelected : WritableSignal<string>;
    sceneName: WritableSignal<string>;
    messagesIHM : WritableSignal<DisplayMessage[]>;
    scenes : WritableSignal<Scene[]>;
    messageToEdit : WritableSignal<number>;
    messageBoxFastLoad : WritableSignal<boolean>;
    newMessagesAllowed : WritableSignal<boolean>;
    characters : any[];
    backgrounds : any[];
    storage : Storage;
    counter : number;

    constructor(){
        
        this.messageToEdit = signal(-1);
        this.characters = this.getCharacters();
        this.backgrounds = Util.getVariable("backgrounds");
        this.backgroundSelected = signal("empty");
        this.messagesIHM = signal([]);
        this.sceneName = signal("");
        this.messageBoxFastLoad = signal(false);
        this.newMessagesAllowed = signal(true);

        if(Util.getVariable("scenes") != null){
            this.scenes = signal(Util.getVariable("scenes"));
            this.storage = Util.getVariable("scenes-storage");
            this.counter = Util.getVariable("scenes-counter");
            this.flushAndSave();
        }
        else{
            this.scenes = signal([]);
            this.counter = 1;
            this.storage = new Storage();
            this.addScene();
        }
 
    }

    /** Save the informations related to the background selected, in case the user change the tab currently selected.*/
    backgroundChanged(event : any){
        let scenesValue = this.scenes();

        for(let scene of scenesValue){
            if(scene.name == this.storage.selected())
                scene.backgroundId = event.target.value;
        }

        this.scenes.set(scenesValue);
        this.flushAndSave();
    }

    /** Update the messages, sceneName, backgroundName displayed on screen, with the informations stored in the attribute this.scenes.
     *  Update the screen, to let appear the box to add a new message, only if the scene isn't finished.
     * A scene is finished, when a message of type transition appear, because you can't continuous to play a scene, if
     * you have jumped to an other scene. After this the function will save the state of the component. Save the state of the composant
     * allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();
        let sceneValue = this.scenes();

        if(selected != null){
            for(let scene of sceneValue){
                if(scene.name == selected){
                    this.backgroundSelected.set(scene.backgroundId);
                    this.sceneName.set(scene.name);
                    this.messagesIHM.set(this.convertMessage(scene.messages));

                    if(scene.messages.length == 0)
                        this.newMessagesAllowed.set(true);
                    else if(scene.messages[scene.messages.length - 1].characterId == "transition")
                        this.newMessagesAllowed.set(false);
                    else
                        this.newMessagesAllowed.set(true);
                }
            }

            this.sceneName.set(selected);
        }
            
        this.messageBoxFastLoad.set(false);
        Util.setVariable("scenes", this.scenes());
        Util.setVariable("scenes-storage", this.storage);
        Util.setVariable("scenes-counter", this.counter);
    }

    /** Add a new scene, with a generic name like #1, #2... And if the number of actual scene is 0, will select 
     * the new scene.*/
    addScene(){
        let scenesValue = this.scenes();
        let newName  = this.storage.add();
        let newId = `scene-${this.counter}`;
        this.counter++;
        let newScene = new Scene(newId, newName, "empty");

        scenesValue.push(newScene);

        this.scenes.set(scenesValue);
        this.flushAndSave();

        if(this.messageToEdit() == -1)
            this.refreshMessageBox(false);
    }

    /** Select the scene with the name indicated */
    async selectScene(name : string){

        this.storage.select(name);
        this.flushAndSave();
        this.refreshMessageBox(true);
    }

    /** Force to recreate the composant messageBox. There is two goal. First, if precised the content of the messageBox is erased.
     * Second, the new messageBox will have the available scenes refreshed for the messages of type transition. */
    async refreshMessageBox(resetContent : boolean){

        this.messageBoxFastLoad.set(!resetContent);
        this.messageToEdit.set(999);
        await Util.sleep(100);
        this.messageToEdit.set(-1);
        
    }


    /** Update the name of the current scene.*/
    updateSceneName(event : any){
        let scenesValue = this.scenes();

        for(let scene of scenesValue){
            if(scene.name == this.storage.selected() && event.target.value.trim().length > 0){
                scene.name = event.target.value;
                this.scenes.set(scenesValue);
                this.storage.updateSelected(event.target.value);
            }
        }

        this.flushAndSave();
    }

    /** Delete the current scene, and switch the scene selected. If the user happen to delete all the scenes,
     * the scene selected will be null.*/
    deleteCurrentScene(){

        let newScenesValue = [];

        for(let item of this.scenes()){
            if(item.name != this.storage.selected())
                newScenesValue.push(item);
        }

        this.scenes.set(newScenesValue);
        this.storage.deleteSelected();

        if(this.storage.selected() != null)

        this.flushAndSave();
        this.refreshMessageBox(true);
    }

    /** Return the list of all the characters, and their expressions. If a character have an expression where the name is "",
     * or if the expression has no sprite, the expression isn't included. If a character has no expression, the character isn't
     * included. */
    getCharacters() : any[]{
        let characters = Util.getVariable("characters");
        let result = [];

        if(characters == null)
            return [];
        
        for(let character of characters){
            let added : any = {
                id : character.id,
                name : character.name,
                expressions : []
            };

            for(let expression of character.expressions){
                if(expression.name.trim() != "" && expression["sprite-id"] != null)
                    added.expressions.push(expression);
            }

            if(added.expressions.length > 0 && added.name.trim() != "")
                result.push(added);
        }

        return result;
    }




    /** Add the message given as parameter into the scene.*/
    addMessage(message : any){

        let scenesValue = this.scenes();

        for(let scene of scenesValue){
            if(scene.name == this.storage.selected())
                scene.messages.push(message);
        }

        this.scenes.set(scenesValue);
        this.flushAndSave();
        
    }

    /** Open the edition box, for the message with the position given. The first message is at position 0, the second message
     * is at position 0...*/
    openEditionBox(position : number){
        this.messageBoxFastLoad.set(false);
        this.messageToEdit.set(position);
    }

    /** Change the message currently in edition mode, by the message given */
    editCurrentMessage(message : Message){

        let scenesValue = this.scenes();
        let ind = this.messageToEdit();

        if(ind != null){
            for(let scene of scenesValue){
                if(scene.name == this.storage.selected()){
                    scene.messages[ind] = message;
                    this.flushAndSave();
                    this.messageBoxFastLoad.set(false);
                    this.messageToEdit.set(-1);
                }
            }
        }
        
    }

    /** Delete the message currently in edition mode */
    deleteCurrentMessage(){

        let scenesValue = this.scenes();
        let ind = this.messageToEdit();

        if(ind != null){
            for(let scene of scenesValue){
                if(scene.name == this.storage.selected()){
                    let newValueMessage =  [];

                    for(let i in scene.messages){
                        if(parseInt(i) != ind)
                            newValueMessage.push(scene.messages[i]);
                    }

                    scene.messages = newValueMessage;
                    this.flushAndSave();
                    this.messageBoxFastLoad.set(false);
                    this.messageToEdit.set(-1);
                }
            }
        }
    }

    /** Convert a list of Message, in a list of DisplayMessage. Will convert the identifiers of the character, in the actual
     * names characters by example. It's necessary to retain the identifier of each character, because the name of the character
     * could be changed. And it must be managed in a non-connected way. Because a client has no obligation to be connected to
     * a session, to use the website. */
    convertMessage(messages : Message[]) : DisplayMessage[]{
        let displayMessages : DisplayMessage[] = [];
        let messageLeft : boolean = true;
        let position = 0;

        for(let message of messages){

            let character : string | null = null;
            let expression : string | null = null

            if(message.characterId != "narration"){
                for(let c of this.characters){
                    if(message.characterId == c.id){
                        for(let e of c.expressions){
                            if(message.expressionId == e.id){
                                character = c.name;
                                expression = e.name; 
                            }
                        }
                    }
                }
            }

            let style = messageLeft ? "scene-message-background-left" : "scene-message-background-right";
            messageLeft = !messageLeft;
            let isTransition = (message.characterId == "transition");
            let text = message.text;

            if(isTransition){
                for(let scene of this.scenes()){
                    console.log(`scene.id : ${scene.id}, message.nextSceneId : ${message.nextSceneId}, égalité: ${scene.id == message.nextSceneId}`);
                    if(scene.id == message.nextSceneId)
                        text = `Transition vers ${scene.name}`;
                }
            }

            let displayMessage = new DisplayMessage(position, style, character, expression, text, isTransition);
            position++;
            displayMessages.push(displayMessage);
        }

        return displayMessages;
    }

}