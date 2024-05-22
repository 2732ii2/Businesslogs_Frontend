import React, { useEffect } from 'react'
import SignUp from './Components/Sign-up'
import Register from './Components/Register/Register'
import Homepage from './Components/Home/Homepage'
import {Routes,Route} from "react-router-dom";
import {useSelector} from "react-redux";
import DataInsert from './Components/DataInsert/dataInsert';
import ViewLogs from './Components/ViewLogs/ViewLogs';
import Expensetracker from './Components/expense/expensetracker';
import Addproduct from './Components/AddProduct/Addproduct';
export default function MainPage() {
    const redux_state = useSelector((state) => state);
    console.log(redux_state);
    useEffect(()=>{
    console.log(redux_state);
    },[redux_state]);
  return (
    <>
        <Routes>
          <Route  path={"/"} element={  <SignUp />} />
          <Route  path={"/register"} element={<Register />} />
          <Route  path={"/home"} element={<Homepage />} />
          <Route  path={"/dataInsert"} element={<DataInsert />} />
          <Route  path={"/viewdata"} element={<ViewLogs />} />
          <Route  path={"/expensetracker"} element={<Expensetracker />} />
          <Route  path={"/addproduct"} element={<Addproduct />} />
        </Routes>
    </>
  )
}
