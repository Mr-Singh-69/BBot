const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: 'guildpermissions',
    async execute(message) {
        const botMember = await message.guild.members.fetch(message.client.user.id);
        const guildPermissions = botMember.permissions;

        const permissions = Object.keys(PermissionsBitField.Flags)
            .filter(perm => guildPermissions.has(perm));

        const permissionsList = permissions.map(perm => `\`${perm}\``).join(', ');

        message.channel.send(`Here are the permissions I have in this server: ${permissionsList || 'No permissions.'}`);
    },
};