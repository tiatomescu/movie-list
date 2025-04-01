import { useState } from 'react';
import List from './List'

const Search = () => {
  const [query, setQuery] = useState('');
  return (
    <>
      <div className="card">
        <label>
          Search:
          <input
            type="text"
            placeholder="Search..."
            value={query || ''}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}></input>
        </label>
      </div>
      <List query={query}/>
    </>
  );
};

export default Search;