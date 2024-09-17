const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permissions')
        .setDescription('Check which permissions the bot has in this channel'),
    
    async execute(interaction) {
        const botMember = await interaction.guild.members.fetch(interaction.client.user.id);
        const channelPermissions = botMember.permissionsIn(interaction.channel);

  
        const permissions = Object.keys(PermissionsBitField.Flags)
            .filter(perm => channelPermissions.has(perm));


        const permissionsList = permissions.map(perm => `\`${perm}\``).join(', ');


        await interaction.reply({
            content: `Here are the permissions I have in this channel: ${permissionsList || 'No permissions.'}`,
            ephemeral: true,  
    },
};

