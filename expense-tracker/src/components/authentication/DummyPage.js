import { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
const DummyPage = () => {
    const history = useHistory()
    const CompleteProfileHandler = () => {
        history.replace('/CompleteProfile')
    }
    return ( <
        Fragment >
        <
        h1 > Welcome to expense tracker!!! < /h1> <
        h4 >
        your profile is incomplete. { ' ' } <
        Link to = "/complete-profile"
        onClick = { CompleteProfileHandler } > Complete Now < /Link> <
        /h4>        <
        /Fragment>
    )
};
export default DummyPage;