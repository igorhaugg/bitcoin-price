import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    selectedOption: 'USD',
    data: '',
    currentValue: ''
  };

  async componentWillMount() {
    const allData = await axios.get(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    this.setState({
      data: allData.data,
      currentValue: allData.data.bpi[this.state.selectedOption].rate
    });
  }

  onChange = e => {
    this.setState({
      selectedOption: e.target.value,
      currentValue: this.state.data.bpi[e.target.value].rate
    });
  };

  render() {
    return (
      <main className="app full-centralize full-screen">
        <header className="header">
          <h1 className="header__title">Bitcoin Price</h1>
          <h2 className="header__title header__current">
            {this.state.currentValue} {this.state.selectedOption}
          </h2>
        </header>
        <section className="options">
          <input
            type="radio"
            value="USD"
            onChange={this.onChange}
            checked={this.state.selectedOption === 'USD'}
          />
          <label htmlFor="USD">USD</label>
          <input
            type="radio"
            value="EUR"
            onChange={this.onChange}
            checked={this.state.selectedOption === 'EUR'}
          />
          <label htmlFor="EUR">EUR</label>
          <input
            type="radio"
            value="GBP"
            onChange={this.onChange}
            checked={this.state.selectedOption === 'GBP'}
          />
          <label htmlFor="GBP">GBP</label>
        </section>
      </main>
    );
  }
}

export default App;
