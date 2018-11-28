import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import imgDefault from "../assets/img-default.png"

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

  render() {
    const { title, year, poster, id, type } = this.props

    return (
      <Link to={`/detail/${id}`} className="card">
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
              <p className="subtitle is-6">
                {year} / {type}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default Movie
