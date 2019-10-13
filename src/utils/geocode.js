const request = require('request');
const mapBoxToken = 'pk.eyJ1IjoiYW1lcmljb29sIiwiYSI6ImNqeDgyMmI5YTBnbGgzcXBiNWxzZWR6NGgifQ.I-GKRf_Bjr6bCOlwM6U3Uw'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxToken}&limit=1`;
    request({ url, json: true }, (error, response) => {
        const { features } = response.body
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!features.length) {
            callback('Unable to find location try another search', undefined)
        } else {
            const { center, place_name } = features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode;