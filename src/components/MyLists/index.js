import React, { Component } from "react"
import app from "../../base"
import "./MyLists.css"
import { MoviesList } from "./../MoviesList"

export class MyLists extends Component {
  state = {
    types: [
      { type: "seenMovies", name: "Seen Movies" },
      { type: "wishlistMovies", name: "Wishlist Movies" },
      { type: "seenSeries", name: "Seen Series" },
      { type: "wishlistSeries", name: "Wishlist Series" }
    ],
    movies: ""
  }
  _getLists(type) {
    try {
      console.log(type)

      const email = window.sessionStorage.getItem("email")
      const username = email.split("@")[0]

      console.log("mostrando listas -> username: ", username)
      app
        .database()
        .ref("users/" + username + "/lists/" + type + "/1")
        .once("value")
        .then(snapshot => {
          // console.log(snapshot)
          let title = snapshot.val()
          console.log("mostrando listas -> titulo: ", title)
          this.setState({ movies: title })
          return true
        })
    } catch (error) {
      console.log(error)
    }
  }

  _moviesInList = () => {}

  render() {
    return (
      <div>
        <h1>My Lists</h1>
        {this.state.types.map(({ type, name }) => (
          <div className="list" key={type}>
            <p>{name}</p>
            <button
              onClick={() => this._getLists(type)}
              className="button is-info"
            >
              See
            </button>
          </div>
        ))}
        <p>{this.state.movies}</p>
        {/* <MoviesList movies={this.state.results} /> */}
      </div>
    )
  }
}

export default MyLists
