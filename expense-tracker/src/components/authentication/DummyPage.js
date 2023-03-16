import { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";
import ExpenseContext from "./store/Expense-context";
const DummyPage = () => {
    const history = useHistory()
    const expCtx = useContext(ExpenseContext);
    const idToken = expCtx.token;
    const email = expCtx.email;
    const CompleteProfileHandler = () => {
        history.replace('/CompleteProfile')
    }
    const logoutHandler = () => {
        expCtx.logout(email, idToken);
        history.replace('./');
    }
    return ( <
        Fragment >
        <
        h1 > Welcome to expense tracker!!! < /h1> <
        div >
        <
        button onClick = { logoutHandler } > Logout < /button> <
        /div> <
        h4 >
        your profile is incomplete. { ' ' } <
        Link to = "/complete-profile"
        onClick = { CompleteProfileHandler } > Complete Now < /Link> <
        /h4>        <
        /Fragment>
    )
};
export default DummyPage;