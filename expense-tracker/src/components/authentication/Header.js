import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from './store/Auth-slice';
import classes from "./Header.module.css";
import { useState } from 'react';
import { themeActions } from './store/Theme-slice';
import useRazorpay from "react-razorpay";
import axios from 'axios';
import { expenseActions } from './store/Expense-slice';
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = () => {
        const dispatch = useDispatch();
        const Razorpay = useRazorpay();
        const history = useHistory();
        const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
        const authToken = useSelector(state => state.auth.token)
        const authIsPremium = useSelector(state => state.auth.isPremium)
        const expense = useSelector(state => state.expense.expense);
        const totalSpent = useSelector(state => state.expense.totalSpent);
        const theme = useSelector(state => state.theme.theme);
        const [Toggle, setToggle] = useState(false);
        //  const [dark,setDark]=useState(true);
        const initialToken = localStorage.getItem("token");
        const [token, setToken] = useState(initialToken);

        const logoutHandler = () => {
            dispatch(authActions.logout());
            history.replace('./')
            setToken(null);
            localStorage.removeItem("token");
        }
        const changeHandler = () => {
            setToggle((prevstate) => !prevstate);
        }
        const switchThemeHandler = () => {
            dispatch(themeActions.toggleTheme())
        };

        // const downloadFile = ({data,fileName,fileType}) => {
        //   const blob = new Blob([data], {type:fileType});
        //   const a = document.createElement("a");
        //   a.download = fileName;
        //   a.href = window.URL.createObjectURL(blob);

        //   const clickEvent = new MouseEvent("click",{
        //     view: window,
        //     bubbles: true,
        //     cancelable: true,
        //   });
        //   a.dispatchEvent(clickEvent);
        //   a.remove();
        // };
        // const downloadExpenseHandler = () => {
        //   console.log(expense);

        //   const heading = ["spentMoney,Description,Category"];

        //   let userCsv = expense.reduce((newArr, exp) => {
        //     const {spentMoney, Description, Category } = exp;
        //     newArr.push([spentMoney, Description, Category].join(","));
        //     return newArr;
        //   }, []);

        //   downloadFile({
        //     data: [...heading, ...userCsv].join("\n"),
        //     fileName: "expenses.csv",
        //     fileType: "text/csv",
        //   });
        // };
        const activatePremiumHandler = () => {

            axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": authToken } })
                .then((response) => {



                    const options = {
                        "key": response.data.key_id,
                        "order_id": response.data.order.id,
                        "handler": async function(response) {
                            await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                                order_id: options.order_id,
                                payment_id: response.razorpay_payment_id
                            }, { headers: { "Authorization": authToken } })
                            alert('You are a Premium User now')
                            dispatch(authActions.setIsPremium())
                        }
                    }
                    const rzpl = new Razorpay(options);
                    rzpl.open();

                    rzpl.on('payment.failed', async function(response) {
                        await axios.post('http://localhost:3000/purchase/failedtransaction', {
                            order_id: options.order_id
                        }, { headers: { "Authorization": authToken } })
                        alert("Something went wrong")
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        }
        const showLeaderboardHandler = () => {
            axios.get('http://localhost:3000/premium/showleaderboard', { headers: { "Authorization": authToken } })
                .then((response) => {
                    console.log(response.data)
                        // const data=response.data.sort((a,b)=>b.expenseSum-a.expenseSum);
                    dispatch(expenseActions.setLeaderBoardData(response.data))
                    history.push('/Leaderboard')
                })
        }

        const downloadExpenseHandler = () => {
            axios.get('http://localhost:3000/expense/download', { headers: { "Authorization": authToken } })
                .then((res) => {

                    var a = document.createElement("a");
                    a.href = res.data.file;

                    a.click();

                })
                .catch(err => {
                    alert("Something went wrong")
                    console.log(err)
                })
        }

        const downloadHistoryHandler = () => {
            axios.get('http://localhost:3000/expense/downloadHistory', { headers: { "Authorization": authToken } })
                .then((response) => {
                    const array = [];
                    for (let i = response.data.length - 1; i >= 0; i--) {
                        array.push(response.data[i])
                    }
                    dispatch(expenseActions.setDownloadHistory(array))
                    console.log(array)
                })
        }
        return ( <
                header className = { classes.header } >
                <
                h1 > Expense Tracker < /h1> { isLoggedIn && authIsPremium && ( < img src = 'https://cdn-icons-png.flaticon.com/512/9908/9908162.png'
                        alt = 'Icon of a person'
                        style = {
                            { width: "50px", height: "50px" } }
                        className = 'mx-2' / > ) }

                <
                nav >
                <
                ul >

                <
                li > {
                    isLoggedIn && < button onClick = { logoutHandler } > Logout < /button>} <
                    /li>

                    <
                    li > {!authIsPremium && isLoggedIn && ( < button onClick = { activatePremiumHandler } > Active premium < /button>)} <
                            /li> {
                                authIsPremium && ( < button onClick = { showLeaderboardHandler } > Show Leaderboard < /button>)} {
                                        /* <li>
                                                      {totalSpent > 10000 && isLoggedIn && Toggle && (
                                                        <button type="submit" onClick={switchThemeHandler}>
                                                          {theme ? "Light mode" : "Dark mode"}
                                                        </button>
                                                      )}
                                                       </li>      */
                                    }

                                    <
                                    li >

                                    <
                                    button type = "submit"
                                    onClick = { downloadExpenseHandler } >
                                    Download Expense <
                                    /button> <
                                    /li> <
                                    li >
                                    <
                                    Button className = "mx-4"
                                    onClick = { downloadHistoryHandler } > < NavLink to = '/DownloadHistory'
                                    style = {
                                        { textDecoration: "none", color: "white" } } > Download 's History</NavLink></Button> <
                                    /li> <
                                    /ul> <
                                    /nav>

                                    <
                                    /header>
                                );
                            }
                            export default Header;