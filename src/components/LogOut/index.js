import React, { Component } from "react"
import LogOutView from "./LogOutView"
import app from "../../base"

export class LogOut extends Component {
  _handleSignOut = async e => {
    e.preventDefault()
    try {
      console.log("iniciando log out...")
      await app.auth().signOut()
      window.sessionStorage.setItem("auth", false)
      console.log("log out completed")
      this.props.history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return <LogOutView onSubmit={this._handleSignOut} />
  }
}

export default LogOut
