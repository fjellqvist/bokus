import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchText: null,
      countries: [],
      countryList: []
    };
  }

  jobList = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countries: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  componentDidUpdate(prevProps, prevState) {
    let currentState = this.state.searchText;
    if (currentState !== null) {
      if (this.state.searchText !== prevState.searchText) {
        if(this.state.searchText.countrysearch !== "") {
          let baseUrl = "https://restcountries.eu/rest/v2/name/";
          let  url = baseUrl.concat(currentState.countrysearch);
          this.jobList(url);
        }else {
          this.setState({
            countries: []
          });
        }
      }
    }
  }

  onSubmit = (fields) => {
    this.setState({
      searchText: fields
    })
  };

  onChange = (fields) => {
    this.setState({
      searchText: fields
    })
  };

  addItem = (e) => {
    this.setState({
      countryList: [...this.state.countryList, e.target.id]
    })
  };

  removeItem = (e) => {
    let array = this.state.countryList;
    if (e.target.id > -1) {
      array.splice(e.target.id, 1);

      this.setState({
        countryList: array
      })
    }
  };

  render(props) {
    const { error, countries, countryList} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      

      let country = Object.values(countries);
      let countryItems = country.map(countries => <li id={countries.name} onClick={e => this.addItem(e)}>{countries.name}</li>);

      let countryAdded = Object.values(countryList);
      let countryAddedList = countryAdded.map((countryList, key) => <li> {countryList} <span id={key} onClick={e => this.removeItem(e)}>X</span></li>);

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <SearchBox {...props} onChange={fields => this.onChange(fields)}> )} </SearchBox>
          <ul class="countryList offset-3 col-6">
            {countryItems}
          </ul>

          <ul class="addedList offset-3 col-6">
            {countryAddedList}
          </ul>
        </div>
      );
    }
  }
}

export default App;