import { Fragment, useContext, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import AuthContext from "./store/auth-context";
import classes from './Authentication.module.css';

const Authentication = () => {
        const [isLogin, setIsLogin] = useState(false);
        const authcntx = useContext(AuthContext);
        const SignUpHandler = (email, password) => {
            fetch(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            returnSecureToken: true
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                )
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        return res.json().then((data) => {
                            const errormsg = data.error.message;
                            throw new Error(errormsg)
                        })
                    }
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
        const LoginHandler = (email, password) => {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            const errormsg = data.error.message;
                            throw new Error(errormsg);
                        })
                    }
                })
                .then((data) => {
                    authcntx.login(data.idToken)
                    console.log(data)
                })
                .catch((err) => {
                    alert(err.message)
                })
        };
        const onClickSignUpHandler = () => {
            setIsLogin(true);
        };
        const onClickLoginHandler = () => {
            setIsLogin(false);
        };
        return ( <
                Fragment > {!isLogin && < SignUp onSignUp = { SignUpHandler }
                    />}  {
                        isLogin && < Login onLogin = { LoginHandler }
                        />}  {
                            !isLogin && ( < button className = { classes.signup }
                                onClick = { onClickSignUpHandler } > Have an account ? Login < /button>
                            )
                        } {
                            isLogin && ( < button className = { classes.signup }
                                onClick = { onClickLoginHandler } > Dont have account ? SignUp < /button>
                            )
                        }





                        <
                        /Fragment>

                    );
                };
                export default Authentication;