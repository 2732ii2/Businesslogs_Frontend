import React, { useEffect, useState } from 'react'
import "./sidenav.css";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
export default function SideNav(props) {
  var {show}=(props);
  const [pagename,setpaegname]=useState("");
  console.log(pagename);
  const navi=useNavigate();
  useEffect(()=>{
    if(pagename=="Home"){
      navi("/home")
    }
    else if(pagename=="Insert Data"){
      navi("/dataInsert")

    }else if(pagename=="View Logs"){
      alert("we will take you that at next updation");
    } 
    else if(pagename=="Expense Tracker"){
      alert("we will take you that at next updation");
    }
  },[pagename])
  const list_=["Home","Insert Data","View Logs","Expense Tracker"];
  return (
    <div className='sidenav' style={{marginLeft:!show?"-400px":"0px"}} >
      {
      list_.map((element,i)=>{
        return <div className='innerdivs'  onClick={()=>{
          setpaegname(element)
        }} key={i} >
          <ArrowRightAltIcon className='icons_spe' style={{marginRight:"10px"}} /> {element}
        </div>
      })
      }
    </div>
  )
}
