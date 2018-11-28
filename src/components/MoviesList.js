import React, { Component } from "react"
import PropTypes from "prop-types"
import { Movie } from "./Movie"

export class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array
  }

  render() {
    const { movies } = this.props
    return (
      <div className="columns is-multiline">
        {movies.map(movie => {
          return (
            <div
              key={movie.imdbID}
              className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
            >
              <Movie
                title={movie.Title}
                type={movie.Type}
                poster={movie.Poster}
                id={movie.imdbID}
                year={movie.Year}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default MoviesList
