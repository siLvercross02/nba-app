import React from 'react';
import { Link } from 'react-router-dom';

import './sideNav.css';

const SideNavItems = () => {

    const items = [
        {
            type: 'option',
            icon: 'fas fa-home',
            text: 'HOME',
            link: '/'
        },
        {
            type: 'option',
            icon: 'fas fa-file-alt',
            text: 'NEWS',
            link: '/news'
        },
        {
            type: 'option',
            icon: 'fas fa-play',
            text: 'VIDEOS',
            link: '/videos'
        },
        {
            type: 'option',
            icon: 'fas fa-sign-in-alt',
            text: 'SIGN IN',
            link: '/sign-in'
        },
        {
            type: 'option',
            icon: 'fas fa-sign-out-alt',
            text: 'SIGN OUT',
            link: '/sign-out'
        }
    ]

    const showItems = () => {
        return items.map((item,i) => {
            return(
                <div key={i} className={item.type}>
                    <Link to={item.link}>
                        <span><i className={item.icon}></i></span>   
                        {item.text}
                    </Link> 
                </div>
            )
        })
    }

    return(
        <div>
            {showItems()}
        </div>
    )
}

export default SideNavItems;