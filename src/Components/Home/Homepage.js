import React, { useState } from 'react'
import "./home.css";
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import ImageComp from '../../Re-usableComp/ImageComp';
import InputButtons from '../../Re-usableComp/InputButtons';
import {useNavigate} from "react-router-dom";
export default function Homepage() {
  const [update,setupdate]=useState(0);
  const navi=useNavigate();
  console.log(update);
  const eventCall=()=>{
    if(update===1){
      navi("/viewdata");
    }
    else if(update===2){
      navi("/dataInsert");
    }
    else if(update===3){
      navi("/expensetracker");
    }
  }
  var list_=["View Logs"," Insert Logs","Expenditure"];
  return (
    <div className='home'>
      <div className='upperSlide'>
        <div className='userInfo'>
          <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
          <p>  Amil</p>
        </div>
        <ImageComp src={logout}  style={{width:"30px",height:"30px"}} />
      </div>
      <h2 className='subheading'>Welcome to your Business Logs</h2>
      <div className='select_'> Select any one</div>
      {
        list_.map((e,i)=>{
          return <div className='options_'  key={i} onClick={()=>setupdate(i+1)}>  <div className='dot' style={{background:`${update-1}`==`${i}`?"rgb(131, 244, 131)":null}}> </div> {e}</div>
        })
      }
      <button className='homebutton' onClick={eventCall} disabled={!update}>Submit</button>

    </div>
  )
}
