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
      <div id="moviesList">
        <div className="columns is-multiline is-mobile">
          {movies.map(movie => {
            return (
              <div
                key={movie.imdbID}
                className="column is-full-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd"
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
      </div>
    )
  }
}

export default MoviesList
