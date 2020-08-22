import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const handleTitle = (e) => setTitle(e.target.value)
  const handleBody = (e) => setBody(e.target.value)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: localStorage.getItem("appToken") })
      //Redirect to new post url
      props.addFlashMessage("Great! You have created a new post")
      props.history.push(`/post/${response.data}`)
      console.log("new post was created")
    } catch (e) {
      console.log("Error")
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={handleTitle} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={handleBody} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>
        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
