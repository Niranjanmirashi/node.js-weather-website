const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/3a73026bff4839b884c47e911b463220/' + lon + ','+ lat + '?units=si'
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined , body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' and has ' + body.currently.precipProbability + '% chance of rain. \nTemperature high : ' + body.daily.data[0].temperatureHigh + '.\n Temperature low : '+ body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast