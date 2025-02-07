import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state/store.ts";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {loginUser} from "../../state/auth/authSlice.ts";


const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({id: 1, ...formData}));
    dispatch(closeModal());
  };

  return (
    <div className="Login">
      <h2 className="text-lg font-semibold mt-4 mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="Login flex flex-col gap-3">
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
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;