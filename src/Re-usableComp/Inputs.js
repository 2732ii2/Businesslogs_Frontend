
import React, { useEffect, useState } from 'react'
import "./reusablecomp.css";
import showimage from "./show.png";
import hide from "./hide.png";

export default function Inputs(props) {
    console.log(props.value,props);
    const [state,setstate]=useState(false);
    const {value,eventHandler,label,placeholder,type,style}=props;
    const specialFunc= props?.specialFunction;
    var setexpenseIndex=props?.indexHandler;
    console.log(setexpenseIndex);
    // showfilter={true} filteredlist={filteredlist} 
   const showfilter= props.showfilter;
   const filteredlist= props?.filteredlist;
  const [show,setshow]=useState(false);
  const [aftersearched,setaftersearched]=useState([]);
  const [innerfilter,setinnerfilter]=useState(true);
  useEffect(()=>{
    console.log(innerfilter);
  },[innerfilter])
  useEffect(()=>{
    if(filteredlist?.length){
    var c=filteredlist.filter(e => {
      if(e.toLowerCase().includes(value.toLowerCase()))
        {
          return e
        }
    })
    console.log(c);}
    setaftersearched(c);
  },[value])
  return (
    <div style={{position:"relative",...style}}   className="mainInputs">
        <h5 style={{width:"auto",height:"20px",display:"flex",justifyContent:"center",alignItems:'center'}}>{label}</h5> 
        <span style={{width:"20px",height:"20px",display:"flex",justifyContent:"center"}}>:</span>
        <input onKeyDown={(e)=>{
          console.log("alert clicked",e.key);
          if(e.key === 'Enter'){
            if(props?.specialFunction)
            specialFunc();
          }
        }} placeholder={placeholder} style={{border:"1px solid black"}}  value={value} onChange={(e)=>{
          setshow(true);
          eventHandler(e);
        }} type={type=="password"? !state?type:"text" :type}
        />
        {
            type=="password"?<img onClick={()=>setstate(!state)} src={ state? hide:showimage} style={{position:"absolute",fontSize:"12px",width:"auto",height:"20px",left:"auto",right:25,bottom:"auto",top:12}} />:null
        }
       {(showfilter && innerfilter  )&& (show && <div className='filteredlist'>
        {
          aftersearched?.length? aftersearched.map((e,i)=>{
            return <div className='fil_same' key={e} onClick={()=>{
              // setexpenseIndex(i);
              // setexpenseIndex(filteredlist.indexOf(e))
              console.log("filtered",e);
              if( typeof(setexpenseIndex)=="function"){
                setexpenseIndex(filteredlist.indexOf(e)+1)
                setinnerfilter(false);
              }
            }}>{e}</div>
          }):
          filteredlist.map((e,i)=>{
            return <div className='fil_same' key={e} onClick={()=>{
              // setexpenseIndex(i);
              console.log("unfiltered",e,filteredlist.indexOf(e));
              if( typeof(setexpenseIndex)=="function"){
                setinnerfilter(false);
                setexpenseIndex(filteredlist.indexOf(e)+1)
              }
            }}>{e}</div>
          })
        }
        </div>)}
    </div>

  )
}
