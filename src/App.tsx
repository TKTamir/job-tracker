import React, {useEffect} from "react";
import './App.css'
import Home from "./pages/Home/Home.tsx";
import {useDispatch} from "react-redux";
import {loadUserFromToken} from "./state/auth/authSlice.ts";
import {AppDispatch} from "./state/store.ts";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return (
    <div>
      <Home/>
    </div>
  )
}

export default App;
