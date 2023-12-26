//import 'tsconfig-paths/register';
//require("tsconfig-paths/register");
//import { Post } from '../src';
//require('module-alias/register');

const Post = require("../build");
//import { Post } from '../build';

(async () => {
    try {
        const p = new Post.Post();
        console.log(`test:${p.tt()},data:${p.data()}`);
    } catch (error) {
        console.log(`error:${error}`);
    }
})()