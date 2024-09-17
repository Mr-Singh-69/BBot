const prefix = "#";
const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();


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
                "I told my wife she was drawing her eyebrows too high. She looked surprised.",
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "I used to play piano by ear, but now I use my hands.",
                "Why did the bicycle fall over? It was two-tired!",
                "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them!",
                "I’m reading a book on anti-gravity. It’s impossible to put down!",
                "Why don’t eggs tell jokes? They’d crack each other up!",
                "What do you call fake spaghetti? An impasta!",
                "I would avoid the sushi if I was you. It’s a little fishy."
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.channel.send(randomJoke);
        }


        else if (command === 'roast') {
            const roasts = [
                "You're like a cloud. When you disappear, it's a beautiful day.",
                "I'd agree with you but then we’d both be wrong.",
                "You're proof that even a bad haircut can grow back.",
                "I’m not insulting you, I’m describing you.",
                "You bring everyone so much joy... when you leave the room.",
                "If I wanted to hear from an expert, I’d ask your opinion.",
                "Some drink from the fountain of knowledge, but it looks like you just gargled.",
                "You're like a software update, whenever I see you, I think 'not now.'",
                "I’d explain it to you, but I left my crayons at home.",
                "Your secrets are always safe with me. I never even listen when you tell them.",
                "You have something on your chin… no, the third one down."
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

else if (command === 'nuke') {
      
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return message.channel.send('You do not have the necessary permissions to nuke this channel.');
            }

       
            message.channel.send('Are you sure you want to nuke this channel? Type `#confirmnuke` to proceed.');

      
            const filter = (m) => m.author.id === message.author.id && m.content.toLowerCase() === '#confirmnuke';
            const collector = message.channel.createMessageCollector({ filter, time: 10000, max: 1 });

            collector.on('collect', async () => {
                const channelPosition = message.channel.position;

       
                const newChannel = await message.channel.clone();

                await newChannel.setPosition(channelPosition);

           
                await message.channel.delete();

           
                newChannel.send('💥 Channel has been nuked! 💥');
            });

            collector.on('end', (collected) => {
                if (collected.size === 0) {
                    message.channel.send('Nuke operation canceled. You did not confirm in time.');
                }
        }
    },
};
