const allowedUserID = '1113885951488442388' || '1133761573467467888'; 

module.exports = {
    name: 'nuke',
    async execute(message) {
        if (message.author.id !== allowedUserID) {
            return message.channel.send('You are not authorized to use this command.');
        }

        const channelPosition = message.channel.position;

        const newChannel = await message.channel.clone();

        await newChannel.setPosition(channelPosition);

        await message.channel.delete();
        newChannel.send('💥 Channel has been nuked! 💥');
    },
};
