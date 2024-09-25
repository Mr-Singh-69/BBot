module.exports = {
    name: 'music',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        const searchQuery = args.join(' ');

        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel,
                connection: null
            }
        });
        
        try {
            if (!queue.connection) {
                await queue.connect(voiceChannel);
                queue.metadata.connection = queue.connection;
            }
        } catch (error) {
            console.error(`Error connecting to voice channel: ${error}`);
            return message.channel.send('Could not join the voice channel.');
        }
        
        if (!voiceChannel) {
            return message.channel.send('You must be in a voice channel to use this command.');
        }

        if (!args[0]) {
            return message.channel.send('Please provide a song to play.');
        }
        else if (args[0] === 'spotify') {
            const spotifyQuery = args.slice(1).join(' ');

            if (!spotifyQuery) {
                return message.channel.send('Please provide a Spotify search query.');
            }

            spotifyApi.searchTracks(spotifyQuery)
                .then(data => {
                    if (data.body.tracks.items.length === 0) {
                        return message.channel.send('No results found on Spotify.');
                    }

                    const track = data.body.tracks.items[0];
                    const trackUrl = track.external_urls.spotify;

                    const spotifyQueue = new Queue(); 
                    spotifyQueue.push({ trackUrl });

                    spotifyQueue.on('ready', () => {
                        const item = spotifyQueue.peek();
                        if (item) {
                            const ytdl = require('ytdl-core');
                            const stream = ytdl(item.trackUrl, { filter: 'audioonly' });
                         
                        }
                    });

                    spotifyQueue.on('empty', () => {
                       
                    });

                    spotifyQueue.start();

                })
                .catch(error => {
                    console.error(`Error searching Spotify: ${error}`);
                    message.channel.send('Error searching Spotify.');
                });
        }
    }
};
