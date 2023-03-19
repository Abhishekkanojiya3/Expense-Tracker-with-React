import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from './store/Auth-slice';
import classes from "./Header.module.css";
import { useState } from 'react';
import { themeActions } from './store/Theme-slice';

const Header = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const expense = useSelector(state => state.expense.expense);
    const totalSpent = useSelector(state => state.expense.totalSpent);
    const theme = useSelector(state => state.theme.theme);
     const [Toggle,setToggle]=useState(false);
    //  const [dark,setDark]=useState(true);

    const logoutHandler = () =>{
        dispatch(authActions.logout());
        history.replace('./')
    }
    const changeHandler = () =>{
      setToggle((prevstate)=>!prevstate);
        }
    const switchThemeHandler = () =>{
      dispatch(themeActions.toggleTheme())
    };

    const downloadFile = ({data,fileName,fileType}) => {
      const blob = new Blob([data], {type:fileType});
      const a = document.createElement("a");
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);

      const clickEvent = new MouseEvent("click",{
        view: window,
        bubbles: true,
        cancelable: true,
      });
      a.dispatchEvent(clickEvent);
      a.remove();
    };
    const downloadExpenseHandler = () => {
      console.log(expense);
    
      const heading = ["spentMoney,Description,Category"];
    
      let userCsv = expense.reduce((newArr, exp) => {
        const {spentMoney, Description, Category } = exp;
        newArr.push([spentMoney, Description, Category].join(","));
        return newArr;
      }, []);
    
      downloadFile({
        data: [...heading, ...userCsv].join("\n"),
        fileName: "expenses.csv",
        fileType: "text/csv",
      });
    };
    return (
        <header className={classes.header}>
          <h1>Expense Tracker</h1>
    
            <nav>
              <ul>
    
                <li>
                {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
                </li>
    
                <li>
                {totalSpent>10000 &&isLoggedIn &&( <button onClick={changeHandler} >Active premium</button>)}
            </li>
          <li>
              {totalSpent > 10000 && isLoggedIn && Toggle && (
                <button type="submit" onClick={switchThemeHandler}>
                  {theme ? "Light mode" : "Dark mode"}
                </button>
              )}
               </li>     
          
            <li>
              {totalSpent > 10000 && isLoggedIn && Toggle && (
                <button type="submit" onClick={downloadExpenseHandler}>
                  Download Expense
                </button>
              )}
                </li>
              </ul>
            </nav>
    
        </header>
      );
}
export default Header;
