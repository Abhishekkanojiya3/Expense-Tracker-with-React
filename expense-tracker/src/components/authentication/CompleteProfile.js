import { useState, useEffect } from "react";
import { Fragment } from "react";
import ExpenseContext from "./store/Expense-context";
import { useContext } from "react";
//import { useHistory } from "react-router-dom";

const CompleteProfile = () =>{
    const expCtx = useContext(ExpenseContext);
    const idToken = expCtx.token;
   // const email = expCtx.email;
   // const history = useHistory();
    const [name,setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const nameHandler = (e) =>{
        setName(e.target.value);
    };
    const urlHandler = (e) =>{
        setPhotoUrl(e.target.value);
    };

    const formSubmitHandler = async(e) =>{
        e.preventDefault();
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk',
        {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
              displayName: name,
              photoUrl: photoUrl,
              returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
              },
        })
        const data = await res.json();
        if(res.ok){
            console.log(data);
            setName("");
            setPhotoUrl("");
        }
        else{
            alert(data.error.message)
        }
    };
    useEffect(()=>{
        const getdata=async()=>{
          const get =await fetch( "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDS5Os5LUSXEwpFoKNBTNxC5KRDNMGGTuk",{
            method:"POST",
            body:JSON.stringify({
              idToken:idToken
            }),
            headers:{
              "Content-Type":"application/json",
            }
          });
          const data=await get.json();
          if(get.ok)
          {
            console.log(data.users[0].displayName);
            console.log(data.users[0].photoUrl);
      
          if(data.users[0].displayName)
          {
            setName(data.users[0].displayName);
            setPhotoUrl(data.users[0].photoUrl);
          }
      
        }
        else{
          alert(data.error.message);
        }
      }
      getdata();
      },[]);
      // const logoutHandler = () =>{
      //   expCtx.logout(email,idToken);
      //   history.replace('./');

      // }
    return(
        <Fragment>
            <div>
                <p>Winners never quit, quitters never win</p>
            </div>
            {/* <div>
                <button onClick={logoutHandler}>Logout</button>
            </div> */}
            <form onSubmit={formSubmitHandler}>
                <h4>Contact Details</h4>
                <label htmlFor="fill name">Full Name:</label>
                <input 
                type = "text"
                id = "full name"
                onChange={nameHandler}
                value = {name}
                required
                />
                <label htmlFor="profile photo url">Profile Photo URL:</label>
                <input 
                type = "url"
                id = "profile photo url"
                onChange={urlHandler}
                value = {photoUrl}
                required
                />
                <button type="submit">update</button>

            </form>
        </Fragment>
    )
}
export default CompleteProfile;