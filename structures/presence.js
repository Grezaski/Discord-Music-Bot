const { ActivityType } = require("discord.js");

module.exports = {
    presence: {
        activities: [
            {
                name: "grezaski",
                type: ActivityType.Listening
            }
        ],
        status: "idle"
    }
};