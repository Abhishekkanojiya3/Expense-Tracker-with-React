import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from './Login.module.css';
import ExpenseContext from "./store/Expense-context";

const ExpenseForm = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true)

    const expCtx = useContext(ExpenseContext);



    const history = useHistory()

    const emailHandler = (e) => {
        setEmail(e.target.value)
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    };

    const confirmPasswordHandle = (e) => {
        setConfirmPassword(e.target.value)
    };

    const submitHandler = async(e) => {
        e.preventDefault();

        //setIsLoading(true)

        if (
            password.length >= 6 &&
            confirmPassword.length >= 6 &&
            password === confirmPassword
        ) {
            let url;
            if (isLogin) {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk";
            } else {
                url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk";
            }

            fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }),
                    Headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    //setIsLoading(false)
                    if (res.ok) {
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                            let errorMessage = "Authentication failed";
                            if (data.error.message) {
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage);
                        });
                    }
                })
                .then((data) => {
                    if (isLogin) {
                        console.log(data.idToken);
                        const regex = /[.@]/g;
                        const emailId = data.email.replace(regex, "")
                        expCtx.login(data.idToken, emailId)
                        history.replace('/EmailVerification')
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            if (password !== confirmPassword) {
                alert("password and confirm password did not match")
            } else if (password.length <= 6 && confirmPassword.length <= 6) {
                alert('please enter atleast 6 digit')
            }
        }
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    };
    const forgetPass = () => {
        history.replace('./ForgetPassword')
    }

    const switchAuthHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    return ( <
        section >
        <
        form onSubmit = { submitHandler } >
        <
        div className = { classes.login } >
        <
        h1 > { isLogin ? "login" : "sign up" } < /h1>

        <
        input type = "email"
        id = "email"
        placeholder = "Email"
        onChange = { emailHandler }
        value = { email }
        required /
        >
        <
        input type = "password"
        id = "password"
        placeholder = "Password"
        onChange = { passwordHandler }
        value = { password }
        required /
        >
        <
        input type = "password"
        id = "Confirm password"
        placeholder = "Confirm Password"
        onChange = { confirmPasswordHandle }
        value = { confirmPassword }
        required /
        >
        <
        /div> <
        div className = { classes.login } >
        <
        button type = "submit" > { isLogin ? "login" : "Sign up" } < /button><br/ >
        <
        button onClick = { forgetPass } > ForgotPassword < /button> <
        h4 type = "button"
        onClick = { switchAuthHandler } > {
            isLogin ?
            "Don't have an account?sign up" :
                "already have an account? login"
        } <
        /h4> <
        /div> <
        /form> <
        /section>
    );
};
export default ExpenseForm;