const express = require('express');
const app = express();

const Person = require('./models/person')

const morgan = require('morgan')
const bodyParser = require('body-parser')

morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms - :body'))

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

//let persons = [
   /*  { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    } */
//]

app.get('/api/persons', (request, response) => {
    //console.log('Entra /api/persons');
    Person.find({}).then(person => {  
        //console.log(persona);
              
        response.json(person);
    })
    
})

app.get('/info', (request, response) => {
    let date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        Person.findById(request.params.id).then(person => {
            response.json(person)
        })
        
    } else {
        response.statusMessage = "Person missing"
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * (10000 - 1) + 1)
}

const personExist = (name) => {
    let filtre = persons.filter(person => person.name === name)

    if(filtre.length > 0) {
        return true
    } else {
         return false
        }
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body);
    

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    Person.find({name: body.name}).then(person => {  
        //console.log(persona);
        if(person.length > 0) {
            return response.status(400).json({
            error: 'name must be unique'
            })
        } else {
            const person = new Person({
            name: body.name,
            number: body.number,
            })
    
            person.save().then(result => {
            console.log(`added ${body.name} number ${body.number} to phonebook`)
            })
        }
    })

    /* if(personExist(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            name: body.name, 
            number: body.number,
            id: generateId(),
        }

        //persons = persons.concat(person)
        console.log(person)        
        response.json(person)
    } */
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
