// server.js
const {MongoClient} = require('mongodb');
const express = require('express')
const app = express() // initialize app
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json();
const port = 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const uri = "mongodb+srv://admin:admin@cluster0.psjtu.mongodb.net/movies?retryWrites=true&w=majority";
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const database = client.db('movies');
    const movies = database.collection('movies_list');

    app.post('/movies', jsonParser, (req, res, next) => {
      data = JSON.stringify(req.body)
      console.log(data)
      movies.insertOne(JSON.parse(data))
        .then(result => {
          res.send(result)
        })
        .catch(error => console.error(error))
    })

    app.get('/getMovies', jsonParser, (req, res, next) => {
      console.log(req.query.user)
      database.collection('movies_list').find({user: req.query.user}).toArray()
        .then(results => {
          console.log(results)
          res.send(results)
        })
        .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))

// GET callback function returns a response message
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Node.js')
})
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


app.post('/test', (req, res) => {
  res.send('Hello World! Welcome to Node.js')
  console.log(req.body)
})
