const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Set the loop mode for the player',
    options: [
        {
            name: 'mode',
            description: 'The loop mode to set',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Queue', value: 'queue' },
                { name: 'Track', value: 'track' },
                { name: 'None', value: 'none' },
            ],
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        try {
            if (!interaction.member.voice.channel) {
                return interaction.reply('You need to be in a voice channel to use this command.');
            }

            const loopMode = interaction.options.getString('mode');

            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true,
            });

            switch (loopMode) {
                case 'queue':
                    player.setLoop('queue');
                    break;
                case 'track':
                    player.setLoop('track');
                    break;
                case 'none':
                    player.setLoop('none');
                    break;
                default:
                    return interaction.reply('Invalid loop mode.');
            }

            await interaction.reply(`Loop mode set to ${loopMode}.`);

        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while processing your request.');
        }
    },
};
