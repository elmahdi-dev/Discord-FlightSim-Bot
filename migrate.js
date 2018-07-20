const fs = require('fs');
const request = require('request-promise');
const {API_KEY} = require('./config.json');

fs.readFile('./airports.txt', 'utf8', (error, data) => {
    if (error) {
        return console.log(error);
    } else {
        // retreive airports
        let airportsRegEx = /((?:A,.*)(?:(\r?\n|.*)(?:(?:R,.*)(?:\r?\n|.*))+))/gm;
        let airports = data.match(airportsRegEx);
        // retreive one airport
        airports.forEach( (data) => {
            let airportRegEx = /^(A,.*)/;
            let runwayRegEx = /^(?:(R,[A-Za-z0-9,.-]+))(?:\r?\n?)/gm;
            let airport = data.match(airportRegEx)[1].split(',');
            let runways = data.match(runwayRegEx);
            // set airport informations :
            let airportIcao = airport[1];
            let airportName = airport[2];
            let airportLat = airport[3];
            let airportLong = airport[4];
            let airportElevation = airport[5];
            let airportUnknown1 = airport[6];
            let airportUnknown2 = airport[7];
            let airportUnknown3 = airport[8];
            let airportUnknown4 = airport[9];

            // FIXME: Send airport informations to server
            let airportOptions = {
              uri: 'http://localhost:8000/',
              headers: {
                  'Api-Key': API_KEY,
              },
            };
            request
                .post(airportOptions)
                .form({
                   key: 'value',
                });
            runways.forEach( (data) => {
                // R,35R,346,12205,148,1,109.900,346,33.351794,-7.582483,656,2.70,52,1,0
                // runway 35R, runway heading 346, length 12205, width 148, it has ils, ils freq 109.900, lat, long, ils angle 2.7
                let runway = data.split(',');
                let runwayDesignator = runway[1];
                let runwayHeading = runway[2];
                let runwayLength = runway[3];
                let runwayWidth = runway[4];
                let runwayILS = runway[5];
                let runwayILSFreq = runway[6];
                let runwayLat = runway[7];
                let runwayLong = runway[8];
                let runwayElevation = runway[9];
                let runwayILSAngle = runway[10];
                let runwayTHC = runway[11];
                let runwayUnknown1 = runway[12];
                let runwayUnknown2 = runway[13];
                console.log(`${runwayDesignator}: ${runwayLength}/${runwayWidth} ILS ${runwayILSFreq}`);
            });
        });
    }
});
