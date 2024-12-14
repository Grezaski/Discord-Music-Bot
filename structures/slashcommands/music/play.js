const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'play a track',
    inVoice: true,
    options: [
        {
            name: 'query',
            description: 'The query to search for',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     * @returns 
     */

    run: async (client, interaction) => {
        const query = interaction.options.getString('query');

        const player = client.riffy.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
        })

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.member;
                player.queue.add(track);
            }

            if (playlistInfo && playlistInfo.name) {
                await interaction.reply(`Added ${tracks.length} songs from ${playlistInfo.name} playlist.`);
            } else {
                await interaction.reply(`Added ${tracks.length} songs to the queue.`);
            }

            if (!player.playing && !player.paused) return player.play();

        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            if (track && track.info) {
                track.info.requester = interaction.member;

                player.queue.add(track);

                await interaction.reply(`Added **${track.info.title}** to the queue.`);
            } else {
                await interaction.reply(`Failed to add track to the queue.`);
            }

            if (!player.playing && !player.paused) return player.play();

        } else {
            return interaction.reply(`There were no results found for your query.`);
        }
    },
};