module.exports = (client) => {
    client.briefing = client.channels.find('name', 'briefing');
    console.log(client.config.BOT_NAME + ' is ready !!!');
};
