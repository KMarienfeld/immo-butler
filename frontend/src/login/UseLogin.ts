import React, {useState} from 'react';
import axios from "axios";

function UseLogin() {

    const [user, setUser] = useState<string>()
    function login(username:string, password:string) {
        return axios.post("/user/login", undefined, {auth: {username, password}})
            .then((r)=>setUser(r.data))
    }
    return {login, user}
}

export default UseLogin;