
import { Component, WritableSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Util} from '../util/Util';
import {Storage} from '../util/Storage';



@Component({
    selector: 'Scene',
    imports : [FormsModule],
    templateUrl: '../../html/scene.html',
    styleUrls: ['../../css/scene.css', '../../css/viewList.css']
})
export class SceneComponent {

    sceneName: WritableSignal<string>;
    scenes : WritableSignal<any>;
    storage : Storage;

    constructor(){

        this.sceneName = signal("");

        if(Util.getVariable("scenes") != null){
            this.scenes = signal(Util.getVariable("scenes"));
            this.storage = Util.getVariable("scenes-storage");
            this.flushAndSave();
        }
        else{
            this.scenes = signal([]);
            this.storage = new Storage();
            this.addScene();
        }
 
    }


    /** Update the informations on screen, with the information matching the item currently selected. After this the function will 
     * save the state of the component. This allow to quit the tab, return to the tab, and don't lost data beetween this actions.*/
    flushAndSave(){

        let selected = this.storage.selected();

        if(selected != null)
            this.sceneName.set(selected);

        Util.setVariable("scenes", this.scenes());
        Util.setVariable("scenes-storage", this.storage);
    }

    /** Add a new scene, with a generic name like #1, #2... And if the number of actual scene is 0, will select 
     * the new scene.*/
    addScene(){
        let scenesValue = this.scenes();
        let newName  = this.storage.add();

        scenesValue.push({
            "name" : newName,
            "color-id" : "radio-orange"
        });

        this.scenes.set(scenesValue);
        this.flushAndSave();
    }

    /** Select the scene with the name indicated */
    selectScene(name : string){

        this.storage.select(name);
        this.flushAndSave();
        
    }

    /** Update the name of the current scene.*/
    updateSceneName(event : any){
        let scenesValue = this.scenes();

        for(let background of scenesValue){
            if(background.name == this.storage.selected() && event.target.value.trim().length > 0){
                background.name = event.target.value;
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

        this.storage.deleteSelected();
        this.scenes.set(newScenesValue);
        this.flushAndSave();
    }

}