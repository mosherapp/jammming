import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

const tracksTemp = [
  {id: 1, name: 'Name1', artist: 'artist', album: 'album'},
  {id: 2, name: 'Name2', artist: 'artist', album: 'album'},
  {id: 3, name: 'Name3', artist: 'artist', album: 'album'},
  {id: 4, name: 'Name4', artist: 'artist', album: 'album'},
  {id: 5, name: 'Name5', artist: 'artist', album: 'album'},
  {id: 6, name: 'Name6', artist: 'artist', album: 'album'}
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchBarValue: '',
      SearchResults: tracksTemp,
      Playlist: [],
      PlaylistName: 'New Playlist',
    };
  }
  handleSearch(e) {
    Spotify.getAccessToken();
  }
  handlePlaylistNameChange(name) {
    this.setState({PlaylistName: name});
  }
  /**
   * @param {Object} track
   * @param {string} action - Either add or remove
   */
  handlePlaylistUpdate(action, track) {
    if(this.state.Playlist.find(savedTrack => savedTrack.id === track.id)) {
      if(action === 'remove') {
        this.setState(
          {Playlist: this.state.Playlist.filter(savedTrack => savedTrack.id !== track.id)}
        );
      }
      return;
    } else if(action === 'add') {
      this.setState({Playlist: [...this.state.Playlist, track] });
    }
  }
  handlePlaylistSave() {

  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className="App">
          <SearchBar
            onInputChange={(e) => this.setState({SearchBarValue: e.target.value})}
            onSearch={this.handleSearch.bind(this)}
          />
          <div className="App-playlist">
            <SearchResults
              tracklist={this.state.SearchResults}
              onAddToPlaylist={this.handlePlaylistUpdate.bind(this, 'add')}
            />
            <Playlist
              tracklist={this.state.Playlist}
              name={this.state.PlaylistName}
              onNameChange={this.handlePlaylistNameChange.bind(this)}
              onTrackRemove={this.handlePlaylistUpdate.bind(this, 'remove')}
              onSave={this.handlePlaylistSave}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
