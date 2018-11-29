import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { ButtonBackToHome } from "./../components/ButtonBackToHome"

const API_KEY = "28b20f8"

export class Detail extends Component {
  /* static propTypes = {
    id: PropTypes.string
  } */

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = {
    movie: {}
  }

  _fetchMovie({ id }) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(response => response.json())
      .then(movie => {
        this.setState({ movie })
        console.log(this.state.movie)
      })
  }

  _goBack() {
    window.history.back()
  }

  componentDidMount() {
    console.log(this.props)
    const { id } = this.props.match.params
    this._fetchMovie({ id })
  }

  render() {
    const { Title, Poster, Actors, Genre, Plot, imdbRating } = this.state.movie
    return (
      <div>
        <ButtonBackToHome />
        <p className="title">{Title}</p>
        <img src={Poster} alt={Title} />
        <h3>{Actors}</h3>
        <span>{imdbRating}</span>
        <p>{Genre}</p>
        <p>{Plot}</p>
      </div>
    )
  }
}

export default Detail
