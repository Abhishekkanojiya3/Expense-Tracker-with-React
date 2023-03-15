import { useRef } from "react";
import classes from './Login.module.css'

const Login = (props) => {
    const emailInputRef = useRef('');
    const passwordInputRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        props.onLogin(enteredEmail, enteredPassword)
    }
    return ( <
        section >

        <
        div className = { classes.login } >

        <
        form onSubmit = { submitHandler } >

        <
        h1 > LogIn < /h1>  <
        input name = 'email'
        type = 'email'
        placeholder = "Email"
        required ref = { emailInputRef }
        />  <
        input name = 'password'
        type = 'password'
        placeholder = "Password"
        required ref = { passwordInputRef }
        />  <
        button > Login < /button>  <
        a href = '' > Forgot password ? < /a>  <
        /form>  <
        /div>  <
        /section>
    )

};
export default Login;