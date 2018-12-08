import React, { Component } from "react"
import "./login.css"
import LogInView from "./LogInView"
import app from "../../base"
import { Link } from "react-router-dom"

export class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: "",
      email: "",
      password: "",
      error: ""
    }
  }

  _showLogin = e => {
    e.preventDefault()
    this.setState({
      showLogin: "is-active"
    })
  }

  _closeLogin = e => {
    e.preventDefault()
    this.setState({
      showLogin: ""
    })
  }

  /* _handleSubmit = e => {
    e.preventDefault()
    console.log("holaaaaa")
    
    if (this.state.email === "") {
      this.setState({ error: "email is required" })
    }
    if (!this.state.password) {
      this.setState({ error: "Password is required" })
    }
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ error: "" })
    }
    const { error } = this.state
    console.log("error: ", error)
    return error
  } */

  /* _handleUserChange = e => {
    this.setState({
      email: e.target.value
    })
    console.log("email: ", this.state.email)
  }

  _handlePassChange = e => {
    this.setState({
      password: e.target.value
    })
    console.log("password: ", this.state.password)
  } */

  _handleLogIn = async e => {
    e.preventDefault()
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    try {
      console.log("iniciando log in...")
      // Create account in firebase with password
      const user = await app.auth().signInWithEmailAndPassword(email, password)
      this.setState({
        email: user.user.email
      })
      window.sessionStorage.setItem("auth", true)
      window.sessionStorage.setItem("email", user.user.email)
      console.log(user)
      this.props.history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        {/* <LogInView onSubmit={this._handleLogIn} /> */}

        <h1>Log In</h1>
        <form onSubmit={this._handleLogIn}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                name="email"
                className="input"
                type="email"
                placeholder="Email"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                name="password"
                className="input"
                type="password"
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success is-outlined icon-left">
                Login
              </button>
              <Link
                className="button is-danger is-outlined icon-left"
                to={`${process.env.PUBLIC_URL}/`}
              >
                Back
              </Link>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default LogIn
