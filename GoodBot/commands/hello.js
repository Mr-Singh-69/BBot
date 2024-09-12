const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello to someone')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to say hello to')
                .setRequired(false)),
    
    async execute(interaction) {
        let user = interaction.options.getUser('user') || interaction.user;
        await interaction.reply(`Hello! ${user.username}, how may I help?`);
    },
};
