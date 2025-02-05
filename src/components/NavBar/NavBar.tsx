import React, {useState} from "react";
import Modal from "../Modal/Modal.tsx";
import AddJob from "../AddJob/AddJob.tsx";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="NavBar bg-blue-50 flex w-full m-0 justify-between">
      <input className="m-2" placeholder="Search"/>
      <button className="m-2" onClick={() => setIsModalOpen(true)}>+</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddJob/>
      </Modal>
      <div className="">
        <button className="m-2">Register</button>
        <button className="m-2">Log in</button>
      </div>
    </div>
  )
}

export default NavBar;
