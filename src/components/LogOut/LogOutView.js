import React from "react"
import { Link } from "react-router-dom"

const LogOutView = ({ onSubmit }) => {
  return (
    <div>
      <h1>Log out</h1>
      <p>Do you want to log out?</p>
      <form onSubmit={onSubmit}>
        <button
          className="button is-success is-outlined icon-left"
          type="submit"
        >
          Yes
        </button>
        <Link
          className="button is-danger is-outlined icon-left"
          to={`${process.env.PUBLIC_URL}/`}
        >
          No
        </Link>
      </form>
    </div>
  )
}

export default LogOutView
