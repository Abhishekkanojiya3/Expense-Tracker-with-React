import { Fragment, useState, useEffect, useContext, useRef } from "react";
import classes from './Login.module.css';
import ExpenseContext from "./store/Expense-context";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { expenseActions } from "./store/Expense-slice";
import { authActions } from "./store/Auth-slice";
import { Form } from "react-bootstrap";
import {Row,Col} from 'react-bootstrap'

const Expenses = () =>{
  const expenseList = useSelector(state => state.expense.expense);    
  console.log(expenseList)                               
  const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn)
    const dispatch=useDispatch();
  const authToken=useSelector(state=>state.auth.token)
  const selectInputRef=useRef('');
     const total=useSelector(state=>state.auth.total)
    const [spentMoney, setSpentMoney] = useState("");
    const [Description,setDescription]=useState("");
    const [Category,setCategory]=useState("");
   // const [expense,setExpense] = useState([]);

   const expCtx = useContext(ExpenseContext)

   const activePage=useSelector(state=>state.auth.activePage)
   const LIMIT=useSelector(state=>state.auth.limit)
    const selectHandler=()=>{
     const selectedlimit=selectInputRef.current.value;
     dispatch(authActions.setLimit(selectedlimit))
     dispatch(authActions.setActivePage(1))
    }
   const totalPagesCalculator=(total,limit)=>{
     const pages=[];
     for(let i=1;i<=Math.ceil(total/limit);i++)
     { console.log("i>>>",i)
       pages.push(i)
     }
     return pages;
   }
   useEffect(()=>{
 
     console.log(authIsLoggedIn)
     if(authIsLoggedIn){
 
   axios.get('http://localhost:3000/expense',{headers:{"Authorization":authToken},params:{page:activePage,size:LIMIT}})
    .then((response)=>{
       console.log("expense>>>>>>",response.data.expense) 
       console.log(response.data)   
      
       let expe=response.data.expense                    
       console.log(expe)
       let array=[];
       for(let i=expe.length-1;i>=0;i--){                          
         array.push(expe[i])               
       }
      console.log("array>>",array)
       dispatch(authActions.setTotal(response.data.total))        
       dispatch(expenseActions.addExpense(array))
       })
 
     }
   },[authIsLoggedIn,activePage,total])

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

     const totalSpentMoney = expenseList.reduce((total, exp) => total + parseFloat(exp.spentMoney), 0);
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

            </form>
            <table>
        <thead>
          <tr>
            <th>Spent Money</th>
            <th>Description</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.spentMoney}</td>
              <td>{exp.Description}</td>
              <td>{exp.Category}</td>
              <td>
                <button onClick={() => editHandler(exp)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteHandler(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <div className={classes.total}> 
       <h3 style={{fontWeight: 'bold', marginTop: '1rem'}}>
        Total Spent: {totalSpentMoney.toFixed(2)}
      </h3>      </div>             
      </div> 
     

     
      <div className="paginationdiv">
      <nav aria-label="Page navigation example ">
      <ul className="pagination">
          {activePage !== 1 && <li className="page-item" onClick={() => dispatch(authActions.setActivePage((activePage - 1)))}>
            <a className="page-link" href="javascript:void(null">Previous</a>
          </li>}
         {totalPagesCalculator(total, LIMIT).map(page => (
            <li className={`page-item ${activePage === page ? 'active' : ''}`} key={page}>
              <a 
              className="page-link" href="javascript:void(null" 
              onClick={() => dispatch(authActions.setActivePage(page))}
              >{page}</a>
            </li>
         ))}
        {activePage !== totalPagesCalculator(total, LIMIT).length &&  <li className="page-item" onClick={() => dispatch(authActions.setActivePage(activePage + 1))}>
            <a className="page-link" href="javascript:void(null)">Next</a>
          </li>}
        </ul>

        
      </nav>

      <Form >
      Rows per page:<Form.Select aria-label="Default select example" style={{width:"70px"}} ref={selectInputRef} onChange={selectHandler} size="sm">

      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </Form.Select>
    </Form>
    </div>  
        </Fragment>
    )


};
export default Expenses;