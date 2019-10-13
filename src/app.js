const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abe Anderson'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abe Anderson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abe Anderson',
        helpMessage: 'Do you need help with something?'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){ return res.send({ error: 'You must provide an address' }); } 
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) { return res.send({ error }) }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){ return res.send({ error }) }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abe Anderson',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abe Anderson',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})