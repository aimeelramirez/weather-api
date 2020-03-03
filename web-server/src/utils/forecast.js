const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5d6304bbe0f3e8dfcfac3d2d53706e3f/' + latitude +','+ longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const convertTemp =  body.currently.temperature *= -1;
            const convertF = (convertTemp * 9/5) + 32;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + convertF.toFixed(2) + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
   // console.log(body.currently.temperature * -1);     
        }
    })
}

module.exports = forecast