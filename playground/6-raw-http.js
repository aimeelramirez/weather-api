const https = require('https')
const url = 'https://api.darksky.net/forecast/5d6304bbe0f3e8dfcfac3d2d53706e3f/37.8267,-122.4233'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()