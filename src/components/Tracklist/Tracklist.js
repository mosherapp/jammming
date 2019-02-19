import React from 'react';
import Track from '../Track/Track';

const Tracklist = props => {
  return (
    <div className="TrackList">
      {props.tracks.map(track => {
        return <Track
          key={track.id}
          track={track}
          actionText={props.trackActionText}
          onAction={props.onAction}
        />
      })}
    </div>
  );
};

export default Tracklist;