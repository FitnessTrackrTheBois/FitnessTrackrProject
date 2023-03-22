import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
const App=() => {
    return(
        <div>
            <nav>

            </nav>
            <Routes>

            </Routes>
        </div>
    )
}

ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    ,document.getElementById('app')
)