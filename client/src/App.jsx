import { useState, useEffect } from 'react'
import Add from './Components/Add'
import Delete from './Components/Delete'
import Search from './Components/Search'
import UpdateContext from './Contexts/UpdateContext.jsx'
import MovieContext from './Contexts/MovieContext.jsx'
import './App.css'

function App() {
    const [update, setUpdate] = useState(1);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/movies')
        .then(rawData => rawData.json())
        .then(data => setMovies(data))
        .catch((err) => console.log("There was an error!", err))
      }, [update])

  return (
    <UpdateContext.Provider value={{update, setUpdate}}>
      <MovieContext.Provider value={{movies, setMovies}}>
        <div className="main">
          <header>
            <h1>Movie List</h1>
          </header>

          <div className="body">
            <div className="list">
              <Search />
            </div>
            <div className="add">
              <Add />
            </div>
            <div className="delete">
              <Delete />
            </div>
          </div>

          <footer>
            Made by <a href="https://github.com/tiatomescu">@tiatomescu</a>
          </footer>
        </div>
      </MovieContext.Provider>
    </UpdateContext.Provider>
  )
}

export default App
