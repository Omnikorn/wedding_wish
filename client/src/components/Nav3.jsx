import React, { useContext, useState, useEffect } from "react"
import { MenuItems, GuestMenuItem, CoupleMenuItem } from "./items"
import "./nav2.css"
import Auth from "../utils/auth"
import { useHistory } from "react-router-dom"
import { Link, useLocation } from "react-router-dom"
import { magic } from "../lib/magic"
import { UserContext } from "../lib/UserContext"
import rose from "../rose.png"


function Nav2() {
  const [clicked, setClick] = useState(false)
  const [userType, setUserType] = useState("")
  const history = useHistory()
  const [user, setUser] = useState("")

  useEffect(() => {
    // if (user) {
    let isUser = localStorage.getItem("user")
    let guestUser = localStorage.getItem("guest")
    if (isUser) {
      console.log("USER ", isUser, localStorage.getItem("user"))
      setUserType("couple")
    }
    else if(guestUser){
      setUserType("guest")
    }
    // }
  })

  // Location = () =>useLocation()
  // History =()=> useHistory()

  const couplelogout = (e) => {
    e.preventDefault()
    Auth.logout()
    console.log("LINE NO #666 ", localStorage.getItem("user"))
    setUserType("")
    history.push("/")
  }

  const guestlogout = (e) => {
    e.preventDefault()
    Auth.logout()
    setUserType("")
    history.push("/")
    // localStorage.removeItem("guest")
  }
  

  const handleClick = () => {
    setClick(!clicked)
  }

  return (
    
    <nav className="NavBarItems" role="navigation">
      <div className="logo">
          <Link to="/">
            <img className="rose"
              src={rose}
              alt="brand"
            />
          </Link>
          </div>
      {/* <h1 className="navbar-logo" href="/"> <i className="fas fa-fan"></i></h1> */}
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {userType === "" &&
          MenuItems.map((item, index) => {
            return (
              <li onClick={() => setClick(false)} kew={index}>
                
                <Link className={item.cName} to={item.url}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        {userType === "couple" &&
          CoupleMenuItem.map((item, index) => {
            return (
              <li onClick={() => setClick(false)} key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        {userType == "couple" && (
          <li onClick={() => setClick(false)} className="nav-links" onClick={couplelogout}>
            Couple Logout
          </li>
        )}
		 {userType === "guest" &&
          GuestMenuItem.map((item, index) => {
            return (
              <li onClick={() => setClick(false)} key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        {userType == "guest" && (
          <li onClick={() => setClick(false)} className="nav-links" onClick={guestlogout}>
            Guest Logout
          </li>
        )}
        {/* <li className="nav-links" onClick={couplelogout}>
						Logout
					</li>

					<li>
						<a className="nav-links" href="/login">Guest Login</a>
					</li>

                    <li className="nav-links" onClick={guestlogout}>
                        Guest Logout
                    </li>  */}
      </ul>
    </nav>
  )
}

export default Nav2
