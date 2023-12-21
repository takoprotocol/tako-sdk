# tako-js
[![npm version](https://img.shields.io/badge/npm-1.0.7-brightgreen.svg)](https://www.npmjs.com/package/tako-js)

Tako API Client, which facilitates interaction with Tako API without managing cumbersome APIs, helps you focus on your business.

## Install
```javascript
npm  install tako-js
```

## Usage
```javascript
import { CONSTANT, TakoV2 } from  'tako-js';
const tako = new  TakoV2(CONSTANT.Network.LOCALHOST);
const lens = tako.lens;
const farcaster = tako.farcaster;
const lensOpenCuration = tako.lensOpenCuration;
const res = await  tako.whitelistInfo(address);
```