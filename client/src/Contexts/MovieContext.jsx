import { createContext} from "react";

const MovieContext = createContext({movies: [], setMovies: () => {}});

export default MovieContext;