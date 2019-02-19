
const clientId = 'c95b253f00ed493ea8db7582c0a2b53a';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  accessToken: '',
  getAccessToken: function() {
    if(this.accessToken === '' && window.location.href.match(/access_token=([^&]*)/) === null){
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  },
  
};

export default Spotify;