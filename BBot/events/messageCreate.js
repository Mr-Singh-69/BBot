const prefix = "~";

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command!');
        }
    },
};