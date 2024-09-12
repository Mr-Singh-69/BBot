const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Who is he??'),

    async execute(interaction) {
        await interaction.reply("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
    },
};
