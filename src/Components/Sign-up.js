import React, { useEffect, useState } from 'react'
import Inputs from '../Re-usableComp/Inputs'
import InputButtons from '../Re-usableComp/InputButtons';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Main.css";
import {useDispatch,useSelector} from "react-redux";
import updateUser from '../Redux/action';
import toast from 'react-hot-toast';
import Toasterfunc from '../Re-usableComp/Toaster';
export default function SignUp() {
    const [userNameValue,setUserValue]=useState("");
    const dispatch=useDispatch();
    const [loading,setloading]=useState(false);
    const redux_state = useSelector((state) => state);
    console.log(redux_state);
    const [passwordValue,setPasswordValue]=useState("");
    const [state,setstate]=useState(false);
    useEffect(()=>{
    console.log(redux_state);
    },[redux_state])
    const navi=useNavigate();
    function UserEventHandler(e){
        setUserValue(e.target.value);
    }
    function PasswordEventHandler(e){
        setPasswordValue(e.target.value);
    }
    async function ClickHandler(){
        if( passwordValue && userNameValue)
        {
            setloading(true);
            const resp=  await axios.post("https://businesslogs-backend.onrender.com/login",{
                "userName":userNameValue,
                "password":passwordValue
            })
            setloading(false);
            if(resp?.data?.err){
                console.log(resp?.data?.err);
                toast.error( `${resp?.data?.err}`)
            }
            else{
                // console.log(resp?.data?.msg,resp?.data?.userName,resp?.data?.token);
                if(resp?.data?.userName)
                {
                    dispatch(updateUser(resp?.data?.userName));
                    if(!(localStorage.getItem("userdata"))){
                        localStorage.setItem("userdata",JSON.stringify(resp?.data));
                    }
                    else{
                        console.log("already signed in");
                    }
                }
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
    useEffect(()=>{
        const eventListener=(e)=>{
            console.log(e.key);
            console.log("=>",userNameValue,passwordValue,state);
            if(e.key==="Enter"){
                setstate(!state);
                if(userNameValue && passwordValue)
                ClickHandler();
            }
        }
        document.addEventListener("keypress",eventListener);
        return ()=>{
                document.removeEventListener("keypress",eventListener)
        }
        
    },[state])
  return (
    <div className='Signup'>
            <h1 className='mainHeading'>Business Logs</h1>   
            <Inputs style={{width:"95%",minWidth:"100px"}} value={userNameValue} eventHandler={UserEventHandler} label={"User Name"} type={"text"} placeholder={"...  type "} />
            <Inputs style={{width:"95%",minWidth:"100px"}} value={passwordValue} eventHandler={PasswordEventHandler} label={"Password"} type={"password"} placeholder={"... type  "} />
            <div className='buttonsdiv'>
            <InputButtons value={"Login"} eventHandler={ClickHandler} disabled={loading} showloader={loading}/>
            </div>
            <p className='main_p' >Don't have an account ? Do <span onClick={()=> navi("/register")} className='main_span'>Register</span> </p>
            <Toasterfunc  />
           
    </div>
  )
}
