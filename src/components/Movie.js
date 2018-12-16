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

  /* _handleAddToWishlist = (imdbID, title) => {
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

      const clave = refList.push().key
      refList.set({
        username: username,
        email: email,
        clave: clave,
        title: imdbID.title,
        id: imdbID.imdbID
      })
    } catch (error) {
      console.log("error añadiendo a la lista", error)
    }
  } */

  _handleAddToWishlist_ORIGINAL = (imdbID, title) => {
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
                // console.log("{ imdbID }!!!!!: ", imdbID)
                alert("Done! Now'" + imdbID.title + "' is in your list.")
              }
            })
          } else {
            // Si ya estaba
            console.log("ya esta en la lista!!!")
            alert("Ey! '" + imdbID.title + "' was already in your list...")
          }
        })
    } catch (error) {
      console.log("error añadiendo a la lista", error)
    }
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
          // console.log("arrayMovies: ", arrayMovies)
          exists = arrayMovies.indexOf(imdbID)
          console.log("exists: ", exists)
          if (exists === -1) {
            // Si no esta: la añado
            refList.push({ imdbID }, function(error) {
              // ???????????
              if (error) {
                console.log(error)
              } else {
                console.log("Añadido correctamente el id: ", imdbID)
                // console.log("{ imdbID }!!!!!: ", imdbID)
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
    const { email, type } = this.props
    const username = email.split("@")[0]
    let listName = "wishlistSeries"
    if (type === "movie") {
      listName = "wishlistMovies"
    }
    console.log("remoooooooooooooove", imdbID, title, type, email)
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
          })
        })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { title, year, poster, imdbID } = this.props

    return (
      <div>
        <div className="card-image">
          <Link to={`/detail/${imdbID}`} className="card" title="Show details">
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
                to={`/detail/${imdbID}`}
                className="card"
                title="Show details"
              >
                <p className="title is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                  {title}
                </p>
              </Link>
              <div className="subtitle is-size-7-mobile is-size-7-tablet is-size-6-desktop top-space-10">
                {year}
              </div>
              <Link
                to={`/detail/${imdbID}`}
                className="card"
                title="Show details"
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
                <i className="far fa-eye" />
              </button>
              <button
                className={`button is-danger is-outlined is-small icon-left ${
                  this.state.removeFromListButton
                }`}
                title="Remove from list"
                onClick={() => this._handleRemoveFromList(imdbID, title)}
              >
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

{
  /* onClick={() => this._handleAddToWishlist({ imdbID, title })}

  onClick={() => this._handleRemoveFromList({ imdbID, title })}
  
  */
}
