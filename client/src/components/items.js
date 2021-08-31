import React from "react"
import Auth from "../utils/auth"

const couplelogout=()=>{
    Auth.logout()
}

 const MenuItems=[
    {
        label:'Home',
        url:'/',
        cName:'nav-links'
    },
    {
        label:'Guest login',
        url:'/login',
        cName:'nav-links'
    },
    {
        label:'Couple login',
        url:'/home',
        cName:'nav-links'
    },
   
    {
        label:'Signup',
        url:'/createuser',
        cName:'nav-links'
    },
  

]

const CoupleMenuItem =  [
    {
        label:'My Guests',
        url:'/guests',
        cName:'nav-links'
    },
    {
        label:'My Wedding',
        url:'/viewwedding',
        cName:'nav-links'
    },
    {
        label:'Create Wedding',
        url:'/createwedding',
        cName:'nav-links'
    },
    {
        label:'My wish list',
        url:'/couplewishlist',
        cName:'nav-links'
    }
  
]

const GuestMenuItem = [
    {
        label:'Wedding',
        url:'/guestlanding',
        cName:'nav-links'
    },
  
]

export  {
    MenuItems,
    GuestMenuItem,
    CoupleMenuItem
}