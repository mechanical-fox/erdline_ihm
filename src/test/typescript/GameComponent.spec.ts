import {TestBed} from '@angular/core/testing';
import {GameComponent} from '../../script/component/edition_menu/GameComponent';
import {Helper} from './helper/Helper';
import { Provider } from '../../script/app/Provider';
import { Fetch_Options } from '../../script/data/util/Fetch_Options';
import { FetchMock } from './helper/FetchMock';
import { SavingUtil } from '../../script/util/SavingUtil';
import { GameMessage } from '../../script/data/game/GameMessage';
import { Util } from '../../script/util/Util';


describe('GameComponent Tests',()=>{

    beforeEach(()=>{
        let json_backgrounds = `[{"counter":1,"id":"background-1","name":"Guilde","color_id":1},` + 
        `{"counter":2,"id":"background-2","name":"Lac","color_id":3}]`;

        let json_characters = `[{"counter":1,"id":"character-1","name":"Adrien","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"1"}]},` + 
        `{"counter":2,"id":"character-2","name":"Grace","expressions":` + 
        `[{"id":"expr-1","counter":1,"name":"Joie","sprite_id":"2"}]}]`;

        let json_scenes = `[{"createdAt":1779644345575,"counter":1,"id":"scene-1","name":"Introduction",` + 
        `"backgroundId":"background-1","messages":[{"characterId":"character-1","expressionId":"expr-1",` +
        `"text":"Bonjour à tous, chers membres de la Guilde. Je me réjouis de vous voir si nombreux ce ` + 
        `soir.","nextSceneId":null},{"characterId":"character-2","expressionId":"expr-1","text":"Bonjour.",` + 
        `"nextSceneId":null},{"characterId":"narration","expressionId":null,"text":"Adrien regarde alors ` + 
        `autour de lui. Puis se rend compte que la Guilde des aventuriers est quelque peu déserte.",` +
        `"nextSceneId":null}]}]`;

        Util.deleteAllVariables();
        SavingUtil.loadBackground(json_backgrounds);
        SavingUtil.loadCharacters(json_characters);
        SavingUtil.loadScenes(json_scenes);

        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
        Provider.mockGetContext((contextId : string)=>null);

        
    });



    test(`Le 1er message affiché est correct`, async()=>{
        
        TestBed.configureTestingModule({imports: [GameComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GameComponent);
        fixture.autoDetectChanges();
        const component : GameComponent = fixture.componentInstance;

        await Helper.sleep(2000);

        let message : GameMessage = component.messages[component.messageNumber];
        expect(message.characterName).toBe("Adrien");
        expect(message.expressionName).toBe("Joie");
        expect(message.dataBase64).toBe("data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAQVQI12P4");
        expect(message.nextSceneId).toBeNull();
        expect(message.text).toBe("Bonjour à tous, chers membres de la Guilde. Je me réjouis de vous voir si nombreux ce soir.");
    });


    test(`Les messages sont mis à jour après un clic`, async()=>{
        
        TestBed.configureTestingModule({imports: [GameComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GameComponent);
        fixture.autoDetectChanges(); 
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement; 
        const component : GameComponent = fixture.componentInstance;

        await Helper.sleep(1000);
        Helper.click(compiled, "#game_screen");
        await Helper.sleep(1000);
        Helper.click(compiled, "#game_screen");
        await Helper.sleep(1000);

        let expectedText = "Adrien regarde alors autour de lui. Puis se rend compte que la Guilde" + 
        " des aventuriers est quelque peu déserte.";

        let message : GameMessage = component.messages[component.messageNumber];
        expect(message.characterName).toBe("narration");
        expect(message.expressionName).toBeNull();
        expect(message.dataBase64).toBeNull();
        expect(message.nextSceneId).toBeNull();
        expect(message.text).toBe(expectedText);
    });







});