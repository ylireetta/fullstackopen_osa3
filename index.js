require('dotenv').config() // Saadaan .env-tiedostossa olevat ympäristömuuttujat käyttöön
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// Otetaan muuttujan arvoksi mooduulissa määritelty olio
const Contact = require('./models/contact')

const app = express()

// Tarkistetaan GET-pyyntöjen yhteydessä, löytyykö pyydettyä polkua vastaavaa tiedostoa build-hakemistosta
app.use(express.static('build'))

// Otetaan jsonparser käyttöön POSTia varten
app.use(express.json())

app.use(cors())

morgan.token('body', function(request) {
    return JSON.stringify(request.body)
})

// Ota mukaan lähetetty data jsonina, jos pyynnön metodi on POST (eli skippaa tämä jos ei ole POST)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: function (request) {
        return request.method !== 'POST'
    }
}))

// Käytä tiny-muotoilua, jos pyynnön metodi ei ole POST (eli skippaa tämä jos pyyntö on POST)
app.use(morgan('tiny', {
    skip: function(request) {
        return request.method === 'POST'
    }
}))


// Resurssin lisääminen
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Contact({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

// Haetaan objektit MongoDB:sta
app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

// Yksittäisen resurssin eli henkilön haku
// Hae parametrina annettua id:tä vastaava hlö taulukosta
// Huomioi, että vertailu tehdään == avulla eikä ===, sillä parametrina saadaan merkkijono eikä luku
// Näin ollen ===-vertailu on false, sillä string != number
app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error)) // Siirretään virhe middlewaren käsiteltäväksi
})


// Resurssin poistaminen
app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(response.status(204).end())
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number
    }

    // Käytetään paramteria new: true, jotta saadaan palautettua nimenomaan muuttunut olio eikä alkutilannetta
    Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Contact.find({}).count().then(countOf => response.send(`<p>Phonebook has info for ${countOf} people</p>
    <p>${new Date()}</p>`))
})


// Middlewaret rekisteröidään routejen (eli get, post, delete...) jälkeen oikeaoppisessa järjestyksessä, jotta ne toimivat halutulla tavalla
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint) // Olemattomien osoitteiden käsittely


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler) // HUOM! Tämä tulee rekisteröidä vasta muiden middlewarejen jälkeen, sillä ne suoritetaan rekisteröimisjärjestyksessä

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})