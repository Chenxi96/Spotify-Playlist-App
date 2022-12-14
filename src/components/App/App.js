import { SearchResults } from '../SearchResult/SearchResult';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {Playlist} from '../Playlist/playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playListName: 'My Playlist',

      playListTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  savePlaylist() {
    const trackUris = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackUris).then( () => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      })
    })
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  addTrack(track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    this.state.playListTracks.push(track);
    this.setState({playListTracks: this.state.playListTracks})
  }

  removeTrack(track) {
    this.setState({ playListTracks: this.state.playListTracks.filter(currentTrack => currentTrack.id !== track.id)})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack}  
            />
            <Playlist 
            playlistTracks={this.state.playListTracks} 
            playlistName={this.state.playListName} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}


export default App;
