const client = require("../../client");
const { logger } = require("../../functions/logger");

client.on("ready", async () => {
    client.riffy.init(client.user.id);

    console.log("\n---------------------")
    logger(`${client.user.tag} is ready`, "success")
    console.log("---------------------")
})