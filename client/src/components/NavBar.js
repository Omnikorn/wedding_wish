import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { magic } from "../lib/magic";
import { CallToAction, button, TextButton } from "@magiclabs/ui";
import { UserContext } from "../lib/UserContext"
import Auth from "../utils/auth";
import { useContext } from "react";
import "../components/NavBar.css"
import rose from "../rose.png"
import { MagicIncomingWindowMessage } from "magic-sdk";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const location = useLocation();
  const history = useHistory();
    const [user, setUser] = useContext(UserContext);
  const trackScreenWidth = () => {
    const width = window.innerWidth;
    setScreenWidth(width);
    if (width > 600) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    if (screenWidth < 600) {
      setOpen(false);
    }
  };
  useEffect(() => {
    trackScreenWidth();
    window.addEventListener("resize", trackScreenWidth);
    return () => window.removeEventListener("resize", trackScreenWidth);
  }, []);
    const Logout = () => {
      magic.user.logout().then(() => {
        setUser({ user: null });
        localStorage.removeItem("guest")
        history.push("/login");
      })
    };
    const authenticateWithServer = async didToken => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        const { email } = await magic.user.getMetadata();
        await setUser(email);
        //   history.push('/profile');
        console.log("email address is:  ", email)
  
      }
    };
    const coupleLogout = () => {
      Auth.logout()
    }
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
      <div className="logo">
          <Link to="/">
            <img className="rose"
              src={rose}
              alt="brand"
            />
          </Link>
        </div>
        <div className="list-wrapper">
          <img
            src="https://github.com/DwinaTech/public-images/blob/main/menu-bars.png?raw=true"
            alt="Menu bars"
            style={{ opacity: !open ? 1 : 0 }}
            onClick={() => {
              setOpen(!open);
            }}
          />
          <img
            src="https://github.com/DwinaTech/public-images/blob/main/cross-menu-icon.png?raw=true"
            alt="Menu cross"
            style={{ opacity: open ? 1 : 0 }}
            onClick={() => {
              setOpen(!open);
            }}
          />
          <ul style={{ left: open ? "0" : "-100vw" }} className="navi">
            <li>
              <Link
                to="/"
                onClick={handleClose}
                style={{ color: location.pathname === "/" && "#4071f4" }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/viewwedding"
                onClick={handleClose}
                style={{ color: location.pathname === "/viewwedding" && "#4071f4" }}
              >
                Wedding
              </Link>
              <Link
                to="/guestlanding"
                onClick={handleClose}
                style={{ color: location.pathname === "/guestlanding" && "#4071f4" }}
              >
Guest
              </Link>
            </li>
            <li>
              <Link
                to="/Guests"
                onClick={handleClose}
                style={{ color: location.pathname === "/Guests" && "#4071f4" }}
              >
                Guests
              </Link>
            </li>
            
            <li>
            <TextButton to="/home" color='warning' size='sm' onClick={coupleLogout}>
                Couple Logout
              </TextButton>
            </li>
        
        
          <li>
              <Link to="/home" color='primary' size='sm' onPress={() => history.push('/home')}>
              Couple Login
            </Link>
          </li>
        
        {user?.loading ? (
          <div style={{ height: '58px' }}></div>
        ) : user?.issuer ? (
          <>
            <li>
            <TextButton to="/login" color='warning' size='sm' onPress={Logout}>
                Guest Logout
                </TextButton>
            </li>
          </>
        ) : (
          <li>
                <Link to="/login" color='primary' size='sm' onPress={() => history.push('/login')}>
              Guest Login
            </Link>
          </li>
        )}
        <li>
        <Link
                to="/createwedding"
                onClick={handleClose}
                style={{ color: location.pathname === "/createwedding" && "#4071f4" }}
              >
               Create Wedding
              </Link>
              </li>
              <li>
        <Link
                to="/createuser"
                onClick={handleClose}
                style={{ color: location.pathname === "/createuser" && "#4071f4" }}
              >
               Signup
              </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;