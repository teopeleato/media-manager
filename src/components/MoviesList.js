import React, { Component } from "react"
import PropTypes from "prop-types"
import { Movie } from "./Movie"

export class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMyLists: this.props.isMyLists,
      removeFromListButton: "disableButton",
      addToListButton: ""
    }
  }

  static propTypes = {
    movies: PropTypes.array
  }

  componentDidMount = () => {
    if (this.props.isMyLists === "mylist") {
      this.setState({ removeFromListButton: "" })
      this.setState({ addToListButton: "disableButton" })
    }
  }

  render() {
    const { movies, email, listtype } = this.props
    return (
      <div id="moviesList">
        <div className="columns is-multiline is-mobile">
          {movies.map(movie => {
            return (
              <div
                key={movie.imdbID}
                className="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd"
              >
                <Movie
                  title={movie.Title}
                  type={movie.Type}
                  poster={movie.Poster}
                  imdbID={movie.imdbID}
                  year={movie.Year}
                  email={email}
                  removeFromListButton={this.state.removeFromListButton}
                  addToListButton={this.state.addToListButton}
                  movies={movies}
                  isMyLists={this.state.isMyLists}
                  listtype={listtype}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MoviesList
