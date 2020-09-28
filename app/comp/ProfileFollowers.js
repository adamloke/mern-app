import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import LoadingIcon from "./LoadingIcon"

function ProfileFollowers(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const Request = Axios.CancelToken.source()
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, { cancelToken: Request.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchPosts()
    return () => {
      Request.cancel()
    }
  }, [username])

  if (isLoading) return <LoadingIcon />

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowers
