import fs from 'fs';
import Fetch_Options from '../../../script/data/util/Fetch_Options'
import Fetch_Response from '../../../script/data/util/Fetch_Response';
import Fetch_Response_Impl from './Fetch_Response_Impl';

export class FetchMock {

    private static mocks = JSON.parse(fs.readFileSync('src/test/resources/fetch_mock.json').toString());

    private static lastMethodCalled: string | null;
    private static lastUrlCalled: string | null;
    private static lastBodyCalled: string | null;

    /** Mock fetch during the tests */
    static async fetch(url: string, options: Fetch_Options): Promise<Fetch_Response> {

        FetchMock.lastMethodCalled = options.method;
        FetchMock.lastUrlCalled = url;

        if (options.body) 
            FetchMock.lastBodyCalled = options.body;
        else 
            FetchMock.lastBodyCalled = null;

        for (const mock of FetchMock.mocks) {

            if (url.endsWith(mock.url) && mock.method == options.method) {

                const answer = new Fetch_Response_Impl(mock.status, JSON.stringify(mock.data));

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

        console.warn(`\n\nThere is no FetchMock for the method ${options.method} url ${url}\n\n`);
        throw new Error(`There is no FetchMock for the method ${options.method} url ${url}`);
    }


    /** Return the last url called */
    static getLastUrlCalled(): string | null {
        return FetchMock.lastUrlCalled;
    }

    /** Return the last method called */
    static getLastMethodCalled(): string | null {
        return FetchMock.lastMethodCalled;
    }

    /** Return the body given at the last url called */
    static getLastBodyGiven(): string | null {
        return FetchMock.lastBodyCalled;
    }



}
