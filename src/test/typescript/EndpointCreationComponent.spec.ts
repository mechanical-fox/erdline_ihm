
import {TestBed} from '@angular/core/testing';
import {EndpointCreationComponent} from '../../script/component/EndpointCreationComponent';
import {Helper} from './helper/Helper';
import {MessageUtil} from '../../script/util/MessageUtil';

let errors : string[] = [];

describe('EndpointCreationComponent Tests',()=>{

    beforeAll(()=>{
        MessageUtil.listen('logError', (args: string[])=>{errors.push(args[0])});
        MessageUtil.listen('clearError', (args: string[])=>{});
    });

    test(`Le nombre de paramètres affichés peut être modifié`, async()=>{
        
        TestBed.configureTestingModule({imports: [EndpointCreationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(EndpointCreationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        MessageUtil.call("initCreationEndpoint", ["GET", "/users"]);
        await Helper.sleep(300);
        let choiceNodes = compiled.querySelectorAll(".choice_desactivated") as NodeListOf<HTMLElement>;

        for(let choice of choiceNodes){
            if(choice.textContent.trim() == "3")
                choice.click();
        }

        await Helper.sleep(300);
        let parameterTypeNode = compiled.querySelectorAll(".cell_select");
        let numberParameters = parameterTypeNode.length;
        expect(numberParameters).toBe(3);
    
    });


    test(`Message d'erreur pour créer un endpoint sans tag renseigné`, async()=>{
        
        TestBed.configureTestingModule({imports: [EndpointCreationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(EndpointCreationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        MessageUtil.call("initCreationEndpoint", ["GET", "/users"]);
        await Helper.sleep(300);

        let statusNode : HTMLInputElement = compiled.querySelector("#statusInput") as HTMLInputElement;
        statusNode.value = "200";
        statusNode.dispatchEvent(new Event('input'));
        await Helper.sleep(300);

        let statusButton : HTMLInputElement = compiled.querySelector(".button_status") as HTMLInputElement;
        statusButton.click();
        await Helper.sleep(300);

        errors = [];

        let validationButton : HTMLInputElement = compiled.querySelector(".button_add") as HTMLInputElement;
        validationButton.click();
        await Helper.sleep(300);

        expect(errors.length).toBe(1);
        expect(errors[0]).toBe("Tag est un champ obligatoire");
    
    });


    test(`Message d'erreur pour créer un endpoint sans codes retour renseignés`, async()=>{
        
        TestBed.configureTestingModule({imports: [EndpointCreationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(EndpointCreationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        MessageUtil.call("initCreationEndpoint", ["GET", "/users"]);
        await Helper.sleep(300);

        let tagNode : HTMLInputElement = compiled.querySelector("#input_tag") as HTMLInputElement;
        tagNode.value = "Opérations Utilisateurs";
        tagNode.dispatchEvent(new Event('input'));
        await Helper.sleep(300);

        errors = [];

        let validationButton : HTMLInputElement = compiled.querySelector(".button_add") as HTMLInputElement;
        validationButton.click();
        await Helper.sleep(300);

        expect(errors.length).toBe(1);
        expect(errors[0]).toBe("Au moins un code de retour doit être renseigné");
    });

    

});