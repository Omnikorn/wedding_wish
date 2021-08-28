import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRouteCouple = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("user")) {
            
          return <Component {...props} />
        } else {
        //   alert("else workign")

          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRouteCouple
