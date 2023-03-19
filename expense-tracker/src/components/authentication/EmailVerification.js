import { useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import ExpenseContext from "./store/Expense-context";

const EmailVerification = () =>{
const expCtx = useContext(ExpenseContext);
const history = useHistory();
const idToken = expCtx.token;

const verificationHandler = async(e) =>{
    e.preventDefault();

    const verify = await 
                  fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk',
                  {
                    method:"POST",
                body:JSON.stringify({
                    idToken:idToken,
                    requestType:"VERIFY_EMAIL",
                }),
                headers:{
                    "Content-Type":"application/json",
                }
                  })
                  const res = await verify.json();
                  if(verify.ok){
                    console.log(res)
                  }
                  else{
                    alert(res.error.message);
                  }
                  history.replace('/DummyPage')

}
return(
    <Fragment>
        <form onSubmit={verificationHandler}>
            <h2>Verify your Email</h2>
            <p>  we've sent an email to ----- to verify your email address and activate
        your expense tracker.</p>
        <button type="submit">Verify your Email</button>
        </form>
    </Fragment>
)

};
export default EmailVerification;