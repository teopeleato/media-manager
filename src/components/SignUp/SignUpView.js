import React from "react"
import { Link } from "react-router-dom"

const SignUpView = ({ onSubmit }) => {
  return (
    <div>
      <h1>Sign up</h1>
      {/* <form onSubmit={onSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form> */}

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
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success is-outlined icon-left">
              Sign Up
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

export default SignUpView
