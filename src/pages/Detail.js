import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { ButtonBackToHome } from "./../components/ButtonBackToHome"
import imgDefault from "../assets/img-default.png"

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
    }),
    defaultPlot: PropTypes.string
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
    let {
      Title,
      Poster = "N/A",
      Director = "N/A",
      Actors = "N/A",
      Production = "N/A",
      Genre,
      Plot = "N/A",
      imdbRating,
      Year = "N/A",
      Country = "N/A",
      Runtime = "N/A",
      Type = "N/A",
      Website = "N/A",
      Awards = "N/A"
    } = this.state.movie

    console.log(this.props.defaultPlot)
    if (Poster === "N/A") {
      Poster = this.props.defaultPlot
    }

    return (
      <div>
        <section className="hero bottomMargin24">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{Title}</h1>
              <h2 className="subtitle">
                <div>
                  <span className="tag is-warning rating">
                    <i className="fas fa-star icon" />
                    <span>{imdbRating}</span>
                  </span>
                </div>
              </h2>
            </div>
          </div>
        </section>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification is-primary">
                  <p className="subtitle">
                    {Year} - {Country}
                  </p>
                  <p className="subtitle">{Runtime}</p>
                </article>
                <article className="tile is-child notification is-info">
                  <p className="subtitle">{Genre}</p>
                </article>
                <article className="tile is-child notification is-warning">
                  <p className="subtitle">{Awards}</p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-black">
                  <figure className="image is-4by3">
                    <img src={Poster} alt={Title} />>
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <div className="content">
                  <p className="title" />
                  <p className="subtitle">{Plot}</p>
                  <div className="content" />
                </div>
                <div className="content" />
              </article>
            </div>
          </div>
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-success">
              <p className="title">Director</p>
              <p className="subtitle">{Director}</p>
            </article>
            <article className="tile is-child notification is-dark">
              <p className="title">Actors</p>
              <p className="subtitle">{Actors}</p>
            </article>

            {/* <article className="tile is-child notification is-info">
              <p className="subtitle">{Genre}</p>
            </article> */}
            <article className="tile is-child notification is-link ">
              <p className="title" />
              <p className="subtitle">{Production}</p>
              <p className="subtitle">
                <a href={`${Website}`} target="_blank">
                  {Website}
                </a>
              </p>
            </article>
          </div>
        </div>
        {/* <div className="backInDetail">
          <ButtonBackToHome />
        </div> */}
        <footer className="footer footerDetail">
          <div className="content has-text-centered">
            <p>
              <ButtonBackToHome />
            </p>
          </div>
        </footer>
      </div>
    )
  }
}

Detail.defaultProps = {
  defaultPlot: imgDefault
}

export default Detail
