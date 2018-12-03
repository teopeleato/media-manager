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
        // console.log(this.state.movie)
      })
  }

  _goBack() {
    window.history.back()
  }

  componentDidMount() {
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

    if (Poster === "N/A") {
      Poster = this.props.defaultPlot
    }

    return (
      <div>
        <section className="hero bottomMargin24">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{Title}</h1>
              {/* <span className="tag is-warning rating">
                <i className="fas fa-star icon" />
                <span>{imdbRating}</span>
              </span> */}
              <button
                className="button is-info  is-medium icon-left"
                title="IMDB rating"
              >
                <i className="fas fa-star icon-left" />
                <span>{imdbRating}</span>
              </button>
              <button
                className="button is-warning is-outlined is-medium icon-left"
                title="Add to wishlist"
              >
                <i className="far fa-eye" />
              </button>
              <button
                className="button is-success is-outlined is-medium icon-left"
                title="Mark as seen"
              >
                <i className="fas fa-check" />
              </button>
            </div>
          </div>
        </section>
        <div className="tile is-ancestor grid-detail">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification img-detail">
                  <div className="card-image">
                    <figure className="image">
                      <img src={Poster} alt={Title} />
                    </figure>
                  </div>
                </article>
              </div>
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification grid-detail-block is-primary align-left">
                  <div>
                    <p className="subtitle">
                      <i className="far fa-calendar-alt" /> {Year}
                    </p>
                    <p className="subtitle">
                      <i className="fas fa-globe-americas" /> {Country}
                    </p>
                    <p className="subtitle">
                      <i className="far fa-clock" /> {Runtime}
                    </p>
                  </div>
                </article>
                <article className="tile is-child notification grid-detail-block is-info">
                  <div>
                    <p className="subtitle">
                      <i className="fas fa-video" /> {Type}
                    </p>
                    <p className="subtitle">
                      <i className="fas fa-theater-masks" /> {Genre}
                    </p>
                  </div>
                </article>
                <article className="tile is-child notification grid-detail-block is-warning">
                  <p className="subtitle">
                    <i className="fas fa-award" /> {Awards}
                  </p>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification grid-detail-block is-danger">
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
            <article className="tile is-child notification grid-detail-block is-success">
              <div>
                <p className="title">Director</p>
                <p className="subtitle">{Director}</p>
              </div>
            </article>
            <article className="tile is-child notification grid-detail-block is-dark">
              <div>
                <p className="title">Actors</p>
                <p className="subtitle">{Actors}</p>
              </div>
            </article>

            {/* <article className="tile is-child notification is-info">
              <p className="subtitle">{Genre}</p>
            </article> */}
            <article className="tile is-child notification grid-detail-block is-link ">
              <div>
                <p className="title" />
                <p className="subtitle">{Production}</p>
                <p className="subtitle">
                  <a
                    href={`${Website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Website}
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>

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
