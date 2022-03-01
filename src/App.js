import axios from "axios";
import { RoutesComponent } from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import React from "react";
import { useDispatch } from 'react-redux'

import actions from "./redux/actions";
import Cookies from "universal-cookie";


function App() {
  const dispatch = useDispatch()
  const checkToken = () => {
    const cookies = new Cookies()
    const token = cookies.get('token')
    if (!token) return;
    dispatch(actions.auth(token));
    axios.defaults.headers.authorization = `Bearer ${token}`
  }

  
  checkToken()
  return (

    <BrowserRouter>
      <div className="App">
        <NavBar />
        <RoutesComponent />
      </div>
    </BrowserRouter>
  );

}

export default App;
