
import {WritableSignal, signal} from "@angular/core";

export class Storage{

    counter : number;
    selected : WritableSignal<string | null>;
    items : WritableSignal<string[]>;

    constructor(){
        this.counter = 1;
        this.selected = signal(null);
        this.items = signal([])
    }

    /** Create a new item in the storage, and returns the name of the new item created. If the storage was empty, the new 
     * item is selected. Else, the previous item selected remains selected. */
    add() : string{
        let name = `#${this.counter}`;
        this.counter++;
        let value = this.items();
        value.push(name);
        this.items.set(value);

        if(this.selected() == null)
            this.selected.set(name);

        return name;
    }

    /** Select the item given in the storage*/
    select(name: string) : void{
        this.selected.set(name);
    }

    /** Replace the name of the item currently selected, by the name given. */
    updateSelected(name: string ) : void{

        let itemsValue = this.items();

        for(let i in itemsValue){
            if(itemsValue[i] == this.selected()){
                itemsValue[i] = name;
                this.items.set(itemsValue);
                this.selected.set(name);
            } 
        }
    }

    /** Delete the item currently selected from the storage. A new item adjacent to the previous item, will 
     * be selected. If the storage is now empty, the item selected will be set to null. */
    deleteSelected() : void{

        let oldItems = this.items();
        let newItems = [];
        let newSelected = null;

        for(let i in oldItems){
            if(oldItems[i] == this.selected()){
                let ind = parseInt(i);

                if(ind + 1 < oldItems.length)
                    newSelected = oldItems[ind + 1];
                else if(ind - 1 >= 0)
                    newSelected = oldItems[ind - 1];
                else //if the last item was deleted
                    newSelected = null;
            }
            else
                newItems.push(oldItems[i]);
        }

        this.items.set(newItems);
        this.selected.set(newSelected);

    }
}