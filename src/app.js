import express from 'express'
import { join, dirname } from 'path'
import hbs from 'hbs'
import { fileURLToPath } from 'url'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

// finding absolute file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create an Express app
const app = express()
const port = process.env.PORT || 3000

// Define paths for express configs
const publicDir = join(__dirname, '../public')
const viewsPath = join(__dirname, '../templates/views')
const partialsPath = join(__dirname, '../templates/partials')

// Set up handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Dharan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Some usefull text",
        title: "Help",
        name: "Dharan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Dharan"
    })
})

app.get('/weather', async(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    try {
        const loc = await geocode(req.query.address)
        const weather = await forecast(loc)
        res.send(weather)
    } catch (error) {
        res.send({error})
    } 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error",
        name: "Dharan",
        errorText: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Dharan",
        errorText: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})