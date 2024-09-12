const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock, Paper, Scissors with the bot')
        .addStringOption(option => 
            option.setName('choice')
                .setDescription('Your move: rock, paper, or scissors')
                .setRequired(true)),
    
    async execute(interaction) {
        const choices = ["rock", "paper", "scissors"];
        const userChoice = interaction.options.getString('choice').toLowerCase();
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) {
            await interaction.reply("Invalid choice! Choose rock, paper, or scissors.");
        } else if (userChoice === botChoice) {
            await interaction.reply(`It's a tie! We both chose ${botChoice}.`);
        } else if (
            (userChoice === "rock" && botChoice === "scissors") ||
            (userChoice === "paper" && botChoice === "rock") ||
            (userChoice === "scissors" && botChoice === "paper")
        ) {
            await interaction.reply(`You win! I chose ${botChoice}.`);
        } else {
            await interaction.reply(`I win! I chose ${botChoice}.`);
        }
    },
};
