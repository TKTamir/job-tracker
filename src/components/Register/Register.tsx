import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {registerUser} from "../../state/auth/authSlice.ts";
import {UserData} from "./Interfaces.ts";


const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await dispatch(registerUser(formData)).unwrap();

      dispatch(closeModal());

      console.log("User logged in:", user);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="Register">
      <h2 className="text-lg font-semibold mt-4 mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="Register flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;