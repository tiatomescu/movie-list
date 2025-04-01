import { useContext, useState } from 'react';
import MovieContext from '../Contexts/MovieContext';
import UpdateContext from '../Contexts/UpdateContext';
//MUI things
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Delete = () => {
  const {movies, setMovies} = useContext(MovieContext);
  const {update, setUpdate} = useContext(UpdateContext);
  const [movieDel, setMovieDel] = useState('');

  const handleDelete = () => {
    const indexToDel = movies.filter((movie) => {return movie.title == movieDel})[0]["id"]
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

  return (
    <>
      <h2>Delete a Movie</h2>
      <form onSubmit={handleDelete}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Movies</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={movieDel}
              label="Movies"
              onChange={(event) => setMovieDel(event.target.value)}
            >
              {movies.map((movie, i) => {
                return(<MenuItem key={i} value={movie.title}>{movie.title}</MenuItem>)
              })}
            </Select>
        </FormControl>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Delete;