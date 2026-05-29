
import {TestBed} from '@angular/core/testing';
import {CharacterComponent} from '../../script/component/edition_menu/CharacterComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { Util } from '../../script/util/Util';



describe('CharacterComponent Tests',()=>{

    beforeEach(()=>{
        Util.deleteAllVariables();
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });


    test(`La preview se met à jour lorsque le sprite est changé`, async()=>{
        
        TestBed.configureTestingModule({imports: [CharacterComponent]}).compileComponents();
        const fixture = TestBed.createComponent(CharacterComponent);
        fixture.autoDetectChanges(); 
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement; 
        const component : CharacterComponent = fixture.componentInstance;

        await Helper.sleep(300);
        expect(component.spritePreview()).toBe("images/default.png");

        let node : HTMLSelectElement | null = compiled.querySelector("#character-preview-select");

        if(node){
            node.value="2";
            node.dispatchEvent(new Event('change'));
        }

        await Helper.sleep(300);
        expect(component.spritePreview()).toBe("data:image/png;base64, w38GIAXDIBKE0DHxABJRU5ErkJggg==");

    });


    test(`Les informations sont sauvegardées lors d'un changement entre personnages`, async()=>{
        
        TestBed.configureTestingModule({imports: [CharacterComponent]}).compileComponents();
        const fixture = TestBed.createComponent(CharacterComponent);
        fixture.autoDetectChanges(); 
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        Helper.input(compiled, "#character-name", "Adrien");
        Helper.input(compiled, ".character-input-2", "Joie");
        Helper.select(compiled, ".character-select", "1");
        await Helper.sleep(300);
        Helper.click(compiled, "#character-add");
        await Helper.sleep(300);
        Helper.click(compiled, ".view-list-item");
        await Helper.sleep(300);
        Helper.input(compiled, "#character-name", "Grace");
        Helper.input(compiled, ".character-input-2", "Neutre");
        Helper.select(compiled, ".character-select", "2");
        await Helper.sleep(300);
        Helper.click(compiled, ".view-list-item");
        await Helper.sleep(300);


        let nodeInputCharacterName1  : HTMLSelectElement | null = compiled.querySelector("#character-name");
        let nodeInputExpressionName1 : HTMLSelectElement | null = compiled.querySelector(".character-input-2");
        let nodeInputSprite1 : HTMLSelectElement | null = compiled.querySelector(".character-select");

        expect(nodeInputCharacterName1?.value).toBe("Adrien");
        expect(nodeInputExpressionName1?.value).toBe("Joie");
        expect(nodeInputSprite1?.value).toBe("1");

        Helper.click(compiled, ".view-list-item");
        await Helper.sleep(300);

        let nodeInputCharacterName2  : HTMLSelectElement | null = compiled.querySelector("#character-name");
        let nodeInputExpressionName2 : HTMLSelectElement | null = compiled.querySelector(".character-input-2");
        let nodeInputSprite2 : HTMLSelectElement | null = compiled.querySelector(".character-select");

        expect(nodeInputCharacterName2?.value).toBe("Grace");
        expect(nodeInputExpressionName2?.value).toBe("Neutre");
        expect(nodeInputSprite2?.value).toBe("2");

    });



});