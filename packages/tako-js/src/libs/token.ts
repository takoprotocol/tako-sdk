class Token {
    private _type: string = "";
    private _token: string = "";
    private _refreshToken: string = "";
    private _expire: number = 0;//Math.floor(Date.now() / 1000)
    public set(data: any) {
        this._token = data.token;
        this._type = data.token_type;
        this._refreshToken = data.refresh_token;
        this._expire = Math.floor(Date.now() / 1000) + data.expires_in;
    }
    public get refreshToken(): string {
        return this._refreshToken;
    }
    public get type(): string {
        return this._type;
    }
    public get token(): string {
        return this._token;
    }
    public get expire(): number {
        return this._expire;
    }
    public get authorizationStr(): string {
        return `${this._type}:${this._token}`;
    }
    public isExpired(): boolean {
        return Math.floor(Date.now() / 1000) >= this.expire;
    }
}
export { Token }