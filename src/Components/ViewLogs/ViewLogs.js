import React, { useEffect, useState } from 'react'
import ImageComp from '../../Re-usableComp/ImageComp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import "./viewlogs.css";
import InputButtons from '../../Re-usableComp/InputButtons';
import Toasterfunc from '../../Re-usableComp/Toaster';
export default function ViewLogs() {
    const [show,setshow]=useState(false);
    const [update,setupdate]=useState(0);
    const list_=["Expense","Selling","Repairing"];
    useEffect(()=>{

    },[update]);
  return (
    <div className='main'>
    <div className='upperSlide'>
      <div className='userInfo'>
        <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
        {/* <p className='_p'> {user_?.userName?user_?.userName:  " "}</p> */}
      </div>
      <ImageComp src={logout} onClick={()=>{
        // localStorage.removeItem("userdata");
        // navi("/");
      }}  style={{width:"30px",height:"30px"}} />
    </div>
    <h2 className='subheading'>View Logs</h2>
      
      <div className='mainContenDiv'>
          {/* <div className='selectoption' onClick={()=>setshow(!show)}> Show some option's  {show ? <ExpandMoreIcon />:<KeyboardArrowUpIcon />} </div>
          {
            show?
            <div className='showoptions' >
            {
            list_.map((e,i)=>{
            return <div className='options_'  key={i} onClick={()=>setupdate(i+1)} style={{border:`${update-1}`==`${i}`?"2px dashed black":null,boxShadow:`${update-1}`==`${i}`?"none":null}}>  <div className='dot' style={{background:`${update-1}`==`${i}`?"rgb(131, 244, 131)":null}}> </div> {e}</div>
            })
            }
            </div>
            :null
          } */}
         <div className='filteroptions'>
            <label for="options" id='filterLabel'>Filter By :</label>
            <select name="cars" id="options" onChange={(e)=>console.log(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="selling">Repairing</option>
                <option value="repairing">Selling</option>
            </select>
         </div>
          {
           update===3? <>
            </>:null
          }
          {
            update===2? <>
            </>:null
          }
          {
            update===1? <>
            </>:null
          }
      </div>


    {/* <button className='homebutton' onClick={Submithandler} disabled={!update} showloader={!update}>Submit</button> */}
          {/* <div className='homebutton'>
          <InputButtons value={"Submit"} eventHandler={Submithandler} disabled={!update} showloader={loading}/>
          </div> */}
    {/* { !user_?
    <div className='SorryDiv'>
        <h1> ! Sorry , 404 error </h1>
        <p>Go back <span onClick={()=>navi("/")
          }>Login</span> </p>
    </div> 
    :null
    }  */}
    
      <Toasterfunc  />
  </div>
  )
}
