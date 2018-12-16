import React, { Component } from "react"
import app from "../../base"
import "./MyLists.css"
import { MoviesList } from "./../MoviesList"
import { ButtonBackToHome } from "../ButtonBackToHome/ButtonBackToHome"
import { Header } from "./../Header/index"
import PropTypes from "prop-types"

const API_KEY = "28b20f8"

export class MyLists extends Component {
  state = {
    type: "wishlistMovies",
    name: "Movies",
    /* "seenMovies", "wishlistMovies", "seenSeries", "wishlistSeries" */
    movies: [],
    listTitle: "",
    isActiveMovies: "is-active",
    isActiveSeries: "",
    email: window.sessionStorage.getItem("email")
  }

  static propTypes = {
    movies: PropTypes.array
  }

  componentWillMount = () => {
    console.log("entro componentWillMount!!")
    const firstList = this.state.type
    console.log("firstList: ", firstList)
    this._getLists(firstList)
  }

  _getLists_ORIGINAL(type) {
    this.setState({ listTitle: type })
    try {
      console.log("type: ", type)
      // Vacío listado de pelis
      this.setState({
        movies: []
      })

      // const email = window.sessionStorage.getItem("email")
      const email = this.state.email
      const username = email.split("@")[0]
      console.log("mostrando listas de: ", username)
      const refList = app.database().ref(`users/` + username + `/lists/` + type)

      // Obtengo listado de pelis
      refList.once("value", snapshot => {
        snapshot.forEach(snapshot => {
          const item = snapshot.val().imdbID.imdbID
          // Para cada id consulto sus caracteristicas
          const fetchQuery = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${item}`
          fetch(fetchQuery)
            .then(response => response.json())
            .then(data => {
              this.setState({
                movies: [...this.state.movies, data]
              })
              // console.log("movies: ", this.state.movies)
            })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  _getLists(type) {
    this.setState({ listTitle: type })
    try {
      console.log("type: ", type)
      // Vacío listado de pelis
      this.setState({
        movies: []
      })

      // const email = window.sessionStorage.getItem("email")
      const email = this.state.email
      const username = email.split("@")[0]
      console.log("mostrando listas de: ", username)
      const refList = app
        .database()
        .ref(`users/` + username + `/lists/` + type + `/items/`)

      // Obtengo listado de pelis
      refList.once("value", snapshot => {
        snapshot.forEach(snapshot => {
          const item = snapshot.val().imdbID
          // Para cada id consulto sus caracteristicas
          const fetchQuery = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${item}`
          fetch(fetchQuery)
            .then(response => response.json())
            .then(data => {
              this.setState({
                movies: [...this.state.movies, data]
              })
              // console.log("movies: ", this.state.movies)
            })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <div>
          {/* <h1 className="title">My wishlist lists</h1> */}
          {/* <h2 className="subtitle">Select the list to show</h2> */}
          <div className="tabs is-centered is-medium  top-20">
            <ul>
              <li className={this.state.isActiveMovies}>
                {/* <a onClick={() => this._getLists(type)}> */}
                <a
                  onClick={() => {
                    this.setState({
                      type: "wishlistMovies",
                      name: "Movies",
                      isActiveMovies: "is-active",
                      isActiveSeries: ""
                    })
                    this._getLists("wishlistMovies")
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-film" aria-hidden="true" />
                  </span>
                  {/* <span>{name}</span> */}
                  <span>{this.state.name}</span>
                </a>
              </li>
              <li className={this.state.isActiveSeries}>
                {/* <a onClick={() => this._getLists(type)}> */}
                <a
                  onClick={() => {
                    this.setState({
                      type: "wishlistSeries",
                      name: "Series",
                      isActiveMovies: "",
                      isActiveSeries: "is-active"
                    })
                    this._getLists("wishlistSeries")
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-tv" aria-hidden="true" />
                  </span>
                  {/* <span>{name}</span> */}
                  <span>{this.state.name}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <h1 className="title top-space">
          {this.state.listTitle.toUpperCase()}
        </h1> */}
        <MoviesList
          movies={this.state.movies}
          email={this.state.email}
          isMyLists="true"
        />
        <footer className="footer footerDetail">
          <div className="content has-text-centered">
            <ButtonBackToHome />
          </div>
        </footer>
      </div>
    )
  }
}

export default MyLists
