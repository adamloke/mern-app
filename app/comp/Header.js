import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeaderLogOut from "./HeaderLogOut"
import HeaderLogin from "./HeaderLogin"

function Header() {
  const [loggedIn, setloggedIn] = useState()

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            React App
          </Link>
        </h4>
        {loggedIn ? <HeaderLogin setloggedIn={setloggedIn} /> : <HeaderLogOut setloggedIn={setloggedIn} />}
      </div>
    </header>
  )
}

export default Header
