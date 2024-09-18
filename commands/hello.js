module.exports = {
    name: 'hello',
    async execute(message) {
        let user = message.mentions.users.first() || message.author;
        message.channel.send(`Hello! ${user.username}, how may I help?`);
    },
};