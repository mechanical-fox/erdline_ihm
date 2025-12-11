

export class MessageUtil {

    static functionList : Map<string, (args: string[]) => void> = new Map<string,(args: string[]) => void>();


    /** Register a function to treat the message specified*/
    static listen(message: string, f: (args: string[]) => void) : void {
        MessageUtil.functionList.set(message, f);
    }

    /** Send a message, and treat it with the function registered */
    static call(message: string, args: string[]) : void {
        const functionRegistered : ((args: string[]) => void) | undefined  = MessageUtil.functionList.get(message);

        if (functionRegistered) 
            functionRegistered(args);
        else 
            console.warn(`Function ${message} called, but none was registered`);
        
    }
}