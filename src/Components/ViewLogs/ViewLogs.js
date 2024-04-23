import React, { useEffect, useState } from 'react'
import ImageComp from '../../Re-usableComp/ImageComp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import "./viewlogs.css";
import axios from "axios";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InputButtons from '../../Re-usableComp/InputButtons';
import Toasterfunc from '../../Re-usableComp/Toaster';
import { useNavigate } from 'react-router-dom';
import {BounceLoader} from "react-spinners";
import SideNav from '../Sidenav/SideNav';
export default function ViewLogs() {
    const [show,setshow]=useState(false);
    const [update,setupdate]=useState(0);
    const [user_,setuser]=useState({});
    const [page,setpage]=useState(1);
    const navi=useNavigate();
    const [shownav,setshownav]=useState(false);
    const [loading,setloading]=useState(true);
    const [dataArr,setDataArr]=useState([]);
    // console.log(dataArr);
    const list_=["Expense","Selling","Repairing"];
    const [updatedValue,setUpatedValue]=useState("selling");
    // console.log(updatedValue);
    const [totalCount,setTotalCount]=useState(0);
    const [err,seterr]=useState("");
    const mainDiv=parseInt(totalCount/5)+1;
    // console.log(mainDiv)
    function DateConverter(dateString){
      const date = new Date(dateString);
      // Extracting month, day, and year components
      const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based index
      const day = date.getDate();
      const year = date.getFullYear();

      // Formatting the date as MM/DD/YYYY
      const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

      return (formattedDate);
    }
    const apicall=async()=>{
      try{
        if(user_?.token)
        {
          setloading(true);
        const dataone=await axios.post("https://businesslogs-backend.onrender.com/viewData",{},{
          headers:{
            "authorization":user_?.token,
            "type":updatedValue ,
            "page":page
          }
        })
        setloading(false);
        // console.log(dataone.data.data,dataone.data?.count);
        setTotalCount(dataone?.data?.count);
        setDataArr(dataone.data.data);
      }

      }
      catch(e){
        console.log(e);
        seterr(e?.message);
      }
    }
    useEffect(()=>{
        setpage(1);
    },[updatedValue])
    useEffect(()=>{
      apicall();
    },[user_,updatedValue,page])
    useEffect(()=>{
      setuser(JSON.parse(localStorage.getItem("userdata")))
    },[])
    console.log("=>",page*5 , totalCount);
    useEffect(()=>{

    },[update]);
  return (
    <div className='view'>
    <div className='upperSlide'>
      <div className='userInfo' onClick={()=>setshownav(!shownav)}>
        <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
        <p className='_p'> {user_?.userName?user_?.userName:  " "}</p>
      </div>
      <ImageComp src={logout} onClick={()=>{
        localStorage.removeItem("userdata");
        navi("/");
      }}  style={{width:"30px",height:"30px"}} />
    </div>
    <div className='headings_1'>
      <div></div>
      <h2 className='subheading' style={{marginLeft:"15%"}}>View Logs</h2>
      <div className='counts_'>{`Total Logs : ${totalCount?totalCount:"-"}`}</div>
    </div>
 
      
      <div className='mainContenDiv'>
         <div className='filteroptions'>
            <label for="options" id='filterLabel'>Filter By :</label>
            <select name="cars" id="options" onChange={(e)=>setUpatedValue(e.target.value)}>
                <option value="selling">Selling</option>
                <option value="expense">Expense</option>
                <option value="repairing">Repairing</option>
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
           {


            dataArr?.length?<>
                {
                    !loading?<div className='table_'>

                    <table>
                      <tr>
                        <th>Seriol No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Date</th>
                      </tr>
                      {
                        dataArr.map((e,i)=>{
                          return  <tr key={i} >
                                      <td>{ ((page-1)*5 )+(i+1)}</td>
                                      <td>{e.Name?e.Name:"-"}</td>
                                      <td>{e.Price?`${e.Price} Rs`:"-"}</td>
                                      <td>{e?.timing?DateConverter(e?.timing):"-"}</td>
                                  </tr>
                        })
                      }
                        </table>
                        <div className='mobilediv'>
                          {
                            dataArr.map((e,i)=>{
                              return <div className='insidemobile' key={i}>
                                <div className='sameDivs_' id='names'>{e.Name?e.Name:"-"}</div>
                                <div className='sameDivs_'>{e?.timing?DateConverter(e?.timing):"-"}</div>
                                <div className='sameDivs_' id='prices'>{e.Price?`${e.Price} Rs`:"-"}</div>
                              </div>
                            })
                          }
                        </div>
                      <div className='lastslit'>
                      <div className='buttonsslit'>
                      <ChevronLeftIcon style={{color:`${1 == page?"rgba(0,0,0,.4)":"black"}`}}  onClick={()=>{
                        if(1 < page){
                          setpage(page-1)
                        }
                      }} /> {page} <ChevronRightIcon style={{color:`${( (page*5 >= totalCount) )?"rgba(0,0,0,.4)":"black"}`}}  onClick={()=>{
                        if(totalCount %5 === 0)  
                        {
                          if((page < mainDiv) && page != mainDiv-1){
                            setpage(page+1)
                          }
                        }
                        else{
                          if((page < mainDiv) && page*5 <= totalCount){
                            setpage(page+1)
                          }
                        }
                        
                      }} />
                      </div>
                      </div>
                                  </div> :<div className='loading_s'>
                                    <div className='inone'>
                                    <div className='intwo'>
                                      
                                      </div>
                                    </div>
                                    </div>
                }



              </>:( err?null:  <div className='loading_s'>
                                    <div className='inone'>
                                    <div className='intwo'>
                                      
                                      </div>
                                    </div>
                                    </div>)



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
      <SideNav  show={shownav}/>

  </div>
  )
}
