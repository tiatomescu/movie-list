import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/movies')
    .then(rawData => rawData.json())
    .then(data => setMovie(data))
    .catch((err) => console.log("There was an error!", err))
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {movie.map((movie, i) => {
          return(<p key={i}>{movie.title}</p>)
        })}
      </div>
    </>
  )
}

export default App
