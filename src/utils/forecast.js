const request = require('request');
const apiKey = '5b20ee300ac1e462bcf18887c77f1dac';

const forecast = (lng, lat, callback) => {
    const url = `https://api.darksky.net/forecast/${apiKey}/${lng},${lat}`;
    request({ url, json: true }, (requestError, response) => {
        const { error, daily, currently } = response.body;
        if (requestError) {
            callback('Unable to connect to weather service!', undefined)
        } else if (error) {
            callback('Unable to find location', undefined)
        } else {
            const { temperature, precipProbability } = currently;
            const { summary } = daily.data[0]
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
        }
    });
}

module.exports = forecast;