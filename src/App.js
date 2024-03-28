import './App.css';
import {Routes,Route} from "react-router-dom";
import SignUp from './Components/Sign-up';
import Homepage from './Components/Home/Homepage';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './Components/Notfound';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path={"/"} element={<SignUp />} />
        <Route  path={"/home"} element={<Homepage />} />
        <Route  path={"/dataInsert"} element={<SignUp />} />
        <Route  path={"/viewdata"} element={<SignUp />} />
        <Route  path={"/expensetracker"} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

// !pathname?.split("/")[1]?.includes("dataInsert") ?<NotFound />: !pathname?.split("/")[1]?.includes("expensetracker") ?<NotFound />: !pathname?.split("/")[1]?.includes("home") ?<NotFound />: !pathname?.split("/")[1]?.includes("expensetracker")?<NotFound />:null
   