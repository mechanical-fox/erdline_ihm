import fs from 'fs';
import Fetch_Options from '../../../script/data/util/Fetch_Options'
import Fetch_Response from '../../../script/data/util/Fetch_Response';
import Fetch_Response_Impl from './Fetch_Response_Impl';

export class FetchMock {

    static mocks = JSON.parse(fs.readFileSync('src/test/resources/fetch_mock.json').toString());

    static lastMethodCalled: string | null;
    static lastUrlCalledByMethod: Map<string, string> = new Map<string, string>();
    static lastBodyCalledByMethod: Map<string, string | undefined> = new Map<string, string | undefined>();
    static lastStatusCodeByMethod: Map<string, number> = new Map<string, number>();

    /** Mock fetch during the tests */
    static async fetch(url: string, options: Fetch_Options): Promise<Fetch_Response> {

        FetchMock.lastMethodCalled = options.method;
        FetchMock.lastUrlCalledByMethod.set(options.method, url);

        if (options.body) {
            FetchMock.lastBodyCalledByMethod.set(options.method, options.body);
        } else {
            FetchMock.lastBodyCalledByMethod.delete(options.method);
        }

        for (const mock of FetchMock.mocks) {

            if (url.endsWith(mock.url) && mock.method == options.method) {

                const answer = new Fetch_Response_Impl(mock.status, JSON.stringify(mock.data));
                FetchMock.lastStatusCodeByMethod.set(options.method, answer.status);

                if (!mock.status || mock.status < 200 || mock.status >= 300) {
                    let msg = `Not implemented: FetchMock has received a code ${mock.status},`;
                    msg += ` but FetchMock don't implement the feature of managing the errors actually.`;
                    console.warn(`\n\n${msg}\n_n`);
                    throw new Error(msg);
                } 
                else
                    return answer;
                
            }
        }

        FetchMock.lastStatusCodeByMethod.set(options.method, 500);
        console.warn(`\n\nThere is no FetchMock for the method ${options.method} url ${url}\n\n`);
        throw new Error(`There is no FetchMock for the method ${options.method} url ${url}`);
    }


    /** Return the last url called for the method given ("GET", "POST",...) */
    static getLastUrlCalledByMethod(method: string): string | undefined {
        return FetchMock.lastUrlCalledByMethod.get(method);
    }


    /** Return the last body called for the method given ("GET", "POST",...) */
    static getLastBodyCalledByMethod(method: string): string | undefined {
        return FetchMock.lastBodyCalledByMethod.get(method);
    }


    /** Return the last body called for the method given ("GET", "POST",...) */
    static getLastStatusCodeByMethod(method: string): number | undefined {
        return FetchMock.lastStatusCodeByMethod.get(method);
    }
}
