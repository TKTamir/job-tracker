import React from "react";

const NavBar: React.FC = () => {

  return (
    <div className="NavBar bg-blue-50 flex w-full m-0 justify-between">
      <button className="m-2">Search</button>
      <div className="">
        <button className="m-2">Log in</button>
        <button className="m-2">Register</button>
      </div>
      <button className="m-2">+</button>
    </div>
  )
}

export default NavBar;
