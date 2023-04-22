import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenseActions } from "./store/Expense-slice";
import classes from "./Header.module.css";


const DownloadExpense = () => {
    const authToken = useSelector(state => state.auth.token)
    const dispatch = useDispatch();

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
        div style = {
            {
                width: "750px",
                margin: "40px auto",
                display: "flex",
                justifyContent: "center",
                color: "white",
                maxWidth: "90%",
            }
        } >
        <
        button onClick = { downloadExpenseHandler }
        style = {
            { backgroundColor: "blue", color: "white", border: "none", padding: "10px 20px" } } >
        Download Expenses <
        /button>

        <
        button className = "mx-4"
        onClick = { downloadHistoryHandler } > < NavLink to = '/DownloadHistory'
        style = {
            { textDecoration: "none", color: "white" } } > Download 's History</NavLink></button> <
        /div> <
        /header> 
    );

};
export default DownloadExpense;