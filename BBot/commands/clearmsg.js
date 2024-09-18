module.exports = {
    name: 'clearmsg',
    async execute(message, args) {
        const user = message.mentions.users.first();
        const deleteCount = parseInt(args[1], 10);

        if (!user) {
            return message.channel.send('Please mention a user whose messages you want to delete.');
        }

        if (isNaN(deleteCount) || deleteCount <= 0) {
            return message.channel.send('Please provide a valid number of messages to delete.');
        }

        const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
        const userMessages = fetchedMessages.filter(msg => msg.author.id === user.id).first(deleteCount);

        message.channel.bulkDelete(userMessages)
            .then(deleted => message.channel.send(`Deleted ${deleted.size} messages from ${user.username}.`))
            .catch(error => message.channel.send('Error deleting messages. Ensure they are not older than 14 days.'));
    },
};