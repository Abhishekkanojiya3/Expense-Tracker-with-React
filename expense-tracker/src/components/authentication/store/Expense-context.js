import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "./Expense-slice";

const ExpenseContext = React.createContext({
    postExpense: () => {},
    getExpense: () => {},
    editExpense: (exp) => {},
    deleteExpense: (id) => {},
    expenses: null

});
export const ExpenseContextProvider = (props) => {

    const dispatch = useDispatch();
    // const userEmail = localStorage.getItem('email');
    // const [email,setEmail] = useState(userEmail);

    // const intitialToken = localStorage.getItem("token");
    // const [token, setToken] = useState(intitialToken);
    // const [expenses, setExpenses] = useState([]);

    // const userIsLoggedIn = !!token;
    // const loginHandler = (token, email) => {
    //     setToken(token);
    //     setEmail(email);
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("email", email);
    //   };
    //   const logoutHandler = (token, email) =>{
    //     setToken(null);
    //     setEmail(email);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("email")

    //   }
    const postExpenseHandler = (exp) => {
        const postExpenses = async(exp) => {
            const post = await fetch(
                "https://expense-tracker-login-c34ee-default-rtdb.firebaseio.com/Expenses.json", {

                    method: "POST",
                    body: JSON.stringify({
                        spentMoney: exp.spentMoney,
                        Description: exp.Description,
                        Category: exp.Category

                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const res = await post.json();
            console.log(res);
            getExpenseHandler();

        }
        postExpenses(exp);
    }
    let newExpense = [];
    const getExpenseHandler = () => {
        const getrealtimeExpenses = async() => {
            try {
                const get = await fetch(
                    "https://expense-tracker-login-c34ee-default-rtdb.firebaseio.com/Expenses.json",

                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",

                        }
                    }
                );
                const res = await get.json();
                console.log(res);
                if (!res.ok) {
                    newExpense = Object.keys(res).map((exp) => {
                        return {
                            id: exp,
                            spentMoney: res[exp].spentMoney,
                            Description: res[exp].Description,
                            Category: res[exp].Category
                        }

                    })
                }
                //   setExpenses(newExpense);
                const totalSpent = newExpense.reduce((currNumber, exp) => {
                    return currNumber + Number(exp.spentMoney)
                }, 0)
                dispatch(expenseActions.addExpense({
                    newExpense: newExpense,
                    totalSpent: totalSpent
                }))

            } catch (err) {
                alert(err.message);
            }
        };
        getrealtimeExpenses();
    }
    useEffect(() => {
        getExpenseHandler();
    }, [])

    const deleteExpHandler = (id) => {
        const deleteExpense = async(id) => {
            try {
                const del = await fetch(`https://expense-tracker-login-c34ee-default-rtdb.firebaseio.com/Expenses/${id}.json`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "applicatin/json"
                    }
                })
                const res = await del.json();
                getExpenseHandler();
                console.log(res);
            } catch (err) {
                alert(err.message)

            }
        }
        deleteExpense(id);

    }
    const editExpHandler = (exp) => {
        deleteExpHandler(exp.id);
    }
    const expensecontextVal = {
        // token: token,
        // email: email,
        // isLoggedIn: userIsLoggedIn,
        // login: loginHandler,
        // logout: logoutHandler,
        postExpense: postExpenseHandler,
        getExpense: getExpenseHandler,
        deleteExpense: deleteExpHandler,
        editExpense: editExpHandler,
        //  expenses:expenses
    };
    return ( <
        ExpenseContext.Provider value = { expensecontextVal } > { props.children } <
        /ExpenseContext.Provider>
    )
}

export default ExpenseContext;