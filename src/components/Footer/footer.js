import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

import { CURRENT_YEAR } from '../../config';

const Footer = () => (
    <div className="footer">
        <Link to="/" className="logo">
            <img alt="NBA Logo" src="/images/nba_logo.png"/>
        </Link>
        <div className="right">
            @NBA {CURRENT_YEAR} All Rights Reserved.
        </div>
    </div>
)

export default Footer;