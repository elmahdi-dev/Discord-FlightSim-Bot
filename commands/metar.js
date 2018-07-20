module.exports = (client, message, args) => {
    let icaos = args.join(',');
    let options = {
        uri: `${client.apiLink}/metar/${icaos}`,
        headers: {
            'Api-Key': client.config.API_KEY,
        },
        json: true,
    };
    client.request(options)
        .then( (data) => {
            data.forEach( (element) => {
                let metar = '```markdown\n#' + element[0] + '\n```';
                client.briefing.send(metar).then().catch(console.error);
            });
        })
        .catch(console.error);
};
