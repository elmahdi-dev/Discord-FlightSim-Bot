module.exports = (client, message, args) => {
    let icaos = args.join(',');
    let options = {
        uri: `${client.apiLink}/airport/${icaos}`,
        headers: {
            'Api-Key': client.config.API_KEY,
        },
        json: true,
    };
    client.request(options)
        .then( (data) => {
             args.forEach((id) => {
                let airport = data[id][0];
                let runways = data[id][1];
                let metar = data[id][2][0] || 'METAR Unavailable.';
                let flightPlan = '```markdown\n';
                flightPlan += `#${airport.Ident} ${airport.Name} ELEV ${airport.Elevation}ft\n`;
                flightPlan += `#METAR: ${metar.substr(5)}\n`;
                runways.forEach( (runway) => {
                    flightPlan += `RNY ${runway.Designator}, ${runway.Length}ft/${runway.Width}ft, True heading ${runway.TrueHeading}, Variation ${runway.Variation}`;
                    if (runway.ILSFrequency) {
                        flightPlan += `, ILS Freq ${runway.ILSFrequency}, ILS Cat ${runway.ILSCategory}\n`;
                    } else {
                        flightPlan += '\n';
                    }
                });
                flightPlan += '```';
                 client.briefing.send(flightPlan).then( () => {
                    message.delete();
                }).catch(console.error);
            });
        }).catch(console.error);
};
