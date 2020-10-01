import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function HeaderLogin(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout() {
    appDispatch({ type: "logout" })
  }

  function handleSearchWindow(e) {
    e.preventDefault()
    appDispatch({ type: "openSearch" })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a onClick={handleSearchWindow} href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>{" "}
      <span onClick={() => appDispatch({ type: "toggleChat" })} className={"mr-2 header-chat-icon " + (appState.chatCount ? "text-danger" : "text-white")}>
        <i className="fas fa-comment"></i>
        {appState.chatCount ? <span className="chat-count-badge text-white">{appState.chatCount < 10 ? appState.chatCount : "9+"}</span> : ""}
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Link to="/create-post" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLogin
