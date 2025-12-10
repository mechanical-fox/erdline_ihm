



import {TestBed} from '@angular/core/testing';
import {GenerationComponent} from '../../script/component/GenerationComponent';
import {Helper} from './helper/Helper';
import {MessageUtil} from '../../script/util/MessageUtil';
import {Provider} from '../../script/app/Provider';
import {FetchMock} from './helper/FetchMock';
import Fetch_Options from '../../script/data/util/Fetch_Options';


describe('GenerationComponent Tests',()=>{

    beforeAll(()=>{
        MessageUtil.listen('clearError', (args: string[])=>{});
        MessageUtil.listen('logError', (args: string[])=>{});
        Provider.mockFetch((url : string, options : Fetch_Options)=>FetchMock.fetch(url,options));
        Provider.disableFunctionOpen();
    });

    test(`Si je charge l'exemple, alors je vois 5 endpoints`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".container_center_line");
        expect(items.length).toBe(5);

    });


    test(`Si je charge l'exemple, alors je vois l'endpoint "/report/{id}" `, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);
        
        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".container_center_line");
        let urlFound : boolean = false;

        for(let item of items){
            if(item?.textContent.includes("/report/{id}"))
                urlFound = true;
        }

        expect(urlFound).toBe(true);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du status 400`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let items2 = compiled.querySelectorAll(".status");
        let status_found : boolean = false;

        for(let item of items2){
            if(item?.textContent.trim() == "400")
                status_found = true
        }

        expect(status_found).toBe(true);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du body attendu`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let tabText = compiled.querySelector(".tab_text");

        expect(tabText).toBeDefined();
        expect(tabText?.textContent).toBeDefined();
        expect(tabText?.textContent).toContain(`"2025-07-18T08:45:42.053Z"`);

    });


    test(`Si je charge l'exemple et ouvre le 1er onglet, présence du paramètre "environment (Path)"`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let items = compiled.querySelectorAll(".div_clickable_tab") as NodeListOf<HTMLElement>;

        if(items.length > 0)
            items[0].click();

        let items2 = compiled.querySelectorAll(".text_gen2");
        let parameter_found : boolean = false;

        for(let item of items2){
            if(item?.textContent.trim() == "environment (Path)")
                parameter_found = true
        }

        expect(parameter_found).toBe(true);

    });


    test(`Je peux créer un nouvel endpoint`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let methodNode : HTMLSelectElement = compiled.querySelector("#endpoint_method") as HTMLSelectElement;
        methodNode.value = "2";
        methodNode.dispatchEvent(new Event('change'));

        let pathNode : HTMLInputElement = compiled.querySelector("#endpoint_path") as HTMLInputElement;
        pathNode.value = "/users";
        pathNode.dispatchEvent(new Event('input'));

        let addUrlButton : HTMLElement = compiled.querySelector(".button_basic") as HTMLElement;
        addUrlButton.click();

        await Helper.sleep(1000);

        let tagNode : HTMLInputElement = compiled.querySelector("#input_tag") as HTMLInputElement;
        tagNode.value = "Opérations Utilisateurs";
        tagNode.dispatchEvent(new Event('input'));

        let statusNode : HTMLInputElement = compiled.querySelector("#statusInput") as HTMLInputElement;
        statusNode.value = "200";
        statusNode.dispatchEvent(new Event('input'));

        await Helper.sleep(300);

        let statusButton : HTMLInputElement = compiled.querySelector(".button_status") as HTMLInputElement;
        let validationButton : HTMLInputElement = compiled.querySelector(".button_add") as HTMLInputElement;
        statusButton.click();
        await Helper.sleep(300);
        validationButton.click();
        await Helper.sleep(1000);

        let endpointNodes : NodeListOf<HTMLElement> = compiled.querySelectorAll(".tab") as NodeListOf<HTMLElement>;
        let endpointCreated : boolean = false;

        for(let endpoint of endpointNodes){
            if(endpoint?.textContent.includes("GET") && endpoint?.textContent.includes("/users"))
                endpointCreated = true;
        }

        expect(endpointCreated).toBe(true);
    });


    test(`Lorsque j'appuye sur "Visualiser Html" l'appel serveur effectué est correct`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let openButton : HTMLElement = compiled.querySelector("#button_open") as HTMLElement;
        openButton?.click();
        await Helper.sleep(300);

        expect(FetchMock.getLastUrlCalled() == "/documentation/html");
        expect(FetchMock.getLastMethodCalled() == "POST");

        let bodyString : string | null = FetchMock.getLastBodyGiven();
        expect(bodyString).toBeDefined();
        let body : any = bodyString == null ? null : JSON.parse(bodyString);

        expect(body.name).toBe("API Supervision");
        expect(body.version).toBe("v1.4");
        expect(body.urlServer).toBe("http://127.0.0.1:8080");
        expect(body.endpoints.length).toBe(5);
        expect(body.endpoints[0].method).toBe("POST");
        expect(body.endpoints[0].path).toBe("/pipeline/{project}/{type}/{environment}/start");
        expect(body.endpoints[0].tag).toBe("Executions");
        expect(body.endpoints[0].parameters.length).toBe(3);
        expect(body.endpoints[0].parameters[0].type).toBe("Path");
        expect(body.endpoints[0].parameters[0].name).toBe("project");
        expect(body.endpoints[0].parameters[0].example).toBe("LoyaltyWS");
        expect(body.endpoints[0].status_list.length).toBe(4);
        expect(body.endpoints[0].status_list[0]).toBe(200);
        expect(body.endpoints[0].examples.length).toBe(1);
        expect(body.endpoints[0].examples[0].name).toBe("Body");
    });


    test(`Lorsque j'appuye sur "Télécharger Html" l'appel serveur effectué est correct`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let downloadButton : HTMLElement = compiled.querySelector("#button_download") as HTMLElement;
        downloadButton?.click();
        await Helper.sleep(300);

        expect(FetchMock.getLastUrlCalled() == "/documentation/html");
        expect(FetchMock.getLastMethodCalled() == "POST");

        let bodyString : string | null = FetchMock.getLastBodyGiven();
        expect(bodyString).toBeDefined();
        let body : any = bodyString == null ? null : JSON.parse(bodyString);

        expect(body.name).toBe("API Supervision");
        expect(body.version).toBe("v1.4");
        expect(body.urlServer).toBe("http://127.0.0.1:8080");
        expect(body.endpoints.length).toBe(5);
        expect(body.endpoints[0].method).toBe("POST");
        expect(body.endpoints[0].path).toBe("/pipeline/{project}/{type}/{environment}/start");
        expect(body.endpoints[0].tag).toBe("Executions");
        expect(body.endpoints[0].parameters.length).toBe(3);
        expect(body.endpoints[0].parameters[0].type).toBe("Path");
        expect(body.endpoints[0].parameters[0].name).toBe("project");
        expect(body.endpoints[0].parameters[0].example).toBe("LoyaltyWS");
        expect(body.endpoints[0].status_list.length).toBe(4);
        expect(body.endpoints[0].status_list[0]).toBe(200);
        expect(body.endpoints[0].examples.length).toBe(1);
        expect(body.endpoints[0].examples[0].name).toBe("Body");
    });


    test(`Je peux supprimer un endpoint`, async()=>{
        
        TestBed.configureTestingModule({imports: [GenerationComponent]}).compileComponents();
        const fixture = TestBed.createComponent(GenerationComponent);
        fixture.autoDetectChanges();  
        const compiled : HTMLElement = fixture.nativeElement as HTMLElement;

        await Helper.sleep(300);

        let nodeButtonExample : HTMLElement = compiled.querySelector("#button_example") as HTMLElement;
        nodeButtonExample?.click();
        await Helper.sleep(300);

        let deleteButton : NodeListOf<HTMLElement> = compiled.querySelectorAll(".cross_image") as NodeListOf<HTMLElement>;
        deleteButton[0].click();
        await Helper.sleep(300);

        const items : NodeListOf<HTMLElement> = compiled.querySelectorAll(".container_center_line");
        expect(items.length).toBe(4);

    });


});