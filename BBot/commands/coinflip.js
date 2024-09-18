module.exports = {
    name: 'coinflip',
    async execute(message) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        message.channel.send(`The coin landed on: ${result}`);
    },
};