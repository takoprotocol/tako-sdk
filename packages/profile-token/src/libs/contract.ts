import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

class BaseContract {
    protected _web3Provider: ethers.Provider | null;
    protected _contractInfo: ContractInfo;
    constructor(contractAddress: string, chainId: number, fileName: string) {
        //const myABI = JSON.parse(fs.readFileSync(this.getAssetsPath(fileName)).toString());
        const myABI = JSON.parse(fileName);
        const iface = new ethers.Interface(myABI);
        this._web3Provider = null;
        this._contractInfo = {
            address: contractAddress, chainId: chainId,
            iface: iface,
            contract: new ethers.Contract(contractAddress, iface, this._web3Provider)
        };
    }
    //get set
    public set provider(provider: ethers.Provider) {
        this._web3Provider = provider;
        this.updateContract();
    }
    public get provider(): ethers.Provider {
        if (this._web3Provider) {
            return this._web3Provider;
        }
        throw "no provider set";
    }
    public get contractAddress(): string {
        return this._contractInfo.address;
    }
    public get chainId(): number {
        return this._contractInfo.chainId;
    }
    public get iface(): ethers.Interface {
        if (this._contractInfo.iface) {
            return this._contractInfo.iface;
        }
        throw "no ethers interface";
    }
    //private
    private updateContract() {
        if (this._contractInfo.address != "" && this._web3Provider != null) {
            this._contractInfo.contract = new ethers.Contract(this._contractInfo.address, this._contractInfo.iface, this._web3Provider);
        }
    }
    //protected
    protected getAssetsPath(fileName: string): string {
        let base = __dirname;
        for (let index = 0; index < 2; index++) {
            base = path.dirname(base);
        }
        base = path.join(base, "assets");
        return path.join(base, fileName);
    }
    //protected
    protected checkContract() {
        if (this._web3Provider == null) {
            throw "please set a provider first";
        }
        if (this._contractInfo.address == "") {
            throw "please set the contract address";
        }
    }
    protected async initAbiFile(fileName: string) {
        //const myABI = JSON.parse(fs.readFileSync(this.getAssetsPath(fileName)).toString());
        const myABI = JSON.parse(fileName);
        this._contractInfo.iface = new ethers.Interface(myABI);
        this.updateContract();
    }
    //public
    public setContractInfo(contractAddress: string, chainId: number) {
        this._contractInfo.address = contractAddress;
        this._contractInfo.chainId = chainId;
        this.updateContract();
    }
    public async estimateGas(from: string, data: string, value: bigint): Promise<bigint> {
        this.checkContract();
        const estimatedGas = await this._web3Provider!.estimateGas({
            from: from,
            to: this._contractInfo.address,
            data: data,
            value: value
        }).catch(error => {
            //console.log(error)
        });
        if (estimatedGas) {
            return estimatedGas;
        }
        return BigInt(1000000);
    }
    public async generateTransaction(from: string, abiData: string, value: bigint, gasLimit: bigint): Promise<ethers.TransactionRequest> {
        this.checkContract();
        const feeData = await this._web3Provider!.getFeeData();
        const nonce = await this._web3Provider!.getTransactionCount(from);
        const transaction: ethers.TransactionRequest = {
            to: this._contractInfo.address,
            value: value,
            gasLimit: gasLimit,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            maxFeePerGas: feeData.maxFeePerGas,
            nonce: nonce,
            type: 2,
            chainId: this._contractInfo.chainId,
            data: abiData
        };
        return transaction;
    }

}
interface ContractInfo {
    address: string,
    chainId: number,
    contract: ethers.Contract,
    iface: ethers.Interface,
}
export { BaseContract, ContractInfo }