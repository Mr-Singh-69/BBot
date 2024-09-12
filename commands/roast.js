const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roast someone!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to roast')
                .setRequired(false)),
    
    async execute(interaction) {
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day.",
            "I'd agree with you but then we’d both be wrong.",
            "You're proof that even a bad haircut can grow back."
        ];
        let user = interaction.options.getUser('user') || interaction.user;
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        await interaction.reply(`${user.username}, ${randomRoast}`);
    },
};
