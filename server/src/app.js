const express = require('express');
const app = express();
const knex = require('knex')(require('../knexfile.js')["development"]);
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

  foundMovie.length == 1 ? res.status(200).json(foundMovie) : res.status(404).json({message: "Movie not found :("})
})

module.exports = app;