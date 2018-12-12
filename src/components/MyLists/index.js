import React, { Component } from "react"
import app from "../../base"
import "./MyLists.css"
import { MoviesList } from "./../MoviesList"
import { ButtonBackToHome } from "./../ButtonBackToHome"
import { Header } from "./../Header/index"
import { Movie } from "../Movie"
import PropTypes from "prop-types"

const API_KEY = "28b20f8"

export class MyLists extends Component {
  state = {
    types: [
      { type: "seenMovies", name: "Seen Movies" },
      { type: "wishlistMovies", name: "Wishlist Movies" },
      { type: "seenSeries", name: "Seen Series" },
      { type: "wishlistSeries", name: "Wishlist Series" }
    ],
    movies: [],
    listTitle: ""
  }

  static propTypes = {
    movies: PropTypes.array
  }

  _getLists(type) {
    this.setState({ listTitle: type })
    let arrayMovies = []
    try {
      console.log(type)

      const email = window.sessionStorage.getItem("email")
      const username = email.split("@")[0]
      console.log("mostrando listas de: ", username)
      const refList = app.database().ref(`users/` + username + `/lists/` + type)

      // Obtengo listado de pelis
      refList.once("value", snapshot => {
        snapshot.forEach(snapshot => {
          const item = snapshot.val().imdbID.imdbID
          // Para cada id consulto sus caracteristicas
          const fetchQuery = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${item}`
          console.log(fetchQuery)
          fetch(fetchQuery)
            .then(response => response.json())
            .then(data => {
              this.setState({
                movies: [...this.state.movies, data]
              })
              console.log("movies: ", this.state.movies)
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
        <Header />
        <div>
          <p>Choose the list you want to see:</p>
          {this.state.types.map(({ type, name }) => (
            <div className="list-buttons" key={type}>
              <button
                onClick={() => this._getLists(type)}
                className="button is-info"
              >
                {name}
              </button>
            </div>
          ))}
        </div>
        <h2>{this.state.listTitle}</h2>
        <MoviesList movies={this.state.movies} email={"teopeleato@yahoo.es"} />
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
{
  /* {this.state.movies.map(function(movie, i) {
          return (
          )
        })}
   */
}

{
  /* <div
              key={movie.imdbID}
              className="column is-full-mobile is-one-third-tablet is-one-fifth-desktop is-one-fifth-widescreen is-one-fifth-fullhd"
            >
              <Movie
                title={movie.Title}
                type={movie.Type}
                poster={movie.Poster}
                imdbID={movie.imdbID}
                year={movie.Year}
                email={"teopeleato@yahoo.es"}
              />
            </div> */
}
