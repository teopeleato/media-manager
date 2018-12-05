import React from "react"

const LogInView = ({ onSubmit }) => {
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success">Login</button>
          </p>
        </div>

        {/* <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log In</button> */}
      </form>
    </div>
  )
}

export default LogInView

{
  /* <div>
        <div className="login-container">
          <button
            className="button is-primary is-outlined"
            onClick={this._showLogin}
          >
            Sign in
          </button>
        </div>
        <div className={`modal ${this.state.showLogin}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Log in</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this._closeLogin}
              />
            </header>
            <section className="modal-card-body">
              <form onSubmit={this._handleSubmit}>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      onChange={this._handleUserChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      onChange={this._handlePassChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button type="submit" className="button is-success">
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot" />
          </div>
        </div>
      </div> */
}
