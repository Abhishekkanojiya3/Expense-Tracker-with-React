import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken);
    const userLoggedIn = !!token;

    const LoginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };
    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        login: LoginHandler
    };
    return ( <
        AuthContext.Provider value = { contextValue } > { props.children } <
        /AuthContext.Provider>
    )


};
export default AuthProvider