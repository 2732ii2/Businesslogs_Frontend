import React, { useEffect, useState } from 'react'
import Inputs from '../../Re-usableComp/Inputs'
import InputButtons from '../../Re-usableComp/InputButtons'
import Toasterfunc from '../../Re-usableComp/Toaster'
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

import axios from "axios";
import "./register.css";
export default function Register() {
    const [userIDValue,setuserIDValue]=useState("");
    const [passwordValue,setpasswordValue]=useState("");
    const [userNameValue,setuserNameValue]=useState("");
    const navi=useNavigate();
    function UserIdEventHandler(e){
        setuserIDValue(e.target.value);
    }
    function UserNameEventHandler(e){
        setuserNameValue(e.target.value);
    }
    function PasswordEventHandler(e){
        setpasswordValue(e.target.value);
    }
    async function ClickHandler(){
        console.log("Register");
        if( userIDValue && passwordValue && userNameValue)
        {
            const resp=  await axios.post("http://localhost:7500/register",{
                "userId":userIDValue,
                "userName":userNameValue,
                "password":passwordValue
            })
            console.log(resp?.data);
            if(resp?.data?.err){
                console.log(resp?.data?.err);
                toast.error( `${resp?.data?.err}`)
                
            }
            else{
                console.log(resp?.data?.msg);
                toast.success( `${resp?.data?.msg}`)
            }
        }
    }
  return (
    <div className='Register'>
        <h1 className='mainHeading'>Business Logs</h1>   
        <Inputs value={userIDValue} eventHandler={UserIdEventHandler} label={"User ID"} type={"text"} placeholder={"...  type "} />
        <Inputs value={userNameValue} eventHandler={UserNameEventHandler} label={"User Name"} type={"text"} placeholder={"...  type "} />
        <Inputs value={passwordValue} eventHandler={PasswordEventHandler} label={"Password"} type={"password"} placeholder={"... type  "} />
        <InputButtons value={"Register"} eventHandler={ClickHandler}/>
        <p className='reg_p' >Already have an account<span onClick={()=>navi("/")} className='reg_span'>Login</span> </p>
        <Toasterfunc  />
    </div>
  )
}
