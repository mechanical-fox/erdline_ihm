


export type Fetch_Response = {

    status: number | undefined;
    headers : Headers | undefined;
    ok: boolean;

    text(): Promise<string>;

};
