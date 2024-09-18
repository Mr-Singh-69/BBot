module.exports = {
    name: 'rps',
    async execute(message) {
        const choices = ["rock", "paper", "scissors"];
        const userChoice = message.content.split(' ')[1]?.toLowerCase();

        if (!userChoice || !choices.includes(userChoice)) {
            message.channel.send("Invalid choice! Choose rock, paper, or scissors.");
            return;
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (userChoice === botChoice) {
            message.channel.send(`It's a tie! We both chose ${botChoice}.`);
        } else if (
            (userChoice === "rock" && botChoice === "scissors") ||
            (userChoice === "paper" && botChoice === "rock") ||
            (userChoice === "scissors" && botChoice === "paper")
        ) {
            message.channel.send(`You win! I chose ${botChoice}.`);
        } else {
            message.channel.send(`I win! I chose ${botChoice}.`);
        }
    },
};