import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import imgDefault from "../assets/img-default.png"
import app from "../base.js"

export class Movie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      removeFromListButton: this.props.removeFromListButton,
      addToListButton: this.props.addToListButton
      /* movies: this.props.movies */
    }
  }
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

  _handleAddToWishlist = (imdbID, title) => {
    const { email, type } = this.props
    const username = email.split("@")[0]
    console.log("voy a añadir a lista del user: ", username, imdbID)
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
        .ref(`users/` + username + `/lists/` + listName + `/items/`)

      // Obtengo listado de pelis
      refList
        .once("value", snapshot => {
          snapshot.forEach(snapshot => {
            const item = snapshot.val().imdbID
            arrayMovies.push(item)
          })
        })
        .then(function() {
          // Miro si ya está en la lista o no
          exists = arrayMovies.indexOf(imdbID)
          console.log("exists: ", exists)
          if (exists === -1) {
            // Si no esta: la añado
            refList.push({ imdbID }, function(error) {
              if (error) {
                console.log(error)
              } else {
                console.log("Añadido correctamente el id: ", imdbID)
                alert("Done! Now'" + title + "' is in your list.")
              }
            })
          } else {
            // Si ya estaba
            console.log("ya esta en la lista!!!")
            alert("Ey! '" + title + "' was already in your list...")
          }
        })
    } catch (error) {
      console.log("error añadiendo a la lista", error)
    }
  }

  _handleRemoveFromList = (imdbID, title) => {
    const { email, type, movies } = this.props
    // console.log(movies)
    const username = email.split("@")[0]
    let listName = "wishlistSeries"
    if (type === "movie") {
      listName = "wishlistMovies"
    }
    try {
      // Obtengo la referencia al listado de pelis
      const refList = app
        .database()
        .ref(`users/` + username + `/lists/` + listName + `/items/`)
        .orderByChild("imdbID")
        .equalTo(imdbID)
        .on("value", function(snapshot) {
          console.log("snapshot.val(): ", snapshot.val())
          snapshot.forEach(function(child) {
            console.log("eliminando el id: ", imdbID)
            child.ref.remove()
            console.log(movies)
            window.location.reload()
            // Y lo elimino del array de peliculas
            var index = movies.findIndex(m => m.imdbID === imdbID)
            const movieToRemove = movies.splice(index, 1) // TO DO: refrescar la pagina tras eliminar peli...
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let isMyLists = "search"
    if (this.props.isMyLists === "mylist") {
      isMyLists = "mylist"
    }
    const { title, year, poster, imdbID, listtype } = this.props

    return (
      <div>
        <div className="card-image">
          <Link
            className="card"
            title="Show details"
            to={{
              pathname: `/detail/${imdbID}/false`,
              state: { ismylists: isMyLists, listtype: listtype }
            }}
          >
            <figure className="image">
              <img
                onError={this._handleImageError}
                src={this.state.imageError ? imgDefault : poster}
                alt={title}
              />
            </figure>
          </Link>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <Link
                className="card"
                title="Show details"
                to={{
                  pathname: `/detail/${imdbID}/false`,
                  state: { ismylists: isMyLists }
                }}
              >
                <p className="title is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                  {title}
                </p>
              </Link>
              <div className="subtitle is-size-7-mobile is-size-7-tablet is-size-6-desktop top-space-10">
                {year}
              </div>
              <Link
                className="card"
                title="Show details"
                to={{
                  pathname: `/detail/${imdbID}/false`,
                  state: { ismylists: isMyLists }
                }}
              >
                <button
                  className="button is-info is-outlined is-small icon-left"
                  title="Show details"
                >
                  <i className="fas fa-info-circle" />
                </button>
              </Link>
              <button
                className={`button is-warning is-outlined is-small icon-left ${
                  this.state.addToListButton
                }`}
                title="Add to wishlist"
                type="submit"
                onClick={() => this._handleAddToWishlist(imdbID, title)}
              >
                <span className="icon-left">
                  <i className="far fa-eye" />
                </span>{" "}
                Add
              </button>
              <button
                className={`button is-danger is-outlined is-small icon-left ${
                  this.state.removeFromListButton
                }`}
                title="Remove from list"
                onClick={() => this._handleRemoveFromList(imdbID, title)}
              >
                {/* <span className="icon-left">
                  <i className="far fa-trash-alt" />
                </span>{" "}
                Remove */}
                <i className="far fa-trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
