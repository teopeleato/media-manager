import React from "react"
import { Link } from "react-router-dom"

export const ButtonBackToHome = () => (
  <Link
    className="button is-info is-outlined is-medium icon-left"
    to={`${process.env.PUBLIC_URL}/`}
  >
    Back to List
  </Link>
)
