module.exports = {
    name: 'msgch',
    async execute(message, args) {
            let user = message.mentions.users.first() || message.author; 
            let count = 0;

            async function fetchMessagesInChannel(lastMessageId = null) {
                const options = { limit: 100 };
                if (lastMessageId) {
                    options.before = lastMessageId; 
                }

                const messages = await message.channel.messages.fetch(options);
                const userMessages = messages.filter(msg => msg.author.id === user.id);
                count += userMessages.size;

                if (messages.size === 100) {
                    await fetchMessagesInChannel(messages.last().id); 
                }
            }
            await fetchMessagesInChannel();

            message.channel.send(`${user.username} has sent ${count} messages in this channel.`);
        
        }
}