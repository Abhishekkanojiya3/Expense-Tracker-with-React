import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./Expense-slice";
import { authActions } from "./Auth-slice";
import axios from "axios";

const ExpenseContext = React.createContext({
    postExpense: () => {},
    getExpense: () => {},
    editExpense: (exp) => {},
    deleteExpense: (id) => {}

});
export const ExpenseContextProvider = (props) => {
    const userEmail = localStorage.getItem("email");
    const dispatch = useDispatch();
    const LIMIT = useSelector(state => state.auth.limit)
    const expData = useSelector(state => state.expense.expense)
    const total = useSelector(state => state.auth.total)
    const authToken = useSelector(state => state.auth.token)
    const activePage = useSelector(state => state.auth.activePage)
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
            axios
                .post('http://localhost:3000/add-expense', {
                    spentMoney: exp.spentMoney,
                    Description: exp.Description,
                    Category: exp.Category,
                }, {
                    headers: {
                        "Authorization": authToken,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    console.log("expdata", expData);

                    getExpenseHandler();
                    dispatch(authActions.setActivePage(1));
                    let array = [];
                    array.push(res.data);
                    console.log("expdata", expData);
                    if (expData.length == LIMIT) {
                        for (let i = 0; i < expData.length - 1; i++) {
                            array.push(expData[i]);
                        }
                    } else {
                        for (let i = 0; i < expData.length; i++) {
                            array.push(expData[i]);
                        }
                    }

                    dispatch(authActions.setTotal(total + 1));
                    dispatch(expenseActions.addExpense(array));

                    console.log("expdata", expData);
                    console.log(res.data);
                    dispatch(expenseActions.setIsForm(false));
                    dispatch(expenseActions.setIsForm(false));
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        postExpenses(exp);
    };

    // let newExpense=[];
    const getExpenseHandler = () => {
        const getrealtimeExpenses = () => {
            axios.get('http://localhost:3000/getExpense', {
                    headers: {
                        "Authorization": authToken,
                        "Content-Type": "application/json",
                    }
                })
                .then(res => {
                    console.log(res);
                    let newExpense = [];
                    if (!!res.data) {
                        newExpense = Object.keys(res.data).map((exp) => {
                            return {
                                id: exp,
                                spentMoney: res.data[exp].spentMoney,
                                Description: res.data[exp].Description,
                                Category: res.data[exp].Category
                            }
                        })
                    }
                    const totalSpent = newExpense.reduce((currNumber, exp) => {
                        return currNumber + Number(exp.spentMoney)
                    }, 0)
                    dispatch(expenseActions.addExpense({
                        newExpense: newExpense,
                        totalSpent: totalSpent
                    }))
                })
                .catch(err => {
                    alert(err.message);
                });
        };
        getrealtimeExpenses();
    };

    useEffect(() => {
        getExpenseHandler();
    }, [])

    const deleteExpHandler = (expenseId) => {
        const deleteExpense = async(id) => {
            try {
                const del = await fetch(`http://localhost:3000/delete-expense/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": authToken,
                        "Content-Type": "application/json"
                    }
                })
                const res = await del.json();
                getExpenseHandler();
                console.log(res);
                // let array=expData.filter(item=>item.id!==props.id)
                // dispatch(expenseActions.addExpense(array))

                // dispatch(authActions.setActivePage(activePage))
                // dispatch(authActions.setTotal(total-1)) 
            } catch (err) {
                alert(err.message)

            }
        }
        deleteExpense(expenseId);

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