import './App.css';
//import Authentication from './components/authentication/Authentication';
import { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import DummyPage from './components/authentication/DummyPage';
import ExpenseForm from './components/authentication/ExpenseForm';
import CompleteProfile from './components/authentication/CompleteProfile';
//import AuthContext from './components/authentication/store/auth-context';

function App() {
    // const authCtx = useContext(AuthContext);
    return (


        <
        Fragment >


        <
        Route path = "/"
        exact >
        <
        ExpenseForm / >
        <
        /Route>  <
        Route path = "/DummyPage"
        exact >
        <
        DummyPage / >

        <
        /Route>  <
        Route path = "/CompleteProfile"
        exact >
        <
        CompleteProfile / >
        <
        /Route> <
        /Fragment>
    );
}

export default App;