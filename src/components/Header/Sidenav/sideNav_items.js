import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../../firebase';

import './sideNav.css';

const SideNavItems = (props) => {

    const items = [
        {
            type: 'option',
            icon: 'fas fa-home',
            text: 'HOME',
            link: '/',
            login: ''
        },
        {
            type: 'option',
            icon: 'fas fa-file-alt',
            text: 'NEWS',
            link: '/news',
            login: ''
        },
        {
            type: 'option',
            icon: 'fas fa-play',
            text: 'VIDEOS',
            link: '/videos',
            login: ''
        },
        {
            type: 'option',
            icon: 'fas fa-sign-in-alt',
            text: 'DASHBOARD',
            link: '/dashboard',
            login: false
        },
        {
            type: 'option',
            icon: 'fas fa-sign-in-alt',
            text: 'SIGN IN',
            link: '/sign-in',
            login: true
        },
        {
            type: 'option',
            icon: 'fas fa-sign-out-alt',
            text: 'SIGN OUT',
            link: '/sign-out',
            login: false
        }
    ]

    const element = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <span><i className={item.icon}></i></span>   
                {item.text}
            </Link> 
        </div>
    )

    const restricted = (item,i) => {
        let template = null;
        
        if(props.user === null && item.login) {
            template = element(item,i)
        }

        if(props.user !== null && !item.login) {
            if(item.link === '/sign-out') {
                template = (
                    <div key={i} className={item.type}
                        onClick={()=>{
                            firebase.auth().signOut()
                            .then(() => {
                                props.history.push('/')
                            })
                        }}
                    >
                        <span><i className={item.icon}></i></span>
                        {item.text}
                    </div>
                )
            } else {
                template = element(item,i)
            }
        }

        return template;
    }

    const showItems = () => {
        return items.map((item,i) => {
            return item.login !=='' ? 
                restricted(item,i)
            :
            element(item,i)
        })
    }

    return(
        <div>
            {showItems()}
        </div>
    )
}

export default withRouter(SideNavItems);