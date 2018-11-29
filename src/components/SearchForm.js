import React, { Component } from "react"

const API_KEY = "28b20f8"

export class SearchForm extends Component {
  state = {
    inputMovie: "",
    type: "",
    pageNumber: 1,
    totalPages: 0,
    Search: [],
    arrayNum: [0, 0, 1]
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
        this.setState({ pageNumber, totalPages: paginas })
      })
  }

  _clear = e => {
    e.preventDefault()
    const Search = []
    const inputMovie = "teo"
    this.props.onResults(Search)
    // esto nuevo para cambiar el placeholder con la busqueda anterior...
    window.sessionStorage.setItem("sessionMovies", JSON.stringify(Search))
    this.setState({ placeholder: inputMovie })
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
        this.setState({ pageNumber: newPage, totalPages: paginas })
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
        <form onSubmit={this._handleSubmit}>
          {/* <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Texto a buscar</label>
            </div>
            <div className="field-body">
              <div className="filed">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this._handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Tipo</label>
            </div>
            <div className="field-body">
              <div className="filed">
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
            </div>
          </div>
          <div className="SearchForm-wrapper">
            <div class="field is-horizontal">
              <div class="field-label" />
              <div class="field-body">
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="button is-success is-outlined"
                      disabled={!this.state.inputMovie}
                    >
                      Search
                    </button>
                  </div>
                  <div className="control">
                    <button
                      className="button is-danger is-outlined"
                      onClick={this._clear}
                    >
                      <span>Delete</span>
                      <span class="icon is-small">
                        <i class="fas fa-times" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder={this.props.placeholder}
                onChange={this._handleChange}
              />
            </div>
          </div>

          <div class="field">
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

          <div class="field is-grouped buttons-wrapper">
            <div className="control is-half">
              <button
                className="button is-success is-outlined"
                disabled={!this.state.inputMovie}
              >
                Search
              </button>
            </div>
            <div className="control is-half">
              <button
                className="button is-danger is-outlined"
                onClick={this._clear}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </form>

        <nav
          className="pagination is-centered is-small"
          role="navigation"
          aria-label="pagination"
        >
          <button
            className={`pagination-previous ${disabledFirst}`}
            onClick={this._prevPage}
          >
            Previous
          </button>
          <button
            className={`pagination-next ${disabledLast}`}
            onClick={this._nextPage}
          >
            Next page
          </button>
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
        </nav>
      </div>
    )
  }
}

export default SearchForm
