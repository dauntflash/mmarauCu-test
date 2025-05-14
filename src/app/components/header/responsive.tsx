"use client"
import React, { useState } from 'react'
import MobileNav from './mobile';
import NavBar from './navBar';

//responsive
function Responsive() { 
    const [showNav, setShowNav] = useState(false);
    const handleNavShow = () => {
        setShowNav(true)
    };
    const handleCloseNav = () => {
        setShowNav(false)
    };
  return (
    <div>
        <MobileNav showNav = {showNav} closeNav = {handleCloseNav}/>
        <NavBar openNav={handleNavShow} />
      
    </div>
  )
}

export default Responsive