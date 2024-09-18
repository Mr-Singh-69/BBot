module.exports = {
    name: 'ping',
    async execute(message) {
        message.channel.send(`Pong! Latency is ${message.client.ws.ping}ms.`);
    },
};