import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PizzaApp from './components/pizzaApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PizzaApp/>
      </div>
    );
  }
}

export default App;
