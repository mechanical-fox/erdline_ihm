
import {TestBed} from '@angular/core/testing';
import {NavComponent} from '../../script/component/NavComponent';
import {Helper} from './helper/Helper';
import { MessageUtil } from '../../script/util/MessageUtil';


describe('NavComponent Tests',()=>{


    test(`Par défaut je vois la page d'accueil`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        let nodeFirstParagraph = compiled.querySelector("#first_paragraph");
        expect(nodeFirstParagraph).toBeDefined();
        expect(nodeFirstParagraph?.textContent).toContain("Erdline est un site vitrine, qui");
    
    });


    test(`Changement de page effectif si je clique sur l'item "A propos"`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".banner-item-inactive");
        let found : boolean = false;

        for(let item of items){
            if(item?.textContent.trim() == "A propos" && !found){
                item.click();
                await Helper.sleep(300);
                found = true;
            }
        }

        expect(found).toBe(true);
        let nodeFirstParagraph = compiled.querySelector("#first_paragraph");
        expect(nodeFirstParagraph).toBeDefined();
        expect(nodeFirstParagraph?.textContent).toContain("Site créé par Pierre Meunier (Développeur).");
    
    });


    test(`Les messages d'erreurs sont correctements affichés au client`, async()=>{
        
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        MessageUtil.call("logError", ["Une erreur serveur est survenue"]);
        await Helper.sleep(300);

        const errorNode : HTMLElement = compiled.querySelector(".error-message") as HTMLElement;
        expect(errorNode).toBeDefined();
        expect(errorNode.textContent.trim()).toBe("Une erreur serveur est survenue");
    
    });
    

});