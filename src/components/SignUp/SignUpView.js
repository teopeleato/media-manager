import React from "react"
import { Link } from "react-router-dom"

const SignUpView = ({ onSubmit }) => {
  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <h1 className="title">Register</h1>

        <form onSubmit={onSubmit}>
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
              Password: Min 6 characters
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success is-outlined icon-left">
                Register
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
    </div>
  )
}

export default SignUpView
