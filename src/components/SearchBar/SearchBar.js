import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  return (
    <div className="SearchBar">
      <input onChange={props.onInputChange} placeholder="Enter A Song Title" />
      <a href="#" onClick={props.onSearch}>SEARCH</a>
    </div>
  );
};

export default SearchBar;