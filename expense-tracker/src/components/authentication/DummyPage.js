import { Fragment } from "react";
import { useHistory } from "react-router-dom";
const DummyPage = () => {
    const history = useHistory()
    const CompleteProfileHandler = () => {
        history.replace('/CompleteProfile')
    }
    return ( <
        Fragment >
        <
        h1 > Welcome to expense tracker!!! < /h1> <
        h4 type = "button"
        onClick = { CompleteProfileHandler } > your profile is incomplete.Complete Now < /h4> <
        /Fragment>
    )
};
export default DummyPage;