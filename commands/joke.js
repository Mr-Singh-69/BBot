const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tells a random joke'),
    
    async execute(interaction) {
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why don't scientists trust atoms? Because they make up everything!"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(randomJoke);
    },
};
