import {cors, createGrace, logger} from "@grace-js/grace";
import {join} from "node:path";

export const app = createGrace({debug: true})
    .registerPlugin(cors({}))
    .registerPlugin(logger())
    .registerRoutes(join(import.meta.dir, "routes/**/*.ts"))
    .listen(8080, () => console.log("⚡️ Grace listening on port 8080"));
