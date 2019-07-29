const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const chalk = require('chalk')

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.set('views', path.join(__dirname, '../views'))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Niranjan'
    })                                                  //"render" allows us to render our views
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About page',
        name : 'Niranjan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help desk!',
        name : 'Niranjan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        res.send({
            error : 'You must provide an address'
        })
    }else{
        
    geocode(req.query.address ,(error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                res.send({
                    error : error
                })
            }
            res.send({
                location : location,
                forecast : forecastData
            })
      })
})
}
})

//Defining a 404 page
app.get('/help/*',(req,res) =>{
    res.render('errors',{
        title : '404',
        name : 'Niranjan',
        errorMessage : 'Help site under construction'
    })
})

app.get('*',(req,res)=>{
    res.render('errors',{
        title : '404',
        name : 'Niranjan',
        errorMessage : 'Site under construction'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000!')
})







