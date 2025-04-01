import { useContext } from 'react';
import UpdateContext from '../Contexts/UpdateContext';
import MovieContext from '../Contexts/MovieContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const MovieCard = (movie) => {
  const {update, setUpdate} = useContext(UpdateContext);
  const {movies} = useContext(MovieContext);

  const handleChange = () => {
    let watchedStatus = movie.movie.watched === true ? false : true;

    fetch(`http://localhost:8080/movies/${movie.movie.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watched: watchedStatus })
    })
    .then(() => update == 1 ? setUpdate(0) : setUpdate(1))
    .catch(err => console.log(err))
  }

  return(
    <>
      <Card sx={{ minWidth: 275 }} className="movie-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {`${movie.movie.title}`}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControlLabel
          control={<Switch />}
          checked={movies.filter(mov => {return mov.id == movie.movie.id})[0].watched}
          onChange={handleChange}
          label="Watched"
          size="small"
        />
      </CardActions>
    </Card>
    </>
  )
}

export default MovieCard;