

type Fetch_Response = {

    status: number | undefined;
    ok: boolean;

    text(): Promise<string>;

};

export default Fetch_Response;
