import React, { useEffect, useState } from 'react'
import ImageComp from '../../Re-usableComp/ImageComp';
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import axios from "axios";
import "./expense.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut} from "react-chartjs-2";
import SideNav from '../Sidenav/SideNav';
import { useNavigate } from 'react-router-dom';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function Expensetracker() {
    const [shownav,setshownav]=useState(false);
    const navi=useNavigate();
    const [dates,setdates]=useState({
      startDate:"",
      EndDate:""
    })
    console.log(dates);
    const [err,seterr]=useState("");
    const [Data,setData]=useState({
        data:[],
        count:0
    })
    console.log(Data.count?Data:null);
    const [loading,setloading]=useState(true);
    const [user_,setuser]=useState();
    const Doughnutdata = {
        labels: ["Expense", "Selling", "Reparing"],
        datasets: [
          {
            label: "Data",
            // data: arr2.length !== 0 ? [av_, good, not_good] :  spec_id==0? [250, 50, 200]:spec_id==1?[100, 50, 150]:spec_id==2?[100, 50, 250]:spec_id==3?[200, 50, 150]:[],
            data:Data.data?Data.data:[200, 50, 150],
            backgroundColor: [
              "rgb(200, 50, 80)",
              "lightgreen",
              "green",
            ],
            borderWidth: 1,
            hoverOffset: 15,
          },
        ],
      };
    useEffect(()=>{
        setuser(JSON.parse(localStorage.getItem("userdata")))
      },[])
    const apicall=async ()=>{
        try{
            if(user_?.token)
            {
                setloading(true);
                const data= await axios.post("https://businesslogs-backend.onrender.com/expensetracker",{
                    "date":`${new Date()}`
                },{
                    headers:{
                        "authorization":`${user_?.token}`,
                        ...dates
                    }
                })
                setloading(false);
                const  {sellingamount,repairingamount,expenseamount,}=(data.data);
                console.log([expenseamount,sellingamount,repairingamount],data.data);
                setData({
                    ...Data,data:[expenseamount,sellingamount,repairingamount],count:data.data[
                        "total transaction"
                        ]
                })
                // {msg: 'data getted it', sellingamount: 2050, repairingamount: 250, expenseamount: 220, total transaction: 4}
            }
        }
        catch(e){
            console.log(e?.message);
        }
      
    }
    useEffect(()=>{
        apicall();
    },[user_,(dates.startDate && dates.EndDate)])
  return (
    <div className='main' id='maincomp_1'>
    <div className='upperSlide'>
      <div className='userInfo' onClick={()=>setshownav(!shownav)}>
        <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
        <p className='_p'> {user_?.userName?user_?.userName:  " "}</p>
      </div>
      <div onClick={()=>{
        localStorage.removeItem("userdata");
        navi("/");
      }} className='logout_' >
      <ImageComp src={logout}/>
      {/* style={{width:"30px",height:"30px"}}  */}
      </div>
    </div>
    <div className='headings_1'>
      {/* <div style={{minWidth:"400px"}}></div> */}
      {
        !Data?.count?"": <h2 className='heads' style={{marginLeft:"5%"}}> <span className='sp_an'>{Data?.count <10 ?`0${Data.count} `:`${Data.count}`}
        </span> {(dates.startDate && dates.EndDate )?":  Total Data after filteration":":  Total Data before filteration"} </h2>
      }
      {/* <div className='counts_'>{`Total Logs : ${totalCount?totalCount:"-"}`}</div> */}
      <div className='dateinpdiv'>
         <div className='dates' style={{width:"auto",height:"auto",display:"flex",gap:"10px",fontSize:"18px",alignItems:"center"}}>Start Date : <input className='dateinp' onChange={(e)=>{
          setdates({
            ...dates,startDate:e.target.value
          })
          }} type='date'/></div>

         <div className='dates' style={{width:"auto",height:"auto",display:"flex",gap:"10px",fontSize:"18px",alignItems:"center"}}>End Date : <input className='dateinp' onChange={(e)=>{setdates({
            ...dates,EndDate:e.target.value
          })}} type='date'/></div>
      </div>
    </div>
 
      
      <div className='mainContenDiv'>
        
         {
            loading ? <div className='loading_s'>
                                     <div className='inone'>
                                    <div className='intwo'>
                                      
                                   </div>
                                   </div>
                                   </div>:
                                   
                                   Data?.count?
                                   <div className='insidemaincon'>
                                    <div className='samenums' id='one_1'>{`Selling Amount : ${Data?.data[1]}Rs`}</div>
                                    <div className='samenums' id='two_2'>{`Expense Amount : ${Data?.data[0]? `${Data?.data[0]}  Rs`:"--"} `}</div>
                                    <div className='samenums' id='three_3'>{` Reparing Amount : ${Data?.data[2]}Rs`}</div>
                                    <div className='samenums' id='four_4'>{`Total Amount Left : ${(Data?.data[2]+Data?.data[1])-Data?.data[0]}Rs`}</div>

                                     <Doughnut data={Doughnutdata}  style={{width:"100%",minHeight:"200px",height:"200px",marginTop:"-2%",marginBottom:"auto"}} />
                                   </div>:<div style={{width:"80%",height:"100%",display:"flex",justifyContent:'center',alignItems:'center'}}>No data found</div>
         }
      </div>
           

   
    
      {/* <Toasterfunc  /> */}
      <SideNav  show={shownav}/>

  </div>
  )
}
