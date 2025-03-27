import { useState, useEffect } from 'react'
import './App.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [update, setUpdate] = useState(1);
  const [movieDel, setMovieDel] = useState('');

  const handleChange = (event) => {
    setMovieDel(event.target.value);
  };

  const search = (term) => {
    return movie.filter((movie) => {return movie.title.toLowerCase().includes(term)})
  };

  const handleSave = (event) => {
    event.preventDefault();
    const request = {title: movieTitle}

    fetch('http://localhost:8080/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        alert(data.message)
      }
    })
    .then(() => update == 1 ? setUpdate(0) : setUpdate(1))
    .catch(err => console.log(err))
  };

  const handleDelete = () => {
    const indexToDel = movie.filter((movie) => {return movie.title == movieDel})[0]["id"]
    console.log(indexToDel);
    fetch(`http://localhost:8080/movies/${indexToDel}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        alert(data.message)
      }
    })
    .then(() => update == 1 ? setUpdate(0) : setUpdate(1))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch('http://localhost:8080/movies')
    .then(rawData => rawData.json())
    .then(data => setMovie(data))
    .catch((err) => console.log("There was an error!", err))
  }, [update])

  return (
    <>
    <div className="main">
      <header>
        <h1>Movie List</h1>
        <div className="card">
          <label>
            Filter Bar <br/>
            <input
              type="text"
              className="input-box"
              placeholder="Search..."
              value={query || ''}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}></input>
          </label>
        </div>
      </header>

      <div className="body">
          <div className="list">
          <h2>My Movies</h2>
            {search(query).map((movie, i) => {
              return(<p key={i}>{movie.title}</p>)
            })}
          </div>
          <div className="add">
            <h2>Add a Movie</h2>
            <form onSubmit={handleSave}>
              <label>
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Title..."
                    value={movieTitle || ''}
                    onChange={(e) => setMovieTitle(e.target.value)}></input>
                </label>
                <button type="submit">Save</button>
            </form>
          </div>
          <div className="delete">
          <h2>Delete a Movie</h2>
            <form onSubmit={handleDelete}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Movies</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={movieDel}
                    label="Movies"
                    onChange={handleChange}
                  >
                    {movie.map((movie, i) => {
                      return(<MenuItem key={i} value={movie.title}>{movie.title}</MenuItem>)
                    })}
                  </Select>
              </FormControl>
              <button type="submit">Submit</button>
            </form>
          </div>
      </div>
      <footer>
          Made by <a href="https://github.com/tiatomescu">@tiatomescu</a>
        </footer>
    </div>
    </>
  )
}

export default App
