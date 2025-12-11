import { EMethod } from "./EMethod";

export class MethodOption{

    value : string;
    text: string;
    method: EMethod | null;

    constructor(value : string, text: string, method : EMethod | null){
        this.value = value;
        this.text = text;
        this.method = method;
    }
}