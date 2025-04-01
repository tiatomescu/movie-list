import { useContext, useState } from 'react';
import UpdateContext from '../Contexts/UpdateContext';

const Add = () => {
  const {update, setUpdate} = useContext(UpdateContext);
  const [movieTitle, setMovieTitle] = useState('');

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

  return (
    <>
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
    </>
  );
};

export default Add;