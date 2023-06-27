import React from 'react';
import {Link} from "react-router-dom";

function Test123() {
    return (
        <div>
            <h3>Die Page dient als Workaround, um auf die Add Seite zu gelangen:</h3>
            <Link className="menuLink" to="/add-utility-bill">Klicke hier um eine neue Nebenkostenabrechnung zu
                erstellen</Link>
        </div>
    );
}

export default Test123;