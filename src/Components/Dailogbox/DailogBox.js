import React, { useEffect, useState } from 'react'
import "./Dailogbox.css";
import danger from "../../Re-usableComp/danger.png";
import ClearIcon from '@mui/icons-material/Clear';
import ImageComp from '../../Re-usableComp/ImageComp';
import axios from "axios";
export default function DailogBox({display,setDisplay,cleardeleteId,onSuccess}) {
    // console.log(id);
    // const dataobj={"id":id};
    const Clickhandler=async (e)=>{
        if(e.target.innerText == "No"){
            setDisplay(!display)
        }
        else{
            onSuccess();
        }
        e.target.style.transform="translateY(-2px) translateX(-2px)";
        setTimeout(()=>{
            e.target.style.transform="translateY(2px) translateX(2px)";
        },100)
    }
  return (
    <div className='customDailogBox' style={{display:display?"flex":"none",background:"rgba(137, 135, 135, 0.6)"}}>
        <div className='popupdiv' style={{width:display?"40%":"0px",height:display?"320px":"0px"}}>
            <h4 className='dialogboxtext'>Confirmation</h4>
            <div className='dialogboxtext1'>
               <ImageComp src={danger}  style={{width:"40px",height:"40px",marginRight:"20px"}}  />
                Are your sure you want to delete it ?</div>

            <div className='dialogbuttons'>
                <button className='btn1' onClick={Clickhandler}>No</button>
                <button className='btn2'  onClick={Clickhandler}> Yes</button>
            </div>
            <button className='clear' onClick={()=>{
                setDisplay(!display)
            }}>
                <ClearIcon style={{fontSize:"22px"}} />
            </button>
        </div>
    </div>
  )
}


