import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

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

function Index() {
  const initialState = { loggedIn: Boolean(localStorage.getItem("appToken")), flashMessages: [] }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        break
      case "logout":
        draft.loggedIn = false
        break
      case "flashMessage":
        draft.flashMessages.push(action.value)
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessage messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <Hero />}
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Index />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
