import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const API = '/requests/'
const DEFAULT_QUERY = 'status.json'
// https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerState: [],
      title: null,
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('something went wrong')
        }
      })
      .then(data => this.setState({ playerState: data, title: data.information.category.meta.filename, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { playerState, title, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            VLC is {playerState.state} - {title}
          </a>
        </header>
      </div>
    );
  }
}



export default App;
