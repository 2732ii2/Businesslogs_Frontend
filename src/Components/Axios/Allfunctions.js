import axios from "axios";
async function getproducts(user_,setloading,setlistdata,type){
    console.log("get products ",user_.token);
    try{
        if(user_.token){
            setloading(true);
            const dataone=await axios.post("https://businesslogs-backend.onrender.com/getproducts",{},{
            headers:{
                "authorization":`${user_.token}`,
                "type":type
            }
            })
            setloading(false);
            console.log(dataone.data.data);
            setlistdata(dataone.data.data)
        }
        else{
            setloading(false);
        }
    }
    catch(e){
        console.log(e);
        setloading(false);

    }
}
export {getproducts};