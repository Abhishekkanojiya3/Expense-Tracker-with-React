import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ForgetPassword = () => {
        const history = useHistory();
        const [email, setEmail] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        const emailHandler = (e) => {
            setEmail(e.target.value);
        };
        const passwordHandler = async(e) => {
            e.preventDefault();
            setIsLoading(true);

            const reset = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk', {
                method: "POST",
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const res = await reset.json();
            setIsLoading(false);
            if (reset.ok) {
                console.log(res)
            } else {
                alert(res.error.message)
            }
        };
        const backToLoginHandler = () => {
            history.replace('/')
        }
        return ( <
                Fragment >
                <
                form onSubmit = { passwordHandler } >
                <
                p > entered email with which you have registered ? < /p> <
                input type = "email"
                id = "email"
                placeholder = 'Email'
                onChange = { emailHandler }
                value = { email }
                required /
                > {!isLoading && < button className = 'btn' > Send Link < /button>} <
                    p type = "button"
                    onClick = { backToLoginHandler } >
                    already a user ? Login <
                    /p> {
                        isLoading && < p > Sending request... < /p>} <
                            /form> <
                            /Fragment>
                    )

                };
                export default ForgetPassword;