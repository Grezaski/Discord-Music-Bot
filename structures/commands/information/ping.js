const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "ping",
    description: "Obtain the bot's latency reading.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    run: async (client, message, args) => {
        message.reply({
            embeds: [new EmbedBuilder()
                .setTitle(`:stopwatch: WS Ping : \`${client.ws.ping} MS\`

:hourglass: Latency : \`${Date.now() - message.createdTimestamp} MS\`

:gear: Uptime : ${ms(client.uptime)}`)
                .setColor(3092790)], content: `**:ping_pong: Pong!**`
        })
    }
}