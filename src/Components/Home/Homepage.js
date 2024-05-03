import React, { useEffect, useState } from 'react'
import "./home.css";
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import ImageComp from '../../Re-usableComp/ImageComp';
import InputButtons from '../../Re-usableComp/InputButtons';
import {useNavigate} from "react-router-dom";
import SideNav from '../Sidenav/SideNav';
export default function Homepage() {
  const [update,setupdate]=useState(0);
  const [user_,setuser]=useState({});
  const [shownav, setShowNav]=useState(false);
  const navi=useNavigate();
  console.log(update);
  useEffect(()=>{
    setuser(JSON.parse(localStorage.getItem("userdata")))
  },[])
  const eventCall=()=>{
    if(update===1){
      navi("/viewdata");
      // alert("we will send you to that page : in Next updation");

    }
    else if(update===2){
      navi("/dataInsert");
    }
    else if(update===3){
      // alert("we will send you to that page  : in Next updation");
      navi("/expensetracker");
    }
  }
  var list_=["View Logs"," Insert Logs","Expense Calculator"];
  return (
    <div className='home'>
      <div className='upperSlide'>
        <div className='userInfo' onClick={()=>setShowNav(!shownav)}>
          <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
          <p className='_p'> {user_?.userName?user_?.userName:  " "}</p>
        </div>
        <ImageComp src={logout} onClick={()=>{
          localStorage.removeItem("userdata");
          navi("/");
        }}  style={{width:"30px",height:"30px"}} />
      </div>
      <h2 className='subheading'>Welcome to your Business Logs</h2>
      <div className='select_'> Select any one</div>
      {
        list_.map((e,i)=>{
          return <div className='options_'  key={i} onClick={()=>setupdate(i+1)} style={{border:`${update-1}`==`${i}`?"2px dashed black":null,boxShadow:`${update-1}`==`${i}`?"none":null}}>  <div className='dot' style={{background:`${update-1}`==`${i}`?"rgb(131, 244, 131)":null}}> </div> {e}</div>
        })
      }
      {/* <button className='homebutton' onClick={eventCall} disabled={!update}>Submit</button> */}
      <div className='buttonsdiv'>
            <InputButtons value={"Submit"} eventHandler={eventCall} disabled={!update} />
            </div>
      { !user_?
      <div className='SorryDiv'>
          <h1> ! Sorry , 404 error </h1>
          <p>Go back <span onClick={()=>navi("/")}>Login</span> </p>
      </div> 
      :null
      } 

      <SideNav  show={shownav}/>
      
    </div>
  )
}
