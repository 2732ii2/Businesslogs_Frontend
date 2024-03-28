import React, { useState } from 'react'
import Inputs from '../Re-usableComp/Inputs'
import InputButtons from '../Re-usableComp/InputButtons';
import {useNavigate} from "react-router-dom";
import "./Main.css";
import toast from 'react-hot-toast';
import Toasterfunc from '../Re-usableComp/Toaster';
export default function SignUp() {
    const [userNameValue,setUserValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");
    const navi=useNavigate();
    function UserEventHandler(e){
        setUserValue(e.target.value);
    }
    function PasswordEventHandler(e){
        setPasswordValue(e.target.value);
    }
    function ClickHandler(e){
        console.log(e);
        toast.success('Successfully toasted!')
        if(userNameValue =="amil" && passwordValue=="password" )
        {
            navi("/home")
        }
        // toast.error("This didn't work.")
    }
  return (
    <div className='Signup'>
            <h1 className='mainHeading'>Business Logs</h1>   
            <Inputs value={userNameValue} eventHandler={UserEventHandler} label={"User ID"} type={"text"} placeholder={"...  type "} />
            <Inputs value={passwordValue} eventHandler={PasswordEventHandler} label={"Password"} type={"password"} placeholder={"... type  "} />
            <InputButtons value={"Login"} eventHandler={ClickHandler}/>
            <p className='main_p' >Don't have an account ? Do <span onClick={()=> navi("/register")} className='main_span'>Register</span> </p>
            <Toasterfunc  />
    </div>
  )
}
