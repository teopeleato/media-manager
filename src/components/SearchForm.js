import React, { Component } from "react"

const API_KEY = "28b20f8"

export class SearchForm extends Component {
  state = {
    imputMovie: ""
  }

  _handleChange = e => {
    this.setState({ inputMovie: e.target.value })
  }

  _handleSubmit = e => {
    e.preventDefault()
    const { inputMovie } = this.state
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
      .then(response => response.json())
      .then(data => {
        const { Search = [], totalResults = 0 } = data
        console.log({ Search, totalResults })
        this.props.onResults(Search)
      })
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Movie to search..."
              onChange={this._handleChange}
            />
          </div>
          <div className="control">
            <button className="button is-info">Search</button>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchForm
