const express = require('express')
const app = express()

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

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})