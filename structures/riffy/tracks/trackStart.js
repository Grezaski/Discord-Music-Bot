const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { PappuZydenMusicCard } = require("zydenmusiccard");
const client = require("../../client");

client.riffy.on('trackStart', async (player, track) => {
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

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) {
        console.error(`Channel with ID ${player.textChannel} not found.`);
        return;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const musicLength = track.info.length;
    const formattedLength = formatTime(Math.round(musicLength / 1000));
    const [minutesStr, secondsStr] = formattedLength.split(":");
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;

    // Disabling buttons when the song ends
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
                .setDisabled(true)
        );

    const card = new PappuZydenMusicCard()
        .setName(track.info.title)
        .setAuthor(track.info.author)
        .setColor("auto")
        .setTheme("dynamic")
        .setBrightness(100)
        .setThumbnail(track.info.thumbnail);

    const buffer = await card.build();
    const attachment = new AttachmentBuilder(buffer, { name: `musicard.png` });

    const msg = await channel.send({
        files: [attachment],
        components: [row]
    });

    setTimeout(async () => {
        await msg.edit({
            components: [rowDisabled]
        });
    }, totalMilliseconds);
});
