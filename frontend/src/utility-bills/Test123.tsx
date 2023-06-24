import React from 'react';
import {Link} from "react-router-dom";

function Test123() {
    return (
        <div>
            <h1>helloWorld</h1>
            <Link className="menuLink" to="/add-utility-bill">Kostenarten</Link>
        </div>
    );
}

export default Test123;