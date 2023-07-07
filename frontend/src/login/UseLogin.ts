import {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function UseLogin() {

    const [user, setUser] = useState<string>("")
    const nav = useNavigate()
    function login(username:string, password:string) {
        return axios.post("/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                getUsername();
                toast.success("Login war erfolgreich!")
            }).catch((error) => {
                console.log(error);
                toast.error("Zugangsdaten sind leider falsch")
            })
    }

    function getUsername() {
        let username = undefined;
        axios.get("/user/me").then((response) => {
            setUser(response.data);
            username = response.data;
            if (username === "anonymousUser" || username === undefined) {
                nav("/login")
            } else nav("/all-utility-bills")
        }).then(() => {
        })
            .catch(error => {
                console.log(error)
            })
    }

    function logout() {
        return axios.post("user/logout")
            .then(() => {
                setUser("");
                toast.success("Du bist jetzt ausgeloggt");
                nav("/login");
            })
    }

    return {login, getUsername, user, logout}
}

export default UseLogin;