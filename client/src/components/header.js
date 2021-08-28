// import React, { useState, useEffect } from "react"

// import { useContext } from "react";
// import { Link, useLocation } from "react-router-dom";


// import { useHistory } from "react-router-dom";
// import { magic } from "../lib/magic";
// import { CallToAction, button } from "@magiclabs/ui";
// import { UserContext } from "../lib/UserContext"
// import Auth from "../utils/auth";
// import { slide as Menu } from 'react-burger-menu'
// import './burger.css'

// const NavBar = () => {
//   const history = useHistory();
//   const [user, setUser] = useContext(UserContext);
//   const [open, setOpen] = useState(false);
//   const [screenWidth, setScreenWidth] = useState(0);
//   const location = useLocation();
 
   
//     const Logout = () => {
//       magic.user.logout().then(() => {
//         setUser({ user: null });
//         localStorage.removeItem("guestEmail")
//         history.push("/");
  
//       })
//   const trackScreenWidth = () => {
//     const width = window.innerWidth;
//     setScreenWidth(width);
//     if (width > 600) {
//       setOpen(true);
//     }
//   };

//   const handleClose = () => {
//     if (screenWidth < 600) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     trackScreenWidth();
//     window.addEventListener("resize", trackScreenWidth);
//     return () => window.removeEventListener("resize", trackScreenWidth);
//   }, []);


  
  

 

//   };

//   const authenticateWithServer = async didToken => {
//     const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + didToken,
//       },
//     });

//     if (res.status === 200) {
//       // Set the UserContext to the now logged in user
//       const { email } = await magic.user.getMetadata();
//       await setUser(email);
//       //   history.push('/profile');
//       console.log("email address is:  ", email)

//     }
//   };
 
    
  

//   return (
//     <nav className="navbar">
//       <div className="nav-wrapper">
        
//       <div className="logo">
//           <Link to="/">
//             <img
//               src="https://i.pinimg.com/564x/5e/83/7d/5e837dfdd6293fbe9c5cf89c28e9b800.jpg"
//               alt="brand"
//             />
//           </Link>
//         </div>
//         <div className="list-wrapper">
//           <img
//             src="https://github.com/DwinaTech/public-images/blob/main/menu-bars.png?raw=true"
//             alt="Menu bars"
//             style={{ opacity: !open ? 1 : 0 }}
//             onClick={() => {
//               setOpen(!open);
//             }}
//           />
//           <img
//             src="https://github.com/DwinaTech/public-images/blob/main/cross-menu-icon.png?raw=true"
//             alt="Menu cross"
//             style={{ opacity: open ? 1 : 0 }}
//             onClick={() => {
//               setOpen(!open);
//             }}
//           />
//     <Menu burgerButtonClassName={ "my-class" }>
//       <ul>
//       <li>
//       <Link
//                 to="/"
//                 onClick={handleClose}
//                 style={{ color: location.pathname === "/" && "#4071f4" }}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/viewwedding"
//                 onClick={handleClose}
//                 style={{ color: location.pathname === "/about" && "#4071f4" }}
//               >
//                 View Wedding
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/Guests"
//                 onClick={handleClose}
//                 style={{ color: location.pathname === "/skills" && "#4071f4" }}
//               >
//                 Guests
//               </Link>
//             </li>
//         {user?.loading ? (
//           <div style={{ height: '58px' }}></div>
//         ) : user?.issuer ? (
//           <>


//             <li>
//               <button color='warning' size='sm' onPress={Logout}>
//                 Guest Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <li>
//             <CallToAction color='primary' size='sm' onPress={() => history.push('/login')}>
//               Guest Login
//             </CallToAction>
//           </li>
//         )}


//         {user?.loading ? (
//           <div style={{ height: '58px' }}></div>
//         ) : user?.issuer ? (
//           <>


//             <li>
//               <button color='warning' size='sm' onPress={Logout}>
//                 Couple Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <li>
//             <CallToAction color='primary' size='sm' onPress={() => history.push('/home')}>
//               Couple Login
//             </CallToAction>
//           </li>
//         )}
// <li>
          
//         </li>
//       </ul>

//     </Menu>
//     </div>
//     </div>
//     </nav>

//   )
// }

// export default NavBar;
