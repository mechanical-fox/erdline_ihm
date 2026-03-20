import { WritableSignal, signal } from "@angular/core";



export class Util {

    static endings : Map<String, Date> = new Map<String, Date>();
    static timers : Map<String, WritableSignal<boolean>> = new Map<String, WritableSignal<boolean>>();

    
    /** Return a timer with the name associated. A timer is a signal than has for value "true" when the
     * timer is started, and remain true during a certain duration. After this duration the timer will be false.
     * You can start a timer many times. */
    static createTimer(name : string) : WritableSignal<boolean>{
        let timer = signal(false);
        Util.timers.set(name, timer);
        return timer;
    }

    /** Switch the timer with the name given to true, during the duration specified. After this duration the timer
     * is switched to false. */
    static async startTimer(timer_name : string, duration_ms : number) : Promise<void>{
        Util.timers.get(timer_name)?.set(true);
        let now = new Date();
        let end = new Date(now.valueOf() + duration_ms);
        Util.endings.set(timer_name, end);
        
        await Util.sleep(duration_ms);
        let end_actualized = Util.endings.get(timer_name)?.valueOf();

        if( end_actualized && end_actualized.valueOf() == end.valueOf())
            Util.timers.get(timer_name)?.set(false);
    }

    /** This function allow to sleep the number of milliseconds specified. But the function must be called with await to
    * function correctly.*/
    static async sleep(duration_ms : number) : Promise<void>{
        return new Promise(resolve => setTimeout(resolve, duration_ms));
    }


}