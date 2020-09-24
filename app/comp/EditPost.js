import React, { useEffect, useState, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import Page from "./page"
import LoadingIcon from "./LoadingIcon"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ViewSinglePost() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const originalState = {
    title: {
      value: "",
      hasError: false,
      message: "",
    },
    body: {
      value: "",
      hasError: false,
      message: "",
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        break
      case "titleChange":
        draft.title.hasError = false
        draft.title.value = action.value
        break
      case "bodyChange":
        draft.body.hasError = false
        draft.body.value = action.value
        break
      case "submitRequest":
        if (!draft.title.hasError && !draft.body.hasError) {
          draft.sendCount++
        }
        break
      case "saveRequestStarted":
        draft.isSaving = true
        break
      case "saveRequestFinished":
        draft.isSaving = false
        break
      case "titleRules":
        if (!action.value.trim()) {
          draft.title.hasError = true
          draft.title.message = "You must provide a title"
        }
        break
      case "bodyRules":
        if (!action.value.trim()) {
          draft.body.hasError = true
          draft.body.message = "You must provide body content"
        }
        break
      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "titleRules", value: state.title.value })
    dispatch({ type: "bodyRules", value: state.body.value })
    dispatch({ type: "submitRequest" })
  }

  // axios request to display original post
  useEffect(() => {
    const Request = Axios.CancelToken.source()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, { cancelToken: Request.token })
        dispatch({ type: "fetchComplete", value: response.data })
      } catch (e) {
        console.log("There was a problem or the request was cancelled")
      }
    }
    fetchPost()
    return () => {
      Request.cancel()
    }
  }, [])

  // axios request to update original post
  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      const Request = Axios.CancelToken.source()
      async function fetchPost() {
        try {
          const response = await Axios.post(`/post/${state.id}/edit`, { title: state.title.value, body: state.body.value, token: appState.user.token }, { cancelToken: Request.token })
          dispatch({ type: "saveRequestFinished" })
          appDispatch({ type: "flashMessage", value: "Post was updated!" })
        } catch (e) {
          console.log("There was a problem or the request was cancelled")
        }
      }
      fetchPost()
      return () => {
        Request.cancel()
      }
    }
  }, [state.sendCount])

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingIcon />
      </Page>
    )

  return (
    <Page title="Edit Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onBlur={(e) => dispatch({ type: "titleRules", value: e.target.value })} onChange={(e) => dispatch({ type: "titleChange", value: e.target.value })} value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
          {state.title.hasError && <div className="alert alert-danger small liveValidateMessage">{state.title.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onBlur={(e) => dispatch({ type: "bodyRules", value: e.target.value })} onChange={(e) => dispatch({ type: "bodyChange", value: e.target.value })} value={state.body.value} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
          {state.body.hasError && <div className="alert alert-danger small liveValidateMessage">{state.body.message}</div>}
        </div>
        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Update
        </button>
      </form>
    </Page>
  )
}

export default ViewSinglePost
