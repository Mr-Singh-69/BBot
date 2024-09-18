module.exports = {
    name: 'clearbot',
    async execute(message, args) {
        const deleteCount = parseInt(args[0], 10);

        if (isNaN(deleteCount) || deleteCount <= 0) {
            return message.channel.send('Please provide a valid number of messages to delete.');
        }

        const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
        const botMessages = fetchedMessages.filter(msg => msg.author.bot).first(deleteCount);

        message.channel.bulkDelete(botMessages)
            .then(deleted => message.channel.send(`Deleted ${deleted.size} bot messages.`))
            .catch(error => message.channel.send('Error deleting messages. Ensure they are not older than 14 days.'));
    },
};