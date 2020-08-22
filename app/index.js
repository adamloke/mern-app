import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

/* Components */
import Header from "./comp/Header"
import Hero from "./comp/Hero"
import Home from "./comp/Home"
import Footer from "./comp/Footer"
import About from "./comp/About"
import Terms from "./comp/Terms"
import CreatePost from "./comp/CreatePost"

function Index() {
  const [loggedIn, setloggedIn] = useState(Boolean(localStorage.getItem("appToken")))

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setloggedIn={setloggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <Hero />}
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Index />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
