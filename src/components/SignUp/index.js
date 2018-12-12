import React, { Component } from "react"
import { withRouter } from "react-router"
import SignUpView from "./SignUpView"
import app from "../../base"

export class SignUpContainer extends Component {
  _handleSignUp = async e => {
    e.preventDefault()
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    try {
      console.log("iniciando sign up...")
      // Create account in firebase with password
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          try {
            console.log("creado el user: ", email)
            // Add user to LIsts Database
            const username = email.split("@")[0]
            const database = app.database()
            app
              .database()
              .ref("users/" + username)
              .set({
                username: username,
                email: email
                /* lists: {
                  whislistMovies: { 0: "empty" },
                  seenMovies: { 0: "empty" },
                  whislistSeries: { 0: "empty" },
                  seenSeries: { 0: "empty" }
                } */
              })
              .then(
                console.log(
                  "añadido a la BD de las listas el usuario: ",
                  username
                )
              )
            this.props.history.push("/")
          } catch (error) {
            console.log("error adding user to Lists Database: ", error)
          }
        })
    } catch (error) {
      console.log("error creating new user: ", error)
    }
  }

  render() {
    return <SignUpView onSubmit={this._handleSignUp} />
  }
}

// export default withRouter(SignUpContainer) //????
export default SignUpContainer
