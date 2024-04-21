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
    const [loading,setloading]=useState(false);
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
            setloading(true);
            // const resp=  await axios.post("http://54.83.142.208:7500/register",{

            const resp=  await axios.post("https://businesslogs-backend.onrender.com/register",{
                "userId":userIDValue,
                "userName":userNameValue,
                "password":passwordValue
            })
            setloading(false);
            console.log(resp?.data);
            if(resp?.data?.err){
                console.log(resp?.data?.err);
                toast.error( `${resp?.data?.err}`)
            }
            else{
                console.log(resp?.data?.msg);
                toast.success( `${resp?.data?.msg}`)
                setTimeout(() => {
                    setuserIDValue("");
                    setpasswordValue("");
                    if(!(localStorage.getItem("userdata"))){
                        localStorage.setItem("userdata",JSON.stringify(resp?.data));
                    }
                    setuserNameValue("");
                    navi("/home");
                }, 1000);
            }
        }
        else{
            toast.error( 'fill the credientials')
        }
    }
  return (
    <div className='Register'>
        <h1 className='mainHeading'>Business Logs</h1>   
        <Inputs value={userIDValue} style={{width:"95%",minWidth:"100px"}} eventHandler={UserIdEventHandler} label={"User ID"} type={"text"} placeholder={"...  type "} />
        <Inputs value={userNameValue} style={{width:"95%",minWidth:"100px"}} eventHandler={UserNameEventHandler} label={"User Name"} type={"text"} placeholder={"...  type "} />
        <Inputs value={passwordValue} style={{width:"95%",minWidth:"100px"}} eventHandler={PasswordEventHandler} label={"Password"} type={"password"} placeholder={"... type  "} />
        <div className='buttonsdiv'>
        <InputButtons value={"Register"} eventHandler={ClickHandler} disabled={loading} showloader={loading}/>
        </div>
        <p className='reg_p' >Already have an account<span onClick={()=>navi("/")} className='reg_span'>Login</span> </p>
        <Toasterfunc  />
    </div>
  )
}
