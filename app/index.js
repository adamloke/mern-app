import React, { useState, useReducer } from "react"
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
import ViewSinglePost from "./comp/ViewSinglePost"
import FlashMessage from "./comp/FlashMessage"
import ExampleContext from "./ExampleContext"

function Index() {
  const initialState = { loggedIn: Boolean(localStorage.getItem("appToken")), flashMessages: [] }

  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  const [loggedIn, setloggedIn] = useState(Boolean(localStorage.getItem("appToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setloggedIn }}>
      <BrowserRouter>
        <FlashMessage messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <Hero />}
          </Route>
          <Route path="/post/:id">
            <ViewSinglePost />
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
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<Index />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
