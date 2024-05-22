import React, { useEffect, useState } from 'react'
import ImageComp from '../../Re-usableComp/ImageComp';
import user from "../../Re-usableComp/user.png";
import logout from "../../Re-usableComp/logout.png";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import downloaded from "../downloaded.png";
import "./addproduct.css";
import toast from 'react-hot-toast';
import Cleanwhitebackground from './cleanwhitebackground';
import HandleFile from './filebackremover';
import handleImageUpload from './filebackremover';
import HandleImageUpload from './filebackremover';
import axios from 'axios';
import Toasterfunc from '../../Re-usableComp/Toaster';
import { height, width } from '@mui/system';
export default function Addproduct() {
    const [showlist,setshowlist]=useState(false);
    const [file,setfile]=useState();
    const [imgurl,setimgurl]=useState("");
    const [mainimgurl,setmainimgurl]=useState("");
    const [listdata,setlistdata]=useState([]);
    const [instantload,setinstantload]=useState(false);
    const [name,setname]=useState("");
    console.log(name);
    const [loading,setloading]=useState(true);
    const [price,setprice]=useState(0);
    const [message,setmessage]=useState("");
    const [namefile,setfilename]=useState()
    const [fileurl, setfileurl] = useState(null);
    useEffect(()=>{
        if(file)
        {
                handleImageUpload(file,setfileurl);
        }
    },[file,namefile])
    // useEffect(()=>{
    //     setloading(true);
    //     setTimeout(() => {
    //         setloading(false);
    //     }, 1000);
    // },[showlist])
    useEffect(()=>{
        console.log(message);
    },[message])


    const removeWhiteBackground = (base64) => {
        console.log(base64);
        const img = new Image();
        img.src = base64;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
    
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
    
          for (let i = 0; i < data.length; i += 4) {
            if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
              // If the pixel is white, make it transparent
              data[i + 3] = 0;
            }
          }
    
          ctx.putImageData(imageData, 0, 0);
          console.log(canvas.toDataURL());
        //   setProcessedBase64(canvas.toDataURL());
        };
      };
    async function getproducts(){
        try{
            setloading(true);
            const dataone=await axios.post("http://localhost:7500/getproducts",{},{
            headers:{
                "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzaGFkIiwiZGVjcnlwdGVkUGFzc3dvcmQiOiIkMmIkMTAkTDA1WmNKRkd6Q1BLMXdWcEZWRXZGZWF3TFk5QVhOcHN6djhtbnNNa2czeGttZVRoOW9neUMiLCJpYXQiOjE3MTM2NDg3Mzd9.E68wMyT8ttM5WkHnKLjrP-iKGpQTG90O2yPE6IzUwz8",
                // user_?.token,
                // "type":updatedValue ,
                // "page":page
            }
            })
            setloading(false);
            console.log(dataone.data.data);
            setlistdata(dataone.data.data)
        }
        catch(e){
            console.log(e);
            setloading(false);

        }
    }
    useEffect(()=>{
        getproducts();
    },[instantload])
    async function callapi(dat_a){
       try{
        const data= await axios.post("http://localhost:7500/addproduct",(dat_a),{
            headers:{
                "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzaGFkIiwiZGVjcnlwdGVkUGFzc3dvcmQiOiIkMmIkMTAkTDA1WmNKRkd6Q1BLMXdWcEZWRXZGZWF3TFk5QVhOcHN6djhtbnNNa2czeGttZVRoOW9neUMiLCJpYXQiOjE3MTM2NDg3Mzd9.E68wMyT8ttM5WkHnKLjrP-iKGpQTG90O2yPE6IzUwz8",
            }
        })
        console.log(data,data.data,data.data.mes);
        toast.success(data.data.mes);
        setname("");
        setfilename("");
        setprice("");
        setfileurl("");
        setfile("");
        setimgurl("");
        setmainimgurl("");
       }
       catch(e){
        console.log(e.message);
        toast.error(e?.response?.data?.err)
       }
    }
    useEffect(()=>{
        if(imgurl)
        {
           Cleanwhitebackground(imgurl, setimgurl);
        }
        
        console.log(file,namefile,imgurl);
    },[imgurl])
    useEffect(()=>{
        console.log("reloaded");
    },[instantload])
    const Submithandler=(e)=>{
        // if( !namefile &&  !imgurl){

        // }
        if(namefile || imgurl){
            
            e.preventDefault();
            if(file){
                console.log(typeof(file),JSON.stringify(file)   ,file);
                const Formdata=new FormData();
                Formdata.append("name",name);
                Formdata.append("image",file);
                Formdata.append("price",price);
                callapi(Formdata)
            }
            else if(imgurl){
                console.log(name,mainimgurl,price)
                const Formdata=new FormData();
                Formdata.append("name",name);
                Formdata.append("image",mainimgurl);
                Formdata.append("price",price);
                callapi(Formdata)
            }
            setinstantload(!instantload);
            setshowlist(true);
        }
        else{
            e.preventDefault();
            setmessage("Select file or type url");
            setTimeout(() => {
            setmessage("");
            }, 1000);
        }
    }
  return (
    <div className='main'>
        <div className='upperSlide'>
            <div className='userInfo' onClick={()=>{}
                // setshownav(!shownav)
                }>
                <ImageComp src={user}  style={{width:"30px",height:"30px"}} />
                <p className='_p'> {
                // user_?.userName?user_?.userName:  " "
                }</p>
            </div>
            <div onClick={()=>{
                localStorage.removeItem("userdata");
                // navi("/");
            }} className='logout_' >
            <ImageComp src={logout}/>
            {/* style={{width:"30px",height:"30px"}}  */}
            </div>
        </div>
        <div className='maincontent_s'>
            <div className='thirty'>
                    <AddIcon  className='icons' onClick={()=>setshowlist(false)} style={{fontSize:"38px",border:!showlist?"3px solid rgba(255,255,255,.7)":"none"}}/>
                    <ListIcon className='icons' onClick={()=>setshowlist(true)} style={{fontSize:"38px",border:showlist?"3px solid rgba(255,255,255,.7)":"none"}} />
            </div>
            <div className='allsec'>
                {!showlist?
                <div className='form_' >
                    <h1>Add your Product</h1>
                    <form className='formsinside' onSubmit={Submithandler}>
                            <div className='sameforms_'>Name : <input required={true} className='inps_'  type='text' value={name}  onChange={(e)=>(setname(e.target.value))}  placeholder='write product name'/> </div>
                            <div className='sameforms_'>Image :<div id='sm_'> { (file || imgurl) ?<div id='uploaded'>
                            <ImageComp src={imgurl?imgurl:(fileurl?fileurl:downloaded)} style={{width:"55px",height:"55px"}} />
                            {namefile}

                            <p className='delete' onClick={()=>{
                                setfilename("");
                                setfile("");
                                setimgurl("");
                            }}>x</p>

                            
                           </div>: <>
                           
                           <div className="upload-btn-wrapper">
                           <button className="btn"> <AddCircleOutlineIcon  style={{fontSize:"38px"}} className='addicon'/> 
                           </button>
                           <input type="file" name="myfile" accept="image/*" onChange={(e)=>{
                                setfile(e.target.files[0])
                                setfilename(e.target.files[0].name);
                            }} />
                            </div>  Or  <input className='inps_' type='text' onChange={(e)=>{
                                    setimgurl(e.target.value);
                                    setmainimgurl(e.target.value);
                            }}  placeholder='type URL ...' />
                           </>}
                           {
                                message?<div className='notification'>{message}
                                
                                <div className='triangle'></div>
                                </div>:null
                            }
                            </div> 
                            </div>
                            <div className='sameforms_'>Price : <input className='inps_' type='number' value={price} onChange={(e)=>(setprice(e.target.value))} required={true}  placeholder='type price ...'  /> </div>
                            <button id='submit' onClick={(e)=>{
                        e.target.style.border="1px solid white";
                        e.target.style.transform="translateX(-2px)";
                        e.target.style.boxShadow= "-6px 7px 2px 0px rgba(0,0,0,.2)";
                        setTimeout(() => {
                            e.target.style.border="none";
                            e.target.style.transform="translateX(2px)";
                            e.target.style.boxShadow="none";
                        }, 200);
                    }} type='submit'>submit</button>
                    </form>
                    
                </div>:
                <div className='list_s'>
                    {
                        loading?<Box sx={{ display: 'flex' ,width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                        <CircularProgress />
                      </Box>:listdata?.map((e,i)=>{
                            // if(e?.Name)
                            console.log(typeof(e?.Image));
                            {
                                return <div key={i} className='card'>
                                    {
                                     e?.Name
                                    }
                                    {
                                 ( typeof(e?.Image))!="object"?
                                 <div>
                                 <ImageComp src={e?.Image}  style={{width:"100px",height:"100px"}} />
                              
                                </div>
                                :
                                <div>
                                {removeWhiteBackground(e?.Image)}
                                </div>
                                 }
                                <p>{e?.Price}</p>

                            </div>}
                        })
                    }
                </div>
                }

            </div>
        </div>
        <Toasterfunc  />
    </div>
  )
}
