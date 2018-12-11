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
    //imdbID = "tt1569923" //esta
    //imdbID = "tt4853102" //no esta
    const { email, type } = this.props
    const username = email.split("@")[0]
    console.log("voy a añadir a lista del user: ", username, imdbID.imdbID)
    // const type = "seenMovies" //TO DO...
    let listName = "wishlistSeries"
    if (type === "movie") {
      listName = "wishlistMovies"
    }

    let arrayMovies = []
    let exists = false
    try {
      // Obtengo la referencia al listado de pelis
      const refList = app
        .database()
        .ref(`users/` + username + `/lists/` + listName)

      // Obtengo listado de pelis
      refList
        .once("value", snapshot => {
          snapshot.forEach(snapshot => {
            const item = snapshot.val().imdbID.imdbID
            arrayMovies.push(item)
          })
        })
        .then(function() {
          // Miro si ya está en la lista o no
          // console.log("arrayMovies: ", arrayMovies)
          exists = arrayMovies.indexOf(imdbID.imdbID)
          console.log("exists: ", exists)
          if (exists === -1) {
            // Si no esta: la añado
            refList.push({ imdbID }, function(error) {
              if (error) {
                console.log(error)
              } else {
                console.log("Añadido correctamente el id: ", imdbID.imdbID)
              }
            })
          } else {
            // Si ya estaba
            console.log("ya esta en la lista!!!")
            alert("¡Ya estaba en tu lista!")
          }
        })
    } catch (error) {
      console.log("error añadiendo a la lista", error)
    }
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
