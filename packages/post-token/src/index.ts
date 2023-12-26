import "module-alias/register";
import { Test } from "@test/index";
import { Data } from "@data/index";

class Post {
    public tt(): string {
        //return "";
        return new Test().test();
    }
    public data(): string {
        return new Data().test();
    }
}
export { Post }