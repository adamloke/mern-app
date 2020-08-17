import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

/* Components */
import Header from './comp/Header'
import Hero from './comp/Hero'
import Footer from './comp/Footer'
import About  from './comp/About'
import Terms from './comp/Terms'

function ExampleComp() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Hero />
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

ReactDOM.render(<ExampleComp />, document.querySelector('#app'))

if(module.hot) {
  module.hot.accept()
}