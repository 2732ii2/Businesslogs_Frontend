import React, { useState } from 'react'
import Inputs from '../Re-usableComp/Inputs'
import InputButtons from '../Re-usableComp/InputButtons';
import {useNavigate} from "react-router-dom";
import axios from "axios";
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
    async function ClickHandler(e){
        console.log(e);
        if( passwordValue && userNameValue)
        {
            const resp=  await axios.post("https://businesslogs-backend.onrender.com/login",{
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
                setTimeout(() => {
                    setPasswordValue("");
                    setUserValue("");
                    navi("/home");
                }, 1000);
            }
        }
        else{
            toast.error( 'fill the credientials')
        }
    }
  return (
    <div className='Signup'>
            <h1 className='mainHeading'>Business Logs</h1>   
            <Inputs value={userNameValue} eventHandler={UserEventHandler} label={"User Name"} type={"text"} placeholder={"...  type "} />
            <Inputs value={passwordValue} eventHandler={PasswordEventHandler} label={"Password"} type={"password"} placeholder={"... type  "} />
            <InputButtons value={"Login"} eventHandler={ClickHandler}/>
            <p className='main_p' >Don't have an account ? Do <span onClick={()=> navi("/register")} className='main_span'>Register</span> </p>
            <Toasterfunc  />
    </div>
  )
}
