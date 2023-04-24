import './App.css';
//import Authentication from './components/authentication/Authentication';
import { Fragment, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DummyPage from './components/authentication/DummyPage';
import ExpenseForm from './components/authentication/ExpenseForm';
import CompleteProfile from './components/authentication/CompleteProfile';
import EmailVerification from './components/authentication/EmailVerification';
import ForgetPassword from './components/authentication/ForgetPassword';
import Expenses from './components/authentication/Expenses';
import Header from './components/authentication/Header';
import { useSelector } from 'react-redux';
import Leaderboard from './components/authentication/pages/Leaderboard';
import DownloadHistory from './components/authentication/pages/DownloadHistory';
//import AuthContext from './components/authentication/store/auth-context';

function App() {
    // const authCtx = useContext(AuthContext);
    const theme = useSelector((state) => state.theme.theme)
    const authIsPremium = useSelector(state => state.auth.isPremium)
    const authIsLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const activePage = useSelector(state => state.auth.activePage)

    const LIMIT = useSelector(state => state.auth.limit)
    console.log("activrepage", activePage)
    console.log('state:', useSelector((state) => state));

    return ( <
            div style = {
                { backgroundColor: theme ? "black" : "white" } } >

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
            /Route> {
                authIsLoggedIn && authIsPremium && < Route path = '/Leaderboard' >
                    <
                    Leaderboard / >
                    <
                    /Route>} {
                        !authIsLoggedIn && < Route path = '/Leaderboard' >
                            <
                            Redirect to = '/Login' / >
                            <
                            /Route>} <
                            Route path = '/DownloadHistory' >
                            <
                            DownloadHistory / >
                            <
                            /Route>

                        <
                        /div>

                    );
            }

            export default App;