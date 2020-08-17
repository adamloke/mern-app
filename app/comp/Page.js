import React, { useEffect } from "react"
import Container from './Container'

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | App`
    window.scrollTo
  }, [])
  return (
    <Container wide={props.wide}>
      {props.children}
    </Container>
  )
}

export default Page