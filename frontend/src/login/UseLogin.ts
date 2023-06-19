import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function UseLogin() {

    const [user, setUser] = useState<string>()
    const nav = useNavigate()

    function login(username:string, password:string) {
        return axios.post("/user/login", undefined, {auth: {username:username, password:password}})
            .then((r)=>console.log("Blub"+ r))
            .then(() => {
                nav("/all-bills")
            })
            .catch((error) => {
                console.error("Error beim Login: ", error)
            })
    }

    function getUsername() {
        if (user && user !== "anonymousUser") {
            nav("/all-bills")
        } else
        axios.get("/user/me")
            .then((r)=>setUser(r.data))


    }
    return {login, user, getUsername}
}

export default UseLogin;