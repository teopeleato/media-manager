import React, { Component } from "react"
import { Link } from "react-router-dom"

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ""
    }
  }

  /**
   * Miro si está logueado o no para mostrar un contenido u otro en la cabecera
   */
  componentWillMount = () => {
    const { auth } = this.props
    let content = (
      <div>
        <Link to="/login">Log in</Link> - <Link to="/signup">Register</Link>
      </div>
    )
    if (auth === "true") {
      content = (
        <div>
          <p>Hi {this.props.email}</p>
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/mylists`,
              state: { listtype: "wishlistMovies" }
            }}
          >
            My lists
          </Link>{" "}
          - <Link to="/logout">Log out</Link>
        </div>
      )
    }
    this.setState({ content })
  }

  render() {
    return <div className="login-content"> {this.state.content}</div>
  }
}

export default Header
