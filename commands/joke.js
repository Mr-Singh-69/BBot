module.exports = {
    name: 'joke',
    async execute(message) {
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        message.channel.send(randomJoke);
    },
};
