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
    Person.find({}).then(person => {
        response.json(person);
    })

})

app.get('/info', (request, response, next) => {
    Person.find({})
        .then(person => {
        let date = new Date();
        response.send(`<p>Phonebook has info for ${person.length} people</p><p>${date}</p>`)
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    /* const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        Person.findById(request.params.id).then(person => {
            response.json(person)
        })

    } else {
        response.statusMessage = "Person missing"
        response.status(404).end()
    } */
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id);

    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(result);
            result
            ? console.log('Eliminated person')
            : console.log('Person not found')

            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    console.log(body);


    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    Person.find({ name: body.name }).then(p => {
        if(p.length > 0) {
            return response.status(400).json({
            error: 'name must be unique'
            })
        } else {

            person.save().then(result => {
            console.log(`added ${body.name} number ${body.number} to phonebook`)
            response.json(result)
            })
            .catch(error => next(error))
        }
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)

}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
