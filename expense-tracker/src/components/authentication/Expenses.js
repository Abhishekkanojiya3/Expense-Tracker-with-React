import { Fragment, useState, useEffect } from "react";
import classes from './Login.module.css';

const Expenses = () => {
    const [spentMoney, setSpentMoney] = useState("");
    const [Description, setDescription] = useState("");
    const [Category, setCategory] = useState("");
    const [expense, setExpense] = useState([]);

    const moneyHandler = (e) => {
        setSpentMoney(e.target.value)
    };
    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }
    const categoryHandler = (e) => {
        setCategory(e.target.value)
    }
    const submitHandler = async(e) => {
        e.preventDefault();

        setExpense([
            ...expense,
            {
                spentMoney: spentMoney,
                Description: Description,
                Category: Category
            }
        ]);
        const post = await fetch("https://expense-tracker-login-c34ee-default-rtdb.firebaseio.com/Expenses.json", {
            method: "POST",
            body: JSON.stringify({
                spentMoney: spentMoney,
                Description: Description,
                Category: Category,


            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await post.json();
        console.log(res);
        setSpentMoney("");
        setDescription("");
        setCategory("");

    }
    useEffect(() => {
        const getRealTimeData = async() => {
            const get = await fetch("https://expense-tracker-login-c34ee-default-rtdb.firebaseio.com/Expenses.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const res = await get.json();
            console.log(res);
            if (get.ok) {
                const getExpense = Object.keys(res).map((exp) => {
                    return {
                        id: exp,
                        spentMoney: res[exp].spentMoney,
                        Description: res[exp].Description,
                        Category: res[exp].Category
                    }

                });
                setExpense(getExpense);
            } else {
                alert(res.error.message)
            }
        }
        getRealTimeData();
    }, [])
    return ( <
        Fragment >
        <
        div className = { classes.login } >
        <
        form onSubmit = { submitHandler } >
        <
        h2 > Daily Expenses < /h2> <
        input type = "number"
        id = "number"
        placeholder = "Enter Expense Amount"
        onChange = { moneyHandler }
        value = { spentMoney }
        required / >
        <
        input type = "text"
        id = "text"
        placeholder = "Enter description"
        onChange = { descriptionHandler }
        value = { Description }
        required /
        >
        <
        select value = { Category }
        onChange = { categoryHandler } >
        <
        option > select < /option> <
        option value = "rent" > Rent < /option> <
        option value = "Grocery" > Grocery < /option> <
        option value = "investment" > investment < /option> <
        option value = "food" > Food < /option>

        <
        /select> <
        button type = "submit" > Submit < /button> <
        ul > {
            expense.map((exp) => ( <
                li key = { exp.spentMoney + exp.Description } >
                spentMoney: { exp.spentMoney },
                Description; { exp.Description },
                Category: { exp.Category }

                <
                /li> 

            ))


        } <
        /ul>

        <
        /form> <
        /div> <
        /Fragment>
    )


};
export default Expenses;