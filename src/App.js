import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import "./App.css"
import "bulma/css/bulma.css"
import { Detail } from "./pages/Detail"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { LogIn } from "./components/LogIn/LogIn"
import { LogOut } from "./components/LogOut/index"
import { SignUpContainer } from "./components/SignUp/index"
import { MyLists } from "./components/MyLists/index"

class App extends Component {
  state = { loading: true, authenticated: false, user: null }
  render() {
    /* const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    } */

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id/:ismylists" component={Detail} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUpContainer} />
          <Route exact path="/logout" component={LogOut} />
          <Route exact path="/mylists/" component={MyLists} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App

{
  /* <Route exact path="/mylists/:listtype" component={MyLists} /> */
}
