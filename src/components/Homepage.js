import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import Alert from './Status';
import CustomerCollection from './CustomerCollection';
import Library from './Library';
import Movie from './Movie';
import Search from './Search';
import MovieCollection from './MovieCollection';


import './Homepage.css';

const BASE_URL = 'http://localhost:3000/';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCustomer: null,
      selectedMovie: null,
      query: null,
      alert: {
        message: null,
        type: null
      }
    }
  }

  search = (query) => {
    this.setState({query: query['query']})
  }

  updateSelectedCustomer = (customerObj) => {
    this.setState({selectedCustomer: customerObj});
  }

  updateSelectedMovie = (movieObj) => {
    this.setState({selectedMovie: movieObj});
  }

  clearQuery = () => {
    this.setState({query: null});
  }

  displayAlert = (type, message) => {
    this.setState({
      alert: {
        type: type,
        message: message
      }
    });
  }

  displayMovie() {
    return (
      <section className="selected-movie">
        <Movie
          movieData={this.state.selectedMovie}
          />
      </section>
    )
  }

  displaySearch () {
    return(
        <MovieCollection
          query={this.state.query}
          url={BASE_URL}
          clearQueryCallback={this.clearQuery}
          displayAlert={this.displayAlert}
          />
    )
  }

  render() {
    let selectedCustomer = null;
    if (this.state.selectedCustomer) {
      selectedCustomer = this.state.selectedCustomer.name;
    }
    let selectedMovie = null;
    if (this.state.selectedMovie) {
      selectedMovie = this.displayMovie();
    }

    let searchResults = null;
    if (this.state.query) {
      searchResults = this.displaySearch();
    }
    console.log(this.state);
    return (
      <Router>
        <section>
          <header className="App-header">
            <h1 className="App-title">Welcome to OctosVideoStore</h1>
            <div>
              <h4>Current Customer: </h4>
              <span>{selectedCustomer}</span>
                {selectedMovie}
            </div>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/library'>Library</Link>
              </li>
              <li>
                <Link to='/customers'>Customers</Link>
              </li>
              <li>
                <Link to='/search'>Search</Link>
                <Route path='/search'
                  render={() => <Search
                  searchCallback={this.search}
                  />
                  }/>
              </li>
            </ul>
          </header>
          <Alert
            type={this.state.alert.type}
            message={this.state.alert.message}
          />
          <main>
            <Route exact path='/' />
            <Route
              path='/library'
              render={() => {
                return <Library
                  selectedMovieCallback={this.updateSelectedMovie}
                  baseUrl={BASE_URL}
                  displayAlert={this.displayAlert}
                  />}}
              />
            <Route
              path='/customers'
              render={() => {
                return <CustomerCollection
                  baseUrl={BASE_URL}
                  customerClickCallback={this.updateSelectedCustomer}
                />
              }
            } />
          {searchResults}
          </main>
        </section>


      </Router>
    )
  }

}

export default Homepage;
