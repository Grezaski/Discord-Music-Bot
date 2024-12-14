module.exports = {
    name: 'shuffle',
    description: 'Shuffles the current queue of songs.',
    inVoice: true,
    sameVoice: true,
    player: true,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);

        if (!player) {
            return interaction.reply('There is no active player.');
        }
        const queue = player.queue;
        if (queue.size < 1) {
            return interaction.reply('There are no songs in the queue to shuffle.');
        }
        await interaction.deferReply();
        queue.shuffle();
        
        return interaction.editReply(`Shuffled ${queue.size} songs in the queue.`);
    },
};