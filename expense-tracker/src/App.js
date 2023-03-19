import './App.css';
//import Authentication from './components/authentication/Authentication';
import { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import DummyPage from './components/authentication/DummyPage';
import ExpenseForm from './components/authentication/ExpenseForm';
import CompleteProfile from './components/authentication/CompleteProfile';
import EmailVerification from './components/authentication/EmailVerification';
import ForgetPassword from './components/authentication/ForgetPassword';
import Expenses from './components/authentication/Expenses';
import Header from './components/authentication/Header';
//import AuthContext from './components/authentication/store/auth-context';

function App() {
    // const authCtx = useContext(AuthContext);
    return (


        <
        Fragment >

        <
        Header / >
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
        Route path = "/EmailVerification"
        exact >
        <
        EmailVerification / >
        <
        /Route> <
        Route path = "/ForgetPassword"
        exact >
        <
        ForgetPassword / >
        <
        /Route> <
        Route path = "/Expenses"
        exact >
        <
        Expenses / >
        <
        /Route> <
        /Fragment>

    );
}

export default App;