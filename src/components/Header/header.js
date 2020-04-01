import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import SideNav from './Sidenav/sideNav';

const Header = (props) => {

    const navBars = () => (
        <div className="bars" onClick={props.onShowNav}>
           <i className="fas fa-bars"></i>
        </div>
    )

    const logo = () => (
        <Link to="/" className="logo">
            <img alt="NBA Logo" src="/images/nba_logo.png"/>
        </Link>
    )

    return(
        <header className="header">
            <SideNav {...props}/>
            <div className="headerOpt">
               {navBars()}
               {logo()} 
            </div>
        </header>
    )
}

export default Header;