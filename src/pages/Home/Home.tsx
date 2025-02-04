import NavBar from "../../components/NavBar/NavBar.tsx";
import Dashboard from "../../components/Dashboard/Dashboard.tsx";

function Home() {

  return (
    <div className="Home flex flex-col justify-center">
      <NavBar/>
      <Dashboard/>
    </div>
  )
}

export default Home;
