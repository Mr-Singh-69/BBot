const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'configure',
    async execute(message, args) {
        
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('I do not have permission to manage roles.');
        }

       
        const botRole = message.guild.members.me.roles.highest;

 
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position);

      
        if (botRole.position === roles.first().position) {
            return message.channel.send('My role is already at the top of the hierarchy.');
        }

        try {
          
            const highestRolePosition = roles.first().position;

        
            await botRole.setPosition(highestRolePosition + 30); 
            message.channel.send('My role has been moved to the top of the hierarchy.');
        } catch (error) {
            console.error('Error moving bot role to the top:', error);
            message.channel.send('There was an error trying to move my role to the top.');
        }
    },
};
