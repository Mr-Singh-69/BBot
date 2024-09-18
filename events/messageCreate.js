const prefix = "#";
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();
        const allowedUserID = '1113885951488442388'; 

        if (command === 'ping') {
            message.channel.send(`Pong! Latency is ${message.client.ws.ping}ms.`);
        }

        else if (command === 'hello') {
            let user = message.mentions.users.first() || message.author;
            message.channel.send(`Hello! ${user.username}, how may I help?`);
        }

        else if (command === 'coinflip') {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            message.channel.send(`The coin landed on: ${result}`);
        }

        else if (command === 'about') {
            message.channel.send("Ehsan Quddusi is an Indian politician known for his involvement in various controversies, particularly relating to corruption. He has served as a judge and was a former Orissa High Court judge.");
        }

        else if (command === 'joke') {
            const jokes = [
                "Why don't skeletons fight each other? They don't have the guts!",
            
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.channel.send(randomJoke);
        }

        else if (command === 'roast') {
            const roasts = [
                "You're like a cloud. When you disappear, it's a beautiful day.",
         
            ];
            let user = message.mentions.users.first() || message.author;
            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
            message.channel.send(`${user.username}, ${randomRoast}`);
        }

        else if (command === 'rps') {
            const choices = ["rock", "paper", "scissors"];
            const userChoice = args[0]?.toLowerCase();

            if (!userChoice || !choices.includes(userChoice)) {
                message.channel.send("Invalid choice! Choose rock, paper, or scissors.");
                return;
            }

            const botChoice = choices[Math.floor(Math.random() * choices.length)];

            if (userChoice === botChoice) {
                message.channel.send(`It's a tie! We both chose ${botChoice}.`);
            } else if (
                (userChoice === "rock" && botChoice === "scissors") ||
                (userChoice === "paper" && botChoice === "rock") ||
                (userChoice === "scissors" && botChoice === "paper")
            ) {
                message.channel.send(`You win! I chose ${botChoice}.`);
            } else {
                message.channel.send(`I win! I chose ${botChoice}.`);
            }
        }

        else if (command === 'guildpermissions') {
            const botMember = await message.guild.members.fetch(message.client.user.id);
            const guildPermissions = botMember.permissions;

            const permissions = Object.keys(PermissionsBitField.Flags)
                .filter(perm => guildPermissions.has(perm));

            const permissionsList = permissions.map(perm => `\`${perm}\``).join(', ');

            message.channel.send(`Here are the permissions I have in this server: ${permissionsList || 'No permissions.'}`);
        }

        else if (command === 'clearbot') {
            const deleteCount = parseInt(args[0], 10);

            if (isNaN(deleteCount) || deleteCount <= 0) {
                return message.channel.send('Please provide a valid number of messages to delete.');
            }

            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
            const botMessages = fetchedMessages.filter(msg => msg.author.bot).first(deleteCount);

            message.channel.bulkDelete(botMessages)
                .then(deleted => message.channel.send(`Deleted ${deleted.size} bot messages.`))
                .catch(error => message.channel.send('Error deleting messages. Ensure they are not older than 14 days.'));
        }

        else if (command === 'clearallbot') {
            const deleteCount = parseInt(args[0], 10);

            if (isNaN(deleteCount) || deleteCount <= 0) {
                return message.channel.send('Please provide a valid number of bot messages to delete.');
            }

            const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
            const allBotMessages = fetchedMessages.filter(msg => msg.author.bot).first(deleteCount);

            message.channel.bulkDelete(allBotMessages)
                .then(deleted => message.channel.send(`Deleted ${deleted.size} bot messages.`))
                .catch(error => message.channel.send('Error deleting messages. Ensure they are not older than 14 days.'));
        }

        else if (command === 'clearmsg') {
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
        }

    
        else if (command === 'nuke') {
            if (message.author.id !== allowedUserID) {
                return message.channel.send('You are not authorized to use this command.');
            }

                const channelPosition = message.channel.position;
    
   
                const newChannel = await message.channel.clone();
    
   
                await newChannel.setPosition(channelPosition);
    
    
                await message.channel.delete();
                newChannel.send('💥 Channel has been nuked! 💥');
            });

            
                }
            });
        }

        
        else if (command === 'timeout') {
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
        }
    },
};
