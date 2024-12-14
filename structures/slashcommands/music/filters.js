const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'Apply audio filters',
    options: [
        {
            name: 'type',
            description: 'The type of filter to apply',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Karaoke', value: 'karaoke' },
                { name: 'Tremolo', value: 'tremolo' },
                { name: 'Timescale', value: 'timescale' },
                { name: 'Vibrato', value: 'vibrato' },
                { name: 'Rotation', value: 'rotation' },
                { name: '8D', value: '8d' },
                { name: 'Distortion', value: 'distortion' },
                { name: 'ChannelMix', value: 'channelmix' },
                { name: 'LowPass', value: 'lowpass' },
                { name: 'Bassboost', value: 'bassboost' },
                { name: 'Slowmode', value: 'slowmode' },
                { name: 'Nightcore', value: 'nightcore' },
                { name: 'Vaporwave', value: 'vaporwave' },
                { name: 'Clear', value: 'clear' },
            ],
        },
        {
            name: 'enable',
            description: 'Enable or disable the filter',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
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

            const filterType = interaction.options.getString('type');
            const enable = interaction.options.getBoolean('enable');

            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true,
            });

            // Log Riffy's apiResponse event
            

            switch (filterType) {
                case 'karaoke':
                    player.filters.setKaraoke(enable, enable ? {
                        level: 1,
                        monoLevel: 1,
                        filterBand: 1,
                        filterWidth: 1
                    } : undefined);
                    break;
                case 'timescale':
                    player.filters.setTimescale(enable, enable ? {
                        speed: 1,
                        pitch: 1,
                        rate: 1
                    } : undefined);
                    break;
                case 'tremolo':
                    player.filters.setTremolo(enable, enable ? {
                        frequency: 1,
                        depth: 1
                    } : undefined);
                    break;
                case 'vibrato':
                    player.filters.setVibrato(enable, enable ? {
                        frequency: 1,
                        depth: 1
                    } : undefined);
                    break;
                case 'rotation':
                    player.filters.setRotation(enable, enable ? {
                        rotationHz: 1
                    } : undefined);
                    break;
                case '8d':
                    player.filters.set8D(enable, enable ? {
                        rotationHz: 0.2
                    } : undefined);
                    break;
                case 'distortion':
                    player.filters.setDistortion(enable, enable ? {
                        sinOffset: 1,
                        sinScale: 1,
                        cosOffset: 1,
                        cosScale: 1,
                        tanOffset: 1,
                        tanScale: 1,
                        offset: 1,
                        scale: 1
                    } : undefined);
                    break;
                case 'channelmix':
                    player.filters.setChannelMix(enable, enable ? {
                        leftToLeft: 1,
                        leftToRight: 1,
                        rightToLeft: 1,
                        rightToRight: 1
                    } : undefined);
                    break;
                case 'lowpass':
                    player.filters.setLowPass(enable, enable ? {
                        smoothing: 1
                    } : undefined);
                    break;
                case 'bassboost':
                    player.filters.setBassboost(enable, enable ? {
                        value: 1
                    } : undefined);
                    break;
                case 'slowmode':
                    player.filters.setSlowmode(enable, enable ? {
                        rate: 0.8
                    } : undefined);
                    break;
                case 'nightcore':
                    player.filters.setNightcore(enable, enable ? {
                        rate: 1.5
                    } : undefined);
                    break;
                case 'vaporwave':
                    player.filters.setVaporwave(enable, enable ? {
                        pitch: 0.5
                    } : undefined);
                    break;
                case 'clear':
                    player.filters.clearFilters();
                    break;
                default:
                    return interaction.reply('Invalid filter type.');
            }

            const action = enable ? 'enabled' : 'disabled';
            await interaction.reply(`${filterType} filter ${action}.`);

        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while processing your request.');
        }
    },
};
