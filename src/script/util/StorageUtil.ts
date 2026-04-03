
import { WritableSignal, Signal } from "@angular/core";
import {Storage} from "./Storage";


export class StorageUtil{


    private static storageMap : Map<string, Storage> = new Map<string, Storage>();

    /** Return the name given to the first item, if you have just created a new storage. So by default, a list of one item.
     * A new storage, is automaticaly created, when you ask for a storage for the first time. */
    public static getDefaultName() : string{
        return Storage.getDefaultName();
    }

    /** Return all the items for the storage with the name given. If the storage doesn't exist, a storage with just 
     * the item "#1" is created. This function returns a signal, so the result will update itself, if the storage is 
     * modified. A new storage, is automaticaly created, when you ask for a storage for the first time. */
    public static list(storageName : string) : Signal<string[]>{
        return StorageUtil.getStorage(storageName).items;
    }

    /** Return the item selected for the storage with the name given. This function returns a signal, so the result will 
     * update itself, if the storage is modified. */
    public static getSelected(storageName : string) : Signal<string | null>{
        return StorageUtil.getStorage(storageName).selected;
    }

    /** Create a new item, in the storage of name given, and returns the name of the new item created. The item is 
     * created with a generic name, like #1, #2 ...*/
    public static add(storageName: string) : string{
        let storage = StorageUtil.getStorage(storageName);
        let added= storage.add();
        return added;
    }

    /** Select the item, in the storage of name given. */
    public static select(storageName: string, item : string) : void{
        let storage = StorageUtil.getStorage(storageName);
        storage.select(item);
    }

    /** In the storage of name given, replace the name of the item currently selected, by the name given. */
    public static updateSelected(storageName : string, name : string){
        let storage = StorageUtil.getStorage(storageName);
        storage.updateSelected(name);
    }


    /** Delete the item currently selected, in the storage of name given. A new item adjacent to the previous item, 
     * will be selected. If the storage is now empty, the item selected will be set to null.*/
    public static deleteSelected(storageName: string) : void{
        let storage = StorageUtil.getStorage(storageName);
        storage.deleteSelected();
    }

    /** Return the storage with the name given. If the storage doesn't exist, a storage 
     * with just the item "#1" is created.*/
    private static getStorage(storageName: string) : Storage{
        let value = StorageUtil.storageMap.get(storageName);

        if(value == null){
            value = new Storage();
            StorageUtil.storageMap.set(storageName, value);
        }

        return value;
    }

}