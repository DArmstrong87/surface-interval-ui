import React from 'react';
import logo from './logo.svg';
import './App.css';

interface MyButtonProps {
    /** The text to display inside the button */
    title: string;
    /** Whether the button can be interacted with */
    disabled: boolean;
}


function Home({ title, disabled }: MyButtonProps) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <body>
                <button disabled={disabled}>{title}</button>
            </body>
        </div>
    );
}

export default Home;
