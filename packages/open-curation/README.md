# tako-open-curation
[![npm version](https://img.shields.io/badge/npm-1.0.4-brightgreen.svg)](https://www.npmjs.com/package/tako-open-curation)

Tako Open Curation API Client, which facilitates interaction with Tako Open Curation API without managing cumbersome APIs, helps you focus on your business.

## Install
```javascript
npm  install tako-open-curation
```

## Usage
```javascript
import { CONSTANT, TakoOpenCuration } from 'tako-open-curation';
const tako = new TakoOpenCuration(CONSTANT.Network.TESTNET);
const lensOpenCuration = tako.lensOpenCuration;
const a = await lensOpenCuration.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.All);
const res = await a.get();
```