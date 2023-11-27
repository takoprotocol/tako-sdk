import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

class ERC721 {
    protected _iface: ethers.Interface;
    protected _web3Provider: ethers.Provider | null;
    protected _contractAddress = "";
    protected _contract: ethers.Contract;
    constructor(contractAddress: string) {
        const myABI = JSON.parse(fs.readFileSync(this.getAssetsPath("erc721.abi")).toString());
        this._iface = new ethers.Interface(myABI);
        this._contractAddress = contractAddress;
        this._web3Provider = null;
        this._contract = new ethers.Contract(this._contractAddress, this._iface, this._web3Provider);
    }
    //get set
    public set provider(provider: ethers.Provider) {
        this._web3Provider = provider;
        this.setContract();
    }
    public get provider(): ethers.Provider {
        if (this._web3Provider) {
            return this._web3Provider;
        }
        throw "no provider set";
    }
    public set contractAddress(contractAddress: string) {
        this._contractAddress = contractAddress;
        this.setContract();
    }
    public get contractAddress(): string {
        return this._contractAddress;
    }
    //private
    private getAssetsPath(fileName: string): string {
        //const fileName = 'erc721.abi';
        let base = __dirname;
        for (let index = 0; index < 2; index++) {
            base = path.dirname(base);
        }
        base = path.join(base, "assets");
        return path.join(base, fileName);
    }
    private setContract() {
        if (this._contractAddress != "" && this._web3Provider != null) {
            this._contract = new ethers.Contract(this._contractAddress, this._iface, this._web3Provider);
        }
    }
    //protected
    protected checkContract() {
        if (this._web3Provider == null) {
            throw "please set a provider first";
        }
        if (this._contractAddress == "") {
            throw "please set the contract address";
        }
    }
    protected async initAbiFile(fileName: string) {
        const myABI = JSON.parse(fs.readFileSync(this.getAssetsPath(fileName)).toString());
        this._iface = new ethers.Interface(myABI);
    }
    //public
    public async ownerOf(tokenId: number): Promise<string> {
        const ownerOf = await this._contract.ownerOf(tokenId);
        return ownerOf;
    }
    public async balanceOf(address: string): Promise<number> {
        const balance = await this._contract.balanceOf(address);
        return balance;
    }
}
export { ERC721 }