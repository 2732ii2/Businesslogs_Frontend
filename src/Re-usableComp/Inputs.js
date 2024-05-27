
import React, { useState } from 'react'
import "./reusablecomp.css";
import show from "./show.png";
import hide from "./hide.png";

export default function Inputs(props) {
    console.log(props.value);
    const [state,setstate]=useState(false);
    const {value,eventHandler,label,placeholder,type,style}=props;
    const specialFunc= props?.specialFunction;
  return (
    <div style={{position:"relative",...style}} className="mainInputs">
        <h5 style={{width:"auto",height:"20px",display:"flex",justifyContent:"center",alignItems:'center',fontSize:"20px"}}>{label}</h5> 
        <span style={{width:"20px",height:"20px",display:"flex",justifyContent:"center"}}>:</span>
        <input onKeyDown={(e)=>{
          console.log("alert clicked",e.key);
          if(e.key === 'Enter'){
            if(props?.specialFunction)
            specialFunc();
          }
        }} placeholder={placeholder} style={{border:value?"2px dashed blue":""}}  value={value} onChange={eventHandler} type={type=="password"? !state?type:"text" :type}
        />
        {
            type=="password"?<img onClick={()=>setstate(!state)} src={ state? hide:show} style={{position:"absolute",fontSize:"12px",width:"20px",height:"20px",left:"auto",right:14,bottom:"auto",top:12}} />:null
        }
    </div>
  )
}
