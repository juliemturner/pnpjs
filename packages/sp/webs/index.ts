import { Web, IWeb } from "./types.js";
import { SPRest } from "../rest.js";
import { SPBatch } from "../batch.js";

export {
    IWeb,
    IWebs,
    Web,
    IWebAddResult,
    IWebUpdateResult,
    Webs,
    IWebInfo,
    IStorageEntity,
    IWebInfosData,
} from "./types.js";

declare module "../rest" {
    interface SPRest {

        /**
         * Access to the current web instance
         */
        readonly web: IWeb;

        /**
         * Creates a new batch object for use with the SharePointQueryable.addToBatch method
         *
         */
        createBatch(): SPBatch;
    }
}

Reflect.defineProperty(SPRest.prototype, "web", {
    configurable: true,
    enumerable: true,
    get: function (this: SPRest) {
        return this.childConfigHook(({ options, baseUrl, runtime }) => {
            return Web(baseUrl).configure(options).setRuntime(runtime);
        });
    },
});

SPRest.prototype.createBatch = function (this: SPRest): SPBatch {
    return this.web.createBatch();
};
