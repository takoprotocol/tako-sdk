import * as ethers from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
import { BaseContract } from './contract';
import { erc721abi } from '../assets';

class ERC721 extends BaseContract {
    constructor(contractAddress: string, chainId: number) {
        super(contractAddress, chainId, erc721abi);
    }
    public async ownerOf(tokenId: number): Promise<string> {
        const ownerOf = await this._contractInfo.contract.ownerOf(tokenId);
        return ownerOf;
    }
    public async tokenURI(tokenId: number): Promise<string> {
        const tokenUri = await this._contractInfo.contract.tokenURI(tokenId);
        return tokenUri;
    }
    public async getApproved(tokenId: number): Promise<string> {
        const res = await this._contractInfo.contract.getApproved(tokenId);
        return res;
    }
    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        const res = await this._contractInfo.contract.isApprovedForAll(owner, operator);
        return res;
    }
    public async balanceOf(address: string): Promise<number> {
        const balance = await this._contractInfo.contract.balanceOf(address);
        return balance;
    }
    public approveAbiData(address: string, tokenId: number): string {
        return this._contractInfo.iface.encodeFunctionData("approve",
            [address, tokenId]);
    }
    public safeTransferFromAbiData(from: string, to: string, tokenId: number, data: Uint8Array): string {
        if (data.length == 0) {
            return this._contractInfo.iface.encodeFunctionData("safeTransferFrom(address _from, address _to, uint256 _tokenId)",
                [from, to, tokenId]);
        } else {
            return this._contractInfo.iface.encodeFunctionData("safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data)",
                [from, to, tokenId, data]);
        }
    }
    public setApprovalForAllAbiData(address: string, approved: boolean): string {
        return this._contractInfo.iface.encodeFunctionData("setApprovalForAll",
            [address, approved]);
    }
    public async name(): Promise<string> {
        const res = await this._contractInfo.contract.name();
        return res;
    }
    public async owner(): Promise<string> {
        const res = await this._contractInfo.contract.owner();
        return res;
    }
    public async symbol(): Promise<string> {
        const res = await this._contractInfo.contract.symbol();
        return res;
    }
    public async totalBurned(): Promise<number> {
        const res = await this._contractInfo.contract.totalBurned();
        return res;
    }
    public async totalMinted(): Promise<number> {
        const res = await this._contractInfo.contract.totalMinted();
        return res;
    }
    public async totalSupply(): Promise<number> {
        const res = await this._contractInfo.contract.totalSupply();
        return res;
    }
    public async explicitOwnershipOf(tokenId: number): Promise<[string, number, boolean, number]> {
        const res = await this._contractInfo.contract.explicitOwnershipOf(tokenId);
        return res;
    }
    public async explicitOwnershipsOf(tokenIds: number[]): Promise<[string, number, boolean, number][]> {
        const res = await this._contractInfo.contract.explicitOwnershipsOf(tokenIds);
        return res;
    }
    public async tokensOfOwner(owner: string): Promise<number[]> {
        const res = await this._contractInfo.contract.tokensOfOwner(owner);
        return res;
    }
    public async tokensOfOwnerIn(owner: string, start: number, stop: number): Promise<number[]> {
        const res = await this._contractInfo.contract.tokensOfOwnerIn(owner, start, stop);
        return res;
    }
}

export { ERC721 }