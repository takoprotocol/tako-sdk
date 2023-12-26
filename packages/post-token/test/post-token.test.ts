import { Post } from '../src';
//import { Post } from '../build/post-token/src';

(async () => {
    try {
        const p = new Post();
        console.log(`test:${p.tt()},data:${p.data()}`);
    } catch (error) {
        console.log(`error:${error}`);
    }
})()