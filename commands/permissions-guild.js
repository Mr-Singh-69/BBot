const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildpermissions')
        .setDescription('Check which permissions the bot has in the server'),
    
    async execute(interaction) {
       
        const botMember = await interaction.guild.members.fetch(interaction.client.user.id);


        const guildPermissions = botMember.permissions;

  
        const permissions = Object.keys(PermissionsBitField.Flags)
            .filter(perm => guildPermissions.has(perm));

      
        const permissionsList = permissions.map(perm => `\`${perm}\``).join(', ');

       
        await interaction.reply({
            content: `Here are the permissions I have in this server: ${permissionsList || 'No permissions.'}`,
            ephemeral: true, 
        });
    },
};
