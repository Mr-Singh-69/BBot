module.exports = {
    name: 'roast',
    async execute(message) {
        const roasts = [
            "You're like a cloud. When you disappear, it's a beautiful day.",
            "I'd agree with you but then we’d both be wrong.",
            "You're proof that even a bad haircut can grow back."
        ];
        let user = message.mentions.users.first() || message.author;
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        message.channel.send(`${user.username}, ${randomRoast}`);
    },
};