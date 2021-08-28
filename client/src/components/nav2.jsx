import React, {Component} from "react"
import {MenuItems} from "./items"
import "./nav2.css"


class Nav2 extends Component {

state = {clicked:false}

handleClick = () =>{
    this.setState({clicked: !this.state.clicked})
}

render () {
    return(
        
        <nav className="NavBarItems collapse navbar-collapse">
            <h1 className="navbar-logo">TBD <i className="fas fa-fan"></i></h1>
            <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>

            </div>
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                {MenuItems.map((item,index)=>{
                    return (
                        <li kew={index} onClick={item.function}>
                            <a className={item.cName} href={item.url} >
                            
                            {item.label}
                            </a>
                            
                        </li>  
                    )
                })}
                
            </ul>

        </nav>
    )
}

}




export default Nav2