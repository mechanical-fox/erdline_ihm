
import {signal, WritableSignal} from '@angular/core';


export class Util {

    static memory : Map<String, any> = new Map<String, any>();
    static timers : Map<String, WritableSignal<boolean>> = new Map<String, WritableSignal<boolean>>();
    static initialValues : Map<String, boolean> = new Map<String, boolean>();
    static endings : Map<String, Date> = new Map<String, Date>();

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

    /** Return a timer with the name associated. A timer is a signal than can be started to switch beetween 2 boolean values after a 
     * determined time. A timer must be created, and next started with the function startTimer. At creation, the timer has the Value
     * initialValue given as parameter.*/
    static createTimer(name : string, initialValue : boolean) : WritableSignal<boolean>{
        let timer = signal(initialValue);
        Util.timers.set(name, timer);
        Util.initialValues.set(name, initialValue);
        return timer;
    }

    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }

    /** Switch the timer with the name given, to the initialValue of the timer, so the value at creation. Wait during the time indicated, 
     * and then switch the timer to be different of the previous boolean value. You can start a timer many time, even if the timer isn't
     * finished. If a timer is started again and wasn't finished, the previous timer set will be ignored. */
    static async startTimer(timer_name : string, duration_ms : number) : Promise<void>{
        
        let timer = Util.timers.get(timer_name);
        let initialValue = Util.initialValues.get(timer_name);

        if(timer != undefined && initialValue != undefined){
            timer.set(initialValue);
            let now = new Date();
            let ending = new Date(now.valueOf() + duration_ms);
            Util.endings.set(timer_name, ending);
            await Util.sleep(duration_ms);
            let new_ending = Util.endings.get(timer_name);

            if(ending == new_ending)
                timer.set(!initialValue);
        }

    }

    


}