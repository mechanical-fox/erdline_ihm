
import {signal, WritableSignal} from '@angular/core';


export class Util {

    static memory : Map<String, any> = new Map<String, any>();
    static timers : Map<String, WritableSignal<boolean>> = new Map<String, WritableSignal<boolean>>();

    /** Return the value of the variable asked, or null if not initialized */
    static getVariable(name: string) : any{
        return this.memory.get(name);
    }

    /** Set the value for the variable given */
    static setVariable(name: string, value : any) : void{
        this.memory.set(name, value);
    }

    /** Delete the value for the variable given */
    static deleteVariable(name: string) : void{
        if(this.memory.get(name))
            this.memory.delete(name);
    }

    /** Return a timer with the name associated. A timer is a signal than has for value false when the
     * timer is created, and remain false during the duration given. After this duration the timer will be true. */
    static createTimer(name : string, duration_ms : number) : WritableSignal<boolean>{
        let timer = signal(false);
        Util.timers.set(name, timer);
        Util.programEndTimer(name, duration_ms);
        return timer;
    }

    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }

    /** Switch the timer with the name given to true, after the duration given */
    private static async programEndTimer(timer_name : string, duration_ms : number) : Promise<void>{
        
        await Util.sleep(duration_ms);
        Util.timers.get(timer_name)?.set(true);
    }

    


}