
const clientId = 'c95b253f00ed493ea8db7582c0a2b53a';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  accessToken: '',
  clientId: 'c95b253f00ed493ea8db7582c0a2b53a',
  getAccessToken: function() {
    if(this.accessToken === '' && window.location.href.match(/access_token=([^&]*)/) === null){
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    } else if (this.accessToken) {
      return;
    } else {
      this.accessToken = window.location.href.match(
        /access_token=([^&]*)/
      )[1];
      window.setTimeout(() => this.accessToken = '',
      Number(window.location.href.match(
        /expires_in=([^&]*)/
      )[1]) * 1000);
    }
  },
  search(text) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${text}`, {
      headers: {Authorization: `Bearer ${this.accessToken}`}
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      console.log(myJson);
      // Example Object {id: 1, name: 'Name1', artist: 'artist', album: 'album', uri: ''},
      if (myJson.tracks.items.length < 1) { return []; }
      return myJson.tracks.items.map((item)=>{ 
        return {id: item.id, name: item.name, artist: item.artists[0].name, album: item.album.name, uri: item.uri}; 
      });
    });
  },
  savePlaylist(name, tracks) {
    const header = {Authorization: `Bearer ${this.accessToken}` };
    let userId = '';
    if(!name && !tracks) { return; }
    // Fetch users id
    return fetch('https://api.spotify.com/v1/me', { headers: header })
      .then(response => response.json())
      .then(json=> json.id)
      .then(
      (id) => {
        userId = id;
        return fetch(
          `https://api.spotify.com/v1/users/${id}/playlists`,
          { headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' }, method: 'POST', body: {name: name} }
        );
      })
      .then(response => response.json())
      .then(json => json.id)
      .then(
      (id) => {
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`,
          { headers: {...header, 'Content-Type': 'application/json' }, method: 'POST', body: {uris: tracks.map(item => item.uri)} }
        );
      })
  },
};

export default Spotify;