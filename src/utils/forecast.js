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
            const { summary, temperatureMin, temperatureMax, humidity, percipType } = daily.data[0]
            console.log(daily.data[0])
            weatherData = `It is currently ${Math.round(temperature)}F degrees out \
            with a high of ${Math.round(temperatureMax)}F and a low of ${Math.round(temperatureMin)}F.\
            The current humidity is ${humidity * 100}%.\
            ${summary}
            There is a ${precipProbability * 100}% chance of ${percipType || 'perciptation'}.\ `
            callback(undefined, weatherData)
        }
    });
}

module.exports = forecast;