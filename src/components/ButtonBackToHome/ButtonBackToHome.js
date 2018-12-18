import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./ButtonBackToHome.css"

export class ButtonBackToHome extends Component {
  render() {
    const { listtype } = this.props
    if (this.props.ismylists === "mylist") {
      return (
        <div className="columns back">
          <div className="column is-half is-offset-one-quarter">
            <Link
              className="button is-info is-outlined  icon-left half-width"
              to={{
                pathname: `${process.env.PUBLIC_URL}/mylists`,
                state: { listtype: listtype }
              }}
            >
              Back
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="columns back">
          <div className="column is-half is-offset-one-quarter">
            <Link
              className="button is-info is-outlined  icon-left half-width"
              to={`${process.env.PUBLIC_URL}/`}
            >
              Back
            </Link>
          </div>
        </div>
      )
    }
  }
}

export default ButtonBackToHome
