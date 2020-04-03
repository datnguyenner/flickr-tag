import React, { Component } from 'react';
import SearchBar from './SearchBar';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      tag: ''
    }
  }

  fetchImages = () => {
    const JSON_CALLBACK = (json) => {
      const { items } = json;
      const images = items.map(item => {
        return { title: item.title, source: item.media.m }; //Extract title and link from json
      })
      this.setState({ images });
    }
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=" + this.state.tag + "&format=json&jsoncallback=?", JSON_CALLBACK);
  }

  onInputChange = (e) => {
    this.setState({ tag: e.target.value });
  }

  renderImageCards = () => {
    let cards = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <div className="polaroid">
            <img src={image.source} alt={image.title} style={{ width: '100%' }} />
            <div className="container">
              <p>{image.title}</p>
            </div>
          </div>
        </li>
      )
    })

    return cards;
  }

  render() {
    return (
      <div className="App">
        <SearchBar onInputSubmit={this.fetchImages} onInputChange={this.onInputChange} />
        <ul>
          {this.renderImageCards()}
        </ul>
      </div>
    );
  }
}

export default App;