import { Fragment, useState, useEffect, useContext } from "react";
import classes from './Login.module.css';
import ExpenseContext from "./store/Expense-context";
import { useSelector } from "react-redux";

const Expenses = () =>{
    const expense = useSelector(state => state.expense.expense);
    const [spentMoney, setSpentMoney] = useState("");
    const [Description,setDescription]=useState("");
    const [Category,setCategory]=useState("");
   // const [expense,setExpense] = useState([]);

   const expCtx = useContext(ExpenseContext)

    const moneyHandler = (e) =>{
        setSpentMoney(e.target.value)
    };
    const descriptionHandler = (e) =>{
        setDescription(e.target.value)
    }
    const categoryHandler = (e) =>{
        setCategory(e.target.value)
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
        const exp = {
            spentMoney: spentMoney,
                Description: Description,
                Category: Category

        }
        expCtx.postExpense(exp);
    }
    const deleteHandler = (expID) =>{
        expCtx.deleteExpense(expID)

    }
    const editHandler = (exp) =>{
        setSpentMoney(exp.spentMoney);
        setDescription(exp.Description);
        setCategory(exp.Category);

        expCtx.editExpense(exp);
        console.log(exp);
    }



    return(
        <Fragment>
            <div className={classes.login}>
            <form onSubmit={submitHandler}>
                <h2>Daily Expenses</h2>
                <input
                type = "number"
                id= "number"
                placeholder="Enter Expense Amount"
                onChange={moneyHandler}
                value = {spentMoney}
                required/>
                 <input
            type="text"
            id="text"
            placeholder="Enter description"
            onChange={descriptionHandler}
            value={Description}
            required
            />
             <select value={Category} onChange={categoryHandler}>
                <option>select</option>
                <option value="rent">Rent</option>
                <option value="Grocery">Grocery</option>
                <option value="investment">investment</option>
                <option value="food">Food</option>

            </select>
            <button type = "submit">Submit</button>
            <ul>
            {expense.map((exp)=>(
               <li key={exp.id}>
                spentMoney:{exp.spentMoney},
               Description;{exp.Description},
               Category:{exp.Category}
               <button onClick={editHandler.bind(null,exp)}>Edit</button>
               <button onClick={deleteHandler.bind(null,exp.id)}>Delete</button>
               </li> 

                ))


            }
        </ul>

            </form>
            </div>
        </Fragment>
    )


};
export default Expenses;