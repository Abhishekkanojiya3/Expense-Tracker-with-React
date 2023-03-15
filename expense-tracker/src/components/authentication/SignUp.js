import { useRef } from "react";
import classes from './SignUp.module.css';

const SignUp = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmInputRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            alert('Incorrect Password');
        } else {
            props.onSignUp(enteredEmail, enteredConfirmPassword)
        }

    }


    return ( <
        section >
        <
        div className = { classes.signUp } >
        <
        h1 > Sign Up < /h1> <
        form onSubmit = { submitHandler } >
        <
        input name = "email"
        type = 'email'
        placeholder = "Email"
        required ref = { emailInputRef }
        /> <
        input name = "password"
        type = 'password'
        placeholder = "Password"
        required ref = { passwordInputRef }
        /> <
        input name = "password"
        type = 'password'
        placeholder = "Confirm Password"
        required ref = { confirmInputRef }
        /> <
        button > Sign Up < /button> <
        /form> <
        /div> <
        button className = { classes.login } > Have an account ? Login < /button> <
        /section>

    )
};
export default SignUp;