import React from "react";
import NavBar from "../../components/NavBar/NavBar.tsx";
import Dashboard from "../../components/Dashboard/Dashboard.tsx";

const Home: React.FC = () => {

  return (
    <div className="Home flex flex-col justify-center">
      <NavBar/>
      <Dashboard/>
    </div>
  )
}

export default Home;
