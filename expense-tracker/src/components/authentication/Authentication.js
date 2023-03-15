import { Fragment } from "react";
import SignUp from "./SignUp";

const Authentication = () => {
    const signupHandler = async(email, password) => {
        try {
            const res = await
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk', {
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
            if (!res.ok) {
                throw new Error('Something went wrong');
            }
            const data = await res.json();
            console.log(data);
            console.log('succesful');
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }
    return ( <
        Fragment >
        <
        SignUp onSignUp = { signupHandler }
        /> <
        /Fragment>

    );
};
export default Authentication;