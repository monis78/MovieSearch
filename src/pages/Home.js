import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  
  return (
    <div className="homeScreenContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/search');
        }}
      >
        <label htmlFor="search">Search for a genres: </label>
        <input
          value={inputValue}
          name="search"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Home