import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Spotify: Spotify,
      SearchBarValue: '',
      SearchResults: [],
      Playlist: [],
      PlaylistName: 'New Playlist',
    };
  }
  handleSearch() {
    this.state.Spotify.getAccessToken();
    if(this.state.Spotify.accessToken === '') {
      return;
    }
    this.state.Spotify.search(this.state.SearchBarValue).then((data) => {
      this.setState( {SearchResults: data} );
    });
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
    this.state.Spotify.savePlaylist(this.state.PlaylistName, this.state.Playlist)
    .then(() => {
      this.setState({Playlist: [], PlaylistName: 'New Playlist'});
    });
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
              onSave={this.handlePlaylistSave.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
