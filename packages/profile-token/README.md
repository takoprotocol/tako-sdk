# tako-profile-token
[![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen.svg)](https://www.npmjs.com/package/tako-profile-token)

Tako profile token, Interact with Tako Profile Token Contract on Optimistic for Farcaster dApp integration.

## Install
```javascript
npm  install tako-profile-token
```

## Usage
```javascript
import { TakoKeysV1, utils, Network } from 'tako-profile-token';
const takoKeyContract = await utils.getTakoKeyContract(Network.TESTNET);
const takoKeysV1 = new TakoKeysV1(takoKeyContract.contract, takoKeyContract.chain_id);
const url = "op rpc url";
takoKeysV1.provider = new ethers.JsonRpcProvider(url);
const sharesSupply = await takoKeysV1.sharesSupply(1);
console.log(`sharesSupply:${sharesSupply}`);
```
