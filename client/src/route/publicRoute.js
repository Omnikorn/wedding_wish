import React from "react"
import { Route, Redirect } from "react-router-dom"

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
     
        if (localStorage.getItem("guest")) {
          return <Redirect to={`/guestlanding`} />
        } else if (localStorage.getItem("user")) {
          return <Redirect to="/guests" />
        } else {
          
          return <Component {...props} />
        }
      }}
    />
  )
}

export default PublicRoute
