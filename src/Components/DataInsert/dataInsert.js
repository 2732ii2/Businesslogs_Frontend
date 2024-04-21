import React, { useEffect, useState } from 'react'
import ImageComp from '../../Re-usableComp/ImageComp';
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./datainsert.css";
import Inputs from '../../Re-usableComp/Inputs';
import axios from 'axios';
import Toasterfunc from '../../Re-usableComp/Toaster';
import toast from 'react-hot-toast';
import InputButtons from '../../Re-usableComp/InputButtons';
import { useNavigate } from 'react-router-dom';
import SideNav from '../Sidenav/SideNav';
export default function DataInsert() {
    const [update,setupdate]=useState(0);
    const [show,setshow]=useState(false);
    const [showsideNav,setShowSideNav]=useState(false);
    const [makenill,setMakeNill]=useState(false);
    const navi=useNavigate();
    const [loading,setloading]=useState(false);
    const [user_,setuser]=useState({});
    const list_=["Selling","Repairing","Expense"];
    const [expenseState,setExpenseState]=useState({
      nameofExpense:"",
      price:""
    })
    const [reparingState,setReparingState]=useState({
      reparing:"",
      reparingprice:""
    })
    const [sellingState,setSellingState]=useState({
      nameofHelment:"",
      sellingprice:""
    })
    useEffect(()=>{
      setuser(JSON.parse(localStorage.getItem("userdata")))
    },[])
    const apicall=async(insertdata,token,type)=>{
      const data=await axios.post('https://businesslogs-backend.onrender.com/datainsert',insertdata,
        {
          headers:{
          "authorization":token,
          "type":type,
          }
        }
        )
        return data;
    }
    const Submithandler=async()=>{
      try{
        const {token}=JSON.parse(localStorage.getItem("userdata"));
        if(update===1){
          setloading(true);
          const data=await apicall(sellingState,token,"selling");
          setloading(false);
          console.log(data);
          toast.success(data.data.message);

        }
        else if(update===2){
          console.log(reparingState)
          setloading(true);
          const data=await apicall(reparingState,token,"repairing");
          setloading(false);
          console.log(data);
          toast.success(data.data.message);

        }
        else{
          console.log(expenseState);
          setloading(true);
          const data=await apicall(expenseState,token,"expense");
          console.log(data);
          setloading(false);
          toast.success(data.data.message);
      }
        setMakeNill(!makenill);
      }
      catch(e){
        setloading(false);
        console.log(e?.response?.data?.err);
        toast.error(e?.response?.data?.err)
      }
    }
    useEffect(()=>{
      setExpenseState({
        nameofExpense:"",
        price:""
      })
      setSellingState({
        nameofHelment:"",
        sellingprice:""
      })
      setReparingState({
        reparing:"",
        reparingprice:""
      })
    },[makenill])
    useEffect(()=>{
    },[update])
  return (
    <div className='main'>
      <div className='upperSlide'>
      <div className='userInfo' onClick={(e)=>setShowSideNav(!showsideNav)}>
          <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
          <p className='_p'> {user_?.userName?user_?.userName:  " "}</p>
        </div>
        <ImageComp src={logout} onClick={()=>{
          localStorage.removeItem("userdata");
          navi("/");
        }}  style={{width:"30px",height:"30px"}} />
      </div>
      <h2 className='subheading'>Data Insertion</h2>
        
        <div className='mainContenDiv'>
            <div className='selectoption' onClick={()=>setshow(!show)}> Show some option's  {show ? <ExpandMoreIcon />:<KeyboardArrowUpIcon />} </div>
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
            }
            {
             update===3? <>
              <Inputs style={{width:"95%",minWidth:"100px"}} label={"Expense"} value={expenseState.nameofExpense} eventHandler={(e)=>{
              setExpenseState({
                ...expenseState,nameofExpense:e.target.value
              })
            }} placeholder={"Name of Expense"} type={"text"}/>
            <Inputs  value={expenseState.price} eventHandler={(e)=>{
              setExpenseState({
                ...expenseState,price:e.target.value
              })
            }} style={{width:"95%",minWidth:"100px"}} label={"Price "} placeholder={"... Expense price"} type={"number"} />
            </>:null
            }
            {
              update===2? <>
              <Inputs style={{width:"95%",minWidth:"100px"}} label={"Repaired"} value={reparingState.reparing} eventHandler={(e)=>{
                setReparingState({
                  ...reparingState,reparing:e.target.value
                })
            }} placeholder={"... type"} type={"text"}/>
            <Inputs  value={reparingState.reparingprice} eventHandler={(e)=>{
               setReparingState({
                ...reparingState,reparingprice:e.target.value
              })
            }} style={{width:"95%",minWidth:"100px"}} label={"Price "} placeholder={"... type "} type={"number"} />
            </>:null
            }
            {
              update===1? <>
              <Inputs style={{width:"95%",minWidth:"100px"}} label={"Product Name"} value={sellingState.nameofHelment} eventHandler={(e)=>{
                  setSellingState({
                    ...sellingState,nameofHelment:e.target.value
                  })
            }} placeholder={"... type"} type={"text"}/>
            <Inputs  value={sellingState.sellingprice} eventHandler={(e)=>{
              setSellingState({
                ...sellingState,sellingprice:e.target.value
              })
            }} style={{width:"95%",minWidth:"100px"}} label={"Price "} placeholder={"... type "} type={"number"} />
            </>:null
            }
        </div>


      {/* <button className='homebutton' onClick={Submithandler} disabled={!update} showloader={!update}>Submit</button> */}
            <div className='homebutton'>
            <InputButtons value={"Submit"} eventHandler={Submithandler} disabled={!update} showloader={loading}/>
            </div>
      { !user_?
      <div className='SorryDiv'>
          <h1> ! Sorry , 404 error </h1>
          <p>Go back <span onClick={()=>navi("/")
            }>Login</span> </p>
      </div> 
      :null
      } 
      
        <Toasterfunc  />
        <SideNav show={showsideNav}/>
    </div>
  )
}
