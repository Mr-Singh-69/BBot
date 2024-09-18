module.exports = {
    name: 'msgs',
    async execute(message) {
            let user = message.mentions.users.first() || message.author; 
            let totalMessages = 0;

            async function fetchMessagesInChannel(channel, lastMessageId = null) {
                const options = { limit: 100 };
                if (lastMessageId) {
                    options.before = lastMessageId; 
                }

                const messages = await channel.messages.fetch(options);
                const userMessages = messages.filter(msg => msg.author.id === user.id);
                totalMessages += userMessages.size; 

                
                if (messages.size === 100) {
                    await fetchMessagesInChannel(channel, messages.last().id); 
                }
            }

            
            const channels = message.guild.channels.cache.filter(channel => channel.isTextBased());

            for (const channel of channels.values()) {
                try {
                    await fetchMessagesInChannel(channel);
                } catch (err) {
                    console.error(`Failed to fetch messages in channel ${channel.name}:`, err);
                }
            }

           
            message.channel.send(`${user.username} has sent ${totalMessages} messages in this server.`);
        }

       
    };









    