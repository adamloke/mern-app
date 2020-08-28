import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function HeaderLogOut(props) {
  const appDispatch = useContext(DispatchContext)

  //login form input
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  // send login data to backend
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/login", { username, password })
      if (response.data) {
        localStorage.setItem("appToken", response.data.token)
        localStorage.setItem("appUsername", response.data.username)
        localStorage.setItem("appAvatar", response.data.avatar)
        appDispatch({ type: "login" })
      } else {
        console.log("Incorrect login information")
      }
    } catch (e) {
      console.log(e.response.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={handleUsername} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={handlePassword} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" autoComplete="off" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLogOut
