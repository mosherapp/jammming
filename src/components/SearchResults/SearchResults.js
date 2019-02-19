import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

const SearchResults = props => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={props.tracklist} trackActionText="+" onAction={props.onAddToPlaylist}/>
    </div>
  );
};

export default SearchResults;