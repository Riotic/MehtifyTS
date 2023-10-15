import React from 'react';
import '../../css/Header.css';
import logo from '../../media/img/logoHeader.png';

function Header(): JSX.Element {
    return (
        <header className="App-header">
            <img src={logo} className='App-logo' alt="logoheader" />
            <h1>MEHTIFY</h1>
            <div></div>
        </header>
    );
}

export default Header;
