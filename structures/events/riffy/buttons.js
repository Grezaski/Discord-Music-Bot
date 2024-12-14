const client = require("../../client");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const player = client.riffy.players.get(interaction.guild.id);

    if (!player) {
        return interaction.followUp({ content: `❌ The player doesn't exist`, ephemeral: true });
    }

    await interaction.deferUpdate();

    if (interaction.customId === 'pause') {
        player.pause(true);

        await interaction.followUp({ content: '⏸ Paused the current track.', ephemeral: true });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺'),
                new ButtonBuilder()
                    .setCustomId('play')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸'),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
            );

        return await interaction.message.edit({ components: [row] });
    } else if (interaction.customId === 'play') {
        player.pause(false);

        await interaction.followUp({ content: '⏸ Playing the current track.', ephemeral: true });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺'),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸'),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
            );

        return await interaction.message.edit({ components: [row] });
    } else if (interaction.customId === 'skip') {
        player.stop();

        await interaction.followUp({ content: '⏭ Skipped the current track.', ephemeral: true });

        const rowDisabled = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('skipped')
                    .setStyle(ButtonStyle.Success)
                    .setLabel('Skipped')
                    .setDisabled(true)
            );

        return await interaction.message.edit({ components: [rowDisabled] });
    } else if (interaction.customId === 'disconnect') {
        player.destroy();

        await interaction.followUp({ content: '⏺ Disconnected from the voice channel.', ephemeral: true });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disconnect')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏺')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('play')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏸')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('⏭')
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('disconnected')
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Disconnected')
                    .setDisabled(true)
            );

        return await interaction.message.edit({ components: [row] });
    }
});
