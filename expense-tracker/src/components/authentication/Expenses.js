import { Fragment, useState } from "react";
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
    const submitHandler = (e) => {
        e.preventDefault();

        setExpense([
            ...expense,
            {
                spentMoney: spentMoney,
                Description: Description,
                Category: Category
            }
        ])
        setSpentMoney("");
        setDescription("");
        setCategory("");

    }
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