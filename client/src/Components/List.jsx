import { useContext } from 'react';
import MovieContext from '../Contexts/MovieContext.jsx'
import MovieCard from './MovieCard';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const List = (query) => {
  const {movies} = useContext(MovieContext);

  const search = (term) => {
    return movies.filter((movie) => {return movie.title.toLowerCase().includes(term)})
  };

  return (
    <>
      <h2>My Movies</h2>
      <div className='my-movies'>
        <div className='movie-list'>
          {search(query.query).map((movie) => {
            return(<MovieCard key={movie.id} movie={movie}/>)
          })}
        </div>
        <div className='watched-list'>
          {search(query.query).map((movie) => {
            return(<MovieCard key={movie.id} movie={movie}/>)
          })}
        </div>
      </div>
    </>
  );
};

export default List;