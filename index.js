const express = require('express')
const app = express()

// Otetaan jsonparser käyttöön POSTia varten
app.use(express.json())

const generateNewID = () => {
    // Muodostetaan persons-taulukon id-kentistä uusi taulukko
    // ... on spread-syntaksi, jolla saadaan taulukosta yksittäiset luvut
    // Haetaan suurin luku tai jos taulukko on tyhjä, otetaan perustaksi nolla
    
    const randomValue = () => {
        return Math.floor(Math.random() * 9999999)
    }

    let returnValue = 0
    const personIDs = [...persons].map(n => n.id)

    console.log(personIDs)

    for (let i = 0; i < personIDs.length; i++) {
        returnValue = randomValue()

        if (!personIDs.some(id => id === returnValue))
            return returnValue
    }
        
    return -1
}

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

// Jos mennään suoraan vain localhost 3001, saadaan vastaukseksi tämä
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Yksittäisen resurssin eli henkilön haku
// Hae parametrina annettua id:tä vastaava hlö taulukosta
// Huomioi, että vertailu tehdään == avulla eikä ===, sillä parametrina saadaan merkkijono eikä luku
// Näin ollen ===-vertailu on false, sillä string != number
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)

    if (person)
        res.json(person)
    else
        res.status(404).end()
})

// Resurssin poistaminen
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// Resurssin lisääminen
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'data missing'
        })
    }

    if (persons.some(person => person.name == body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateNewID(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})