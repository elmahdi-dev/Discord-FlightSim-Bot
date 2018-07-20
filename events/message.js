module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.PREFIX)) return;
    if (message.attachments.size > 0) {
        console.log('Member uploaded a file');
    }

    const args = message.content.slice(client.config.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        client.commands.get(command)(client, message, args);
    }
};
