import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-inverse">
        <div className="container">
            <div className="navbar-header">
                <Link className='navbar-brand' to='/'>Tasksman</Link>
            </div>            
        </div>
    </nav>
)

export default Header;