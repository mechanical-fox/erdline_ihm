

import {TestBed} from '@angular/core/testing';
import {SceneComponent} from '../../script/component/edition_menu/SceneComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { SavingUtil } from '../../script/util/SavingUtil';


describe('SceneComponent Tests',()=>{

    beforeAll(()=>{
        let json_backgrounds = `[{"counter":1,"id":"background-1","name":"Guilde","color_id":1},` + 
        `{"counter":2,"id":"background-2","name":"Lac","color_id":3}]`

        let json_characters = `[{"counter":1,"id":"character-1","name":"Adrien","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"1"}]},` + 
        `{"counter":2,"id":"character-2","name":"Grace","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"2"}]}]`;

        SavingUtil.loadBackground(json_backgrounds);
        SavingUtil.loadCharacters(json_characters);

        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });



    test(`Je peux créer un message de type narration`, async()=>{
        
        TestBed.configureTestingModule({imports: [SceneComponent]}).compileComponents();
        const fixture = TestBed.createComponent(SceneComponent);
        fixture.autoDetectChanges(); 
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement; 

        await Helper.sleep(300);
        let text = "I walk into the bar, with my usual energy. The bar is a little crowded, a sign that an important event is coming.";
        Helper.select(compiled, "#messageBox-select-character", "narration");
        Helper.input(compiled, "#messageBox-textarea", text);
        await Helper.sleep(300);
        Helper.click(compiled, "#messageBox-add-button");
        await Helper.sleep(300);

        let node  : HTMLSelectElement | null = compiled.querySelector(".scene-message-narration");
        expect(node?.textContent).toContain(text);
    });


    test(`Lorsque je crée un message avec un personnage, le nom de ce personnage apparait`, async()=>{
        
        TestBed.configureTestingModule({imports: [SceneComponent]}).compileComponents();
        const fixture = TestBed.createComponent(SceneComponent);
        fixture.autoDetectChanges(); 
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement; 
        const component : SceneComponent = fixture.componentInstance;

        await Helper.sleep(300);
        let text = "Extraterrestrial ? So the earth was invaded, and I learn this only now ?";
        Helper.select(compiled, "#messageBox-select-character", "character-1");
        await Helper.sleep(300);
        Helper.select(compiled, "#messageBox-select-expression", "expr-1");
        Helper.input(compiled, "#messageBox-textarea", text);
        await Helper.sleep(300);
        Helper.click(compiled, "#messageBox-add-button");
        await Helper.sleep(300);

        let node  : HTMLSelectElement | null = compiled.querySelector(".scene-message-title");
        expect(node?.textContent).toContain("Adrien");
    });



});