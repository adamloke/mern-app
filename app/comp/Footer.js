import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <>
    <footer className="border-top text-center small text-muted py-3">
  <p>
    <Link to="/" className="mx-1">
      Home
    </Link>{" "}
    |{" "}
    <Link to="/about"className="mx-1">
      About Us
    </Link>{" "}
    |{" "}
    <Link to="/terms"className="mx-1" >
      Terms
    </Link>
  </p>
  <p className="m-0">
    Copyright © 2020{" "}
    <a href="/" className="text-muted">
      ComplexApp
    </a>
    . All rights reserved.
  </p>
</footer>;

      
    </>
  )
}

export default Footer