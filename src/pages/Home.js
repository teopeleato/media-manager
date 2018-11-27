import React, { Component } from "react"
import { SearchForm } from "../components/SearchForm"
import { Title } from "../components/Title"
import MoviesList from "../components/MoviesList"

export class Home extends Component {
  state = {
    userSearch: false,
    results: []
  }

  _handleResults = results => {
    this.setState({ results, userSearch: true })
  }

  _renderResults() {
    return this.state.results.length === 0 ||
      this.state.results === undefined ? (
      <p>No items found</p>
    ) : (
      <MoviesList movies={this.state.results} />
    )
  }

  render() {
    return (
      <div>
        <Title>Javi, search the films</Title>
        <div className="SearchForm-wrapper">
          <SearchForm onResults={this._handleResults} />
        </div>
        <div>
          {this.state.userSearch ? (
            this._renderResults()
          ) : (
            <p>Use the form to search the movies...</p>
          )}
        </div>
      </div>
    )
  }
}

export default Home
