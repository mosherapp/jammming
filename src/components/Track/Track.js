import React from 'react';

/**
 * Stateless React Track Component
 * @param {Object} props
 * @param {Object} props.track - An object with the track info
 * @param {string} props.track.name
 * @param {string} props.track.artist
 * @param {string} props.track.album
 * @param {string} props.actionText - Either + or -
 * @param props.onAction
 */
const Track = props => {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      <a
        href="about:blank"
        className="Track-action"
        onClick={(e) => {e.preventDefault();props.onAction(props.track); return;}}>{props.actionText}
      </a>
    </div>
  );
};

export default Track;