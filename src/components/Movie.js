import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import imgDefault from "../assets/img-default.png"
import app from "../base.js"

export class Movie extends Component {
  state = {
    imageError: false
  }

  static propTypes = {
    title: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string
  }

  _handleImageError = () => {
    this.setState({ imageError: true })
  }

  _handleAddToWishlist = imdbID => {
    const { email, type } = this.props
    const username = email.split("@")[0]
    // const type = "seenMovies" //TO DO...
    let listName = "wishlistSeries"
    if (type === "movie") {
      listName = "wishlistMovies"
    }
    const moviesInList = app
      .database()
      .ref(`users/` + username + `/lists/` + listName)
    moviesInList.push(imdbID)
  }

  render() {
    const { title, year, poster, id, imdbID } = this.props

    return (
      <div>
        <Link to={`/detail/${id}`} className="card" title="Show details">
          <div className="card-image">
            <figure className="image">
              <img
                onError={this._handleImageError}
                src={this.state.imageError ? imgDefault : poster}
                alt={title}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{year}</p>
                <p>{imdbID}</p>
              </div>
            </div>
          </div>
        </Link>
        <button
          className="button is-info is-outlined is-small icon-left"
          title="Show details"
        >
          <i className="fas fa-info-circle" />
        </button>
        <button
          className="button is-warning is-outlined is-small icon-left"
          title="Add to wishlist"
          type="submit"
          onClick={() => this._handleAddToWishlist({ imdbID })}
        >
          <i className="far fa-eye" />
        </button>
        <button
          className="button is-success is-outlined is-small icon-left"
          title="Mark as seen"
        >
          <i className="fas fa-check" />
        </button>
      </div>
    )
  }
}

export default Movie

{
  /* </div>
          </div>
        </div>
      </Link> */
}
