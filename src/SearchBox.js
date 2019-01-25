import React, { Component } from 'react';
import searchImg from './icons/search.svg';

export class SeachBox extends Component {
  state = {
    countrysearch: ''
  }

  handleChange = () => {
    this.props.onChange(this.state);
  };

  change = (e) => {
    this.setState({
      countrysearch: e.target.value
      }, this.handleChange);
  };

  

  render() {
    return(
      <div class="offset-3 col-6 seach-form">
        <form action="/" method="get">
          <h2>Country Search</h2><br/>
          <div class="input-container">
            <img src={searchImg} class="searchImg" alt="searchImg" />
            <input 
              name='countrysearch'
              placeholder='Type country name' 
              value={this.state.countrysearch}
              onChange={e => this.change(e)}
            />
          </div>
        </form> 
      </div>
    );
  }
}

export default SeachBox;