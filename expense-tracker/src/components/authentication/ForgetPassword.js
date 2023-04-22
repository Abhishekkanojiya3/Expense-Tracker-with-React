import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

            axios.post('http://localhost:3000/password/forgot-password', {
                email: email
            }).then((res) => {
                setIsLoading(false)
                console.log(res)
                alert(res.data.message)
            }).catch(err => {

                alert(err.response.data.error)

            })
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