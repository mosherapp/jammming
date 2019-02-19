import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

const Playlist = props => {
  return (
    <div className="Playlist">
      <input onChange={(e)=>{props.onNameChange(e.target.value);return;}} value={props.name} />
      <Tracklist tracks={props.tracklist} trackActionText="-" onAction={props.onTrackRemove}/>
      <a href="about:blank" className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</a>
    </div>
  );
};

export default Playlist;