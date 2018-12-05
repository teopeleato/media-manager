import React, { Component } from "react"

const API_KEY = "28b20f8"

export class SearchForm extends Component {
  state = {
    inputMovie: "",
    type: "",
    pageNumber: 1,
    totalPages: 0,
    Search: [],
    arrayNum: [0, 0, 1],
    disablePagination: "disablePagination",
    placeholder: ""
  }

  componentWillMount = () => {
    // const { placeholder } = this.props
    const placeholder = "vamooooooooooooooos"
    if (placeholder) {
      this.setState({ placeholder })
    }
  }

  _handleChange = e => {
    this.setState({ inputMovie: e.target.value })
  }

  _handleChangeType = e => {
    this.setState({ type: e.target.value })
  }

  _handleSubmit = e => {
    e.preventDefault()
    const { inputMovie, type, pageNumber } = this.state
    console.log(this.state.type)
    this.setState.type = console.log(pageNumber, inputMovie, type)

    const fetchQuery = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}&type=${type}&page=${pageNumber}`
    console.log(fetchQuery)
    fetch(fetchQuery)
      .then(response => response.json())
      .then(data => {
        let { Search = [], totalResults = 0 } = data
        const paginas = Math.ceil(totalResults / 10)
        console.log("paginas: ", paginas)

        this.setState({ Search })
        console.log("this.state.Search: ", this.state.Search)
        this.props.onResults(Search)
        // esto nuevo para cambiar el placeholder con la busqueda anterior y cargar con las peliculas buscadas
        window.sessionStorage.setItem("sessionMovies", JSON.stringify(Search))
        window.sessionStorage.setItem("placeholder", inputMovie)
        window.sessionStorage.setItem("pageNumber", pageNumber)
        window.sessionStorage.setItem("totalPages", paginas)
        this.setState({
          pageNumber,
          totalPages: paginas,
          disablePagination: ""
        })
      })
  }

  _clear = e => {
    e.preventDefault()
    const Search = []
    this.props.onResults(Search)
    // esto nuevo para cambiar el placeholder con la busqueda anterior...
    window.sessionStorage.setItem("sessionMovies", JSON.stringify(Search))
    window.sessionStorage.setItem("placeholder", "Text to search 22...")
    this.setState({
      disablePagination: "disablePagination",
      placeholder: "Text to search 11..." //tras pasar por Detail
    })
  }

  _callToApi(inputMovie, type, newPage) {
    console.log(newPage, inputMovie, type)
    const fetchQuery = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}&type=${type}&page=${newPage}`
    console.log(fetchQuery)
    fetch(fetchQuery)
      .then(response => response.json())
      .then(data => {
        let { Search = [], totalResults = 0 } = data
        const paginas = Math.ceil(totalResults / 10)
        this.setState({ totalPages: paginas })
        console.log("paginas: ", paginas)

        this.setState({ Search })
        console.log("this.state.Search: ", this.state.Search)
        this.props.onResults(Search)
        // esto nuevo para cambiar el placeholder con la busqueda anterior y cargar con las peliculas buscadas
        window.sessionStorage.setItem("sessionMovies", JSON.stringify(Search))
        window.sessionStorage.setItem("placeholder", inputMovie)
        window.sessionStorage.setItem("pageNumber", newPage)
        window.sessionStorage.setItem("totalPages", paginas)
        this.setState({
          pageNumber: newPage,
          totalPages: paginas,
          disablePagination: ""
        })
      })
  }

  _nextPage = e => {
    e.preventDefault()
    const { inputMovie, type, pageNumber } = this.state
    const newPage = pageNumber + 1
    this._callToApi(inputMovie, type, newPage)
  }

  _prevPage = e => {
    e.preventDefault()
    const { inputMovie, type, pageNumber } = this.state
    const newPage = pageNumber - 1
    this._callToApi(inputMovie, type, newPage)
  }

  _firstPage = e => {
    e.preventDefault()
    const { inputMovie, type } = this.state
    this._callToApi(inputMovie, type, 1)
  }

  _lastPage = e => {
    e.preventDefault()
    const { inputMovie, type, totalPages } = this.state
    this._callToApi(inputMovie, type, totalPages)
  }

  render() {
    const sesionTotalPages = window.sessionStorage.getItem("totalPages")

    // Hide pagination after last page
    let disabledLast = ""
    if (this.state.pageNumber === this.state.totalPages) {
      disabledLast = "disabledLast"
    }
    // Hide pagination before first page
    let disabledFirst = ""
    if (this.state.pageNumber === 1) {
      disabledFirst = "disabledFirst"
    }

    return (
      <div className="container2">
        <h1 className="title">Wishlist for popcorns</h1>
        <h2 className="subtitle">Movies & Series</h2>
        <form onSubmit={this._handleSubmit}>
          {/* Text imput for TEXT TO SEARCH  */}
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                onChange={this._handleChange}
                placeholder={this.props.placeholder}
              />
            </div>
          </div>

          {/* Select for TYPE  */}
          <div className="field">
            <div className="control">
              <div className="select is-full">
                <select onChange={this._handleChangeType}>
                  <option value="">All</option>
                  <option value="movie">Films</option>
                  <option value="series">Series</option>
                  <option value="episode">Episode</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped buttons-wrapper">
            {/* Button to SEARCH  */}
            <div className="control is-half">
              <button
                className="button is-success is-outlined"
                disabled={!this.state.inputMovie}
              >
                <span className="icon-left">
                  <i className="fas fa-search" />
                </span>{" "}
                Search
              </button>
            </div>

            {/* Button to DELETE  */}
            <div className="control is-half">
              <button
                className="button is-danger is-outlined"
                onClick={this._clear}
              >
                <span>Clear </span>
                <span className="icon-right">
                  <i className="fas fa-times" />
                </span>
              </button>
            </div>
          </div>
        </form>

        <nav
          className={`pagination is-centered is-small  ${
            this.state.disablePagination
          }`}
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            <li className={`${disabledFirst}`}>
              <button className="pagination-link" onClick={this._firstPage}>
                1
              </button>
            </li>
            <li className={`${disabledFirst}`}>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <button
                className="pagination-link is-current"
                aria-label="Current Page"
                aria-current="page"
              >
                {this.state.pageNumber}
              </button>
            </li>
            <li className={`${disabledLast}`}>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li className={`${disabledLast}`}>
              <button className="pagination-link" onClick={this._lastPage}>
                {sesionTotalPages}
              </button>
            </li>
          </ul>

          <button
            className={`pagination-previous ${disabledFirst}`}
            onClick={this._prevPage}
          >
            <i className="fas fa-arrow-left" />
          </button>
          <button
            className={`pagination-next ${disabledLast}`}
            onClick={this._nextPage}
          >
            <i className="fas fa-arrow-right" />
          </button>
        </nav>
      </div>
    )
  }
}

export default SearchForm
