import { runAgent } from "./src/agent";

const userMessage = process.argv[2];

console.log(await runAgent({ userMessage }));
