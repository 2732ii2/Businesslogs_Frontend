import './App.css';
import SignUp from './Components/Sign-up';
import Homepage from './Components/Home/Homepage';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFound from './Components/Notfound';
import {Provider} from "react-redux";
import store from './Redux/store';
import Register from './Components/Register/Register';
import MainPage from './mainPage';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;

// !pathname?.split("/")[1]?.includes("dataInsert") ?<NotFound />: !pathname?.split("/")[1]?.includes("expensetracker") ?<NotFound />: !pathname?.split("/")[1]?.includes("home") ?<NotFound />: !pathname?.split("/")[1]?.includes("expensetracker")?<NotFound />:null
   