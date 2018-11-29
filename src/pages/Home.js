import React, { Component } from "react"
import { SearchForm } from "../components/SearchForm"
import { Title } from "../components/Title"
import MoviesList from "../components/MoviesList"

export class Home extends Component {
  state = {
    userSearch: false,
    results: [],
    inputMovie: "",
    placeholder: "Text to search..."
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

  componentWillMount() {
    if (
      window.sessionStorage.getItem("sessionMovies") !== null &&
      window.sessionStorage.getItem("sessionMovies") !== ""
    ) {
      const results = JSON.parse(window.sessionStorage.getItem("sessionMovies"))
      if (window.sessionStorage.getItem("placeholder") !== null) {
        const placeholder = window.sessionStorage.getItem("placeholder")
        this.setState({
          placeholder
        })
      }
      const pageNumber = window.sessionStorage.getItem("pageNumber")
      const totalPages = window.sessionStorage.getItem("totalPages")
      this.setState({
        results,
        userSearch: true,
        pageNumber,
        totalPages
      })
      this._renderResults()
    } else {
      window.sessionStorage.setItem("sessionMovies", [])
    }
  }

  render() {
    return (
      <div>
        <Title>Movies and Series</Title>
        <div className="SearchForm-wrapper">
          {/* <div className="container"> */}
          <SearchForm
            placeholder={this.state.placeholder}
            onResults={this._handleResults}
            pageNumber={this.state.pageNumber}
            totalPages={this.state.totalPages}
          />
        </div>
        <div>
          {this.state.userSearch ? (
            this._renderResults()
          ) : (
            <p>Use the form to search movies and series...</p>
          )}
        </div>
      </div>
    )
  }
}

export default Home
