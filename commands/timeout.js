const allowedUserID = '1113885951488442388' || '1133761573467467888'; 

module.exports = {
    name: 'timeout',
    async execute(message, args) {
        if (message.author.id !== allowedUserID) {
            return message.channel.send('You are not authorized to use this command.');
        }

        const user = message.mentions.members.first();
        const duration = parseInt(args[1], 10); 

        if (!user) {
            return message.channel.send('Please mention a user to time out.');
        }

        if (isNaN(duration) || duration <= 0) {
            return message.channel.send('Please provide a valid time in minutes.');
        }

        const timeoutDuration = duration * 60 * 1000; 

        try {
            await user.timeout(timeoutDuration, `Timed out by ${message.author.tag} for ${duration} minutes.`);
            message.channel.send(`${user.user.username} has been timed out for ${duration} minutes.`);
        } catch (error) {
            message.channel.send('Failed to timeout the user. Do I have the right permissions?');
        }
    },
};
