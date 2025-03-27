const express = require('express');
const app = express();
const knex = require('knex')(require('../knexfile.js')["development"]);
const cors = require('cors');

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(express.json());
app.use(cors(corsOptions));

//R
app.get('/movies', (req, res) => {
  knex('movies')
  .select('*')
  .then(movie_list => {
    let movieList = movie_list.map(movie => {return {...movie}})
    res.status(200).json(movieList);
  })
})

app.get('/movies/:id', async (req, res) => {
  const foundMovie = await knex('movies')
  .select('*')
  .where('id', req.params.id)

  foundMovie.length == 1
    ? res.status(200).json(foundMovie)
    : res.status(404).json({message: "Movie not found :("})
})

//C
app.post('/movies', (req, res) => {
  let { title } = req.body
  knex('movies')
  .insert(req.body)
  .then(() => {
    res.status(201).json({message: `${title} added to movie list :D`})
  })
})

//U
app.patch('/movies/:id', async (req, res) => {
  const updatedMovie = await knex('movies')
  .where('id', req.params.id)
  .update(req.body)

  updatedMovie == 1
    ? res.status(200).json({message: 'Movie updated successfully :D'})
    : res.status(404).json({message: 'Movie does not exist :('})
})

//D
app.delete('/movies/:id', (req, res) => {
  knex('movies')
  .where('id', req.params.id)
  .del()
  .then((rowsDeleted) => {
    rowsDeleted == 1
      ? res.status(200).json({message: "Movie deleted from system >:)"})
      : res.status(404).json({message: "Movie does not exist :("})
  })
})

module.exports = app;