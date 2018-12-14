import React from "react"
import { Link } from "react-router-dom"
import "./ButtonBackToHome.css"

export const ButtonBackToHome = () => (
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
