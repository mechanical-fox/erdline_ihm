

import {TestBed} from '@angular/core/testing';
import {SavingComponent} from '../../script/component/edition_menu/SavingComponent';
import {EditionComponent} from '../../script/component/pages/EditionComponent';
import {NavComponent} from '../../script/component/global/NavComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { SavingUtil } from '../../script/util/SavingUtil';
import { Util } from '../../script/util/Util';


describe('SavingComponent Tests',()=>{

    beforeAll(()=>{
        
    });

    beforeEach(()=>{
        let json_backgrounds = `[{"counter":1,"id":"background-1","name":"Guilde","color_id":1},` + 
                `{"counter":2,"id":"background-2","name":"Lac","color_id":3}]`;
        
        let json_characters = `[{"counter":1,"id":"character-1","name":"Adrien","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"1"}]},` + 
        `{"counter":2,"id":"character-2","name":"Grace","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"2"}]}]`;
        
        Util.deleteAllVariables();
        SavingUtil.loadBackground(json_backgrounds);
        SavingUtil.loadCharacters(json_characters);
        SavingUtil.loadScenes(null);
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
    });


    test(`Un mot de passe erroné, affiche le message "Echec d'authentification" `, async()=>{
        
        TestBed.configureTestingModule({imports: [SavingComponent]}).compileComponents();
        const fixture = TestBed.createComponent(SavingComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;
        const component : SavingComponent = fixture.componentInstance;

        await Helper.sleep(300);
        Helper.input(compiled,"#input_login", "MysticalAshes");
        Helper.input(compiled,"#input_password", "perlimpinpin");
        await Helper.sleep(300);
        Helper.click(compiled, "#connection-button");
        await Helper.sleep(300);

        let node : HTMLElement | null = compiled.querySelector("#failure-message");
        expect(node?.textContent.trim()).toBe("Echec d'authentification");
    });

    test(`A l'inscription, les données sont correctement envoyées à l'API `, async()=>{

        /** Write into a session "not connected" some datas that must be sended to the server at the registration. 
        * It can seem easy when we read the test...
        * But the functions such as SavingUtil.loadBackground, are 20 lines long, use others classes. And 
        * more importantly are in a code that must be tested. So yes, the egality of what is send to the API 
        * is totaly not guarranted, if it wasn't tested.*/

        let json_backgrounds = `[{"counter":1,"id":"background-1","name":"Guilde","color_id":1},` + 
                `{"counter":2,"id":"background-2","name":"Lac","color_id":3}]`
        
        let json_characters = `[{"counter":1,"id":"character-1","name":"Adrien","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"1"}]},` + 
        `{"counter":2,"id":"character-2","name":"Grace","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"2"}]}]`;
        
        SavingUtil.loadBackground(json_backgrounds);
        SavingUtil.loadCharacters(json_characters);
        SavingUtil.loadScenes(null);

        /** data writted */
        
        TestBed.configureTestingModule({imports: [SavingComponent]}).compileComponents();
        const fixture = TestBed.createComponent(SavingComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);
        Helper.input(compiled,"#input_login", "Wolf");
        Helper.input(compiled,"#input_password", "wolf");
        await Helper.sleep(300);
        Helper.click(compiled, "#registration-button");
        await Helper.sleep(300);

        let bodiesSend : (string | null)[] = FetchMock.getAllBodiesSend();
        let urlsCalled = FetchMock.getAllUrlsCalled();
        let methodsCalled = FetchMock.getAllMethodsCalled();
        let urlCalled = urlsCalled[urlsCalled.length - 2];
        let methodCalled = methodsCalled[methodsCalled.length - 2];
        expect(bodiesSend.length).toBeGreaterThanOrEqual(2);
        let bodySend = bodiesSend[bodiesSend.length - 2];
        expect(bodySend).toBeDefined();
        expect(bodySend).not.toBe(null);
        

        if(bodySend){
            let body = JSON.parse(bodySend);
            expect(methodCalled).toBe("POST");
            expect(urlCalled.endsWith("/session")).toBe(true);
            expect(body.session).toBe("Wolf");
            expect(body.password).toBe("wolf");
            expect(body.json_backgrounds).toBe(json_backgrounds);
            expect(body.json_characters).toBe(json_characters);
            expect(body.json_scenes).toBe(null);
        }
    });

    test(`Après une connexion, les données utilisateurs sont correctement chargées`, async()=>{
        TestBed.configureTestingModule({imports: [NavComponent]}).compileComponents();
        const fixture = TestBed.createComponent(NavComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;
        const component : NavComponent = fixture.componentInstance;

        /** Connexion with good login and password */
        await Helper.sleep(300);
        let nodes : HTMLElement[] = Helper.queryAll(compiled, ".edition-menu-item-desactivated");
        expect(nodes.length).toBeGreaterThanOrEqual(4);
        expect(nodes[3]?.textContent.trim()).toBe("Sauvegarde");
        nodes[3].click();
        await Helper.sleep(300);
        Helper.input(compiled,"#input_login", "MysticalAshes");
        Helper.input(compiled,"#input_password", "sKyrIm-4678");
        await Helper.sleep(300);
        Helper.click(compiled, "#connection-button");
        await Helper.sleep(300);

        let node : HTMLElement | null = compiled.querySelector("#connection-summary");
        expect(node?.textContent.includes("connecté")).toBe(true);

        /** Go to the background tab, and check if the background name was correctly loaded. */

        let newNodes : HTMLElement[] = Helper.queryAll(compiled, ".edition-menu-item-desactivated");
        expect(newNodes.length).toBeGreaterThanOrEqual(4);
        expect(newNodes[0]?.textContent.trim()).toBe("Décors");
        expect(newNodes[1]?.textContent.trim()).toBe("Personnages");
        newNodes[0].click();
        await Helper.sleep(300);
        let backgroundNode : HTMLInputElement | null = compiled.querySelector("#background-name");
        expect(backgroundNode?.value).toBe("Jardin");

        /** Go to the character tab, and check if the character name was correctly loaded. */

        newNodes[1].click();
        await Helper.sleep(300);
        let characterNode : HTMLInputElement | null = compiled.querySelector("#character-name");
        expect(characterNode?.value).toBe("Grace");
    });


});