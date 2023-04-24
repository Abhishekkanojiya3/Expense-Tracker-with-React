import { useState,useContext } from "react";
import {useHistory} from "react-router-dom";
import classes from './Login.module.css';
//import ExpenseContext from "./store/Expense-context";
import { useDispatch } from "react-redux";
import { authActions } from "./store/Auth-slice";
import axios from 'axios';

const ExpenseForm = (props) => {
    const [email, setEmail] = useState("")
    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true)

  //  const expCtx = useContext(ExpenseContext);

   const dispatch = useDispatch();

    const history=useHistory()

    const nameHandler = (e) => {
      setName(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
      };
    
      const passwordHandler = (e) => {
        setPassword(e.target.value)
      };
    
      const confirmPasswordHandle = (e) => {
        setConfirmPassword(e.target.value)
      };

      const submitHandler = async (e) => {
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
              //"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk";
              "http://localhost:3000/user/login"
          } else {
            url =
              //"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk";
              "http://localhost:3000/user/signup"
          }
    
          axios
          .post(url, {
            name:name,
            email: email,
            password: password,
          })
          // .then((res) => {
          //   //setIsLoading(false)
          //   if (res.status === 200) {
          //     return res.data;
          //   } else {
          //     let errorMessage = res.data.err;
          //     if (res.data.error.message) {
          //       errorMessage = res.data.error.message;
          //     }
          //     throw new Error(errorMessage);
          //   }
          // })
          // .then((data) => {
          //   if (isLogin) {
          //     console.log(data.idToken);
          //     // const regex = /[.@]/g;
          //     // const email = data.email.replace(regex, "")
          //     //  expCtx.login(data.idToken,emailId)
          //     //history.replace('/EmailVerification')
          //     dispatch(
          //       authActions.login({ email: email, token: data.idToken })
          //     );
          .then(response=>{
            console.log(response)
            dispatch(authActions.login({
                token:response.data.token,
                isPremium:response.data.isPremium
              }))
              history.replace("/Expenses");
          })
          // .catch((err) => {
          //   alert(err.message);
          // });
      // } else {
      //   if (password !== confirmPassword) {
      //     alert("password and confirm password did not match");
      //   } else if (password.length <= 6 && confirmPassword.length <= 6) {
      //     alert("please enter at least 6 digit");
      //   }
      }
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    };
      const forgetPass = () =>{
        history.replace('./ForgetPassword')
      }
    
      const switchAuthHandler = () => {
        setIsLogin((prevState) => !prevState);
      };
    
      return (
        <section>
          <form onSubmit={submitHandler}>
          <div className={classes.login}>
              <h1>{isLogin ? "Login" : "Sign up"}</h1>

              <input
                type="text"
                id="name"
                placeholder="Name"
                onChange={nameHandler}
                value={name}
                required
              />
           
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={emailHandler}
                value={email}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={passwordHandler}
                value={password}
                required
              />
              <input
                type="password"
                id="Confirm password"
                placeholder="Confirm Password"
                onChange={confirmPasswordHandle}
                value={confirmPassword}
                required
              />
            </div>
            <div className={classes.login}>
            <button type="submit">{isLogin ? "Login" : "Sign up"}</button><br/>
            <button onClick={forgetPass}>ForgotPassword</button>
            <h4 type="button" onClick={switchAuthHandler}>
              {isLogin 
                ? "Don't have an account?sign up"
                : "already have an account? login"}
            </h4>
            </div>
          </form>
        </section>
      );
    };
export default ExpenseForm;