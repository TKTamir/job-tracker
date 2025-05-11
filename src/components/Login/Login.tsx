import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {useLoginMutation} from "../../state/api/authApi.ts";
import {getServerError} from "../../utils/auth/error.ts";
import {AppDispatch} from "../../state/store.ts";
import {LoginData} from "./Interfaces.ts";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, {isLoading, isError, error}] = useLoginMutation();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const serverErrorMessage = getServerError(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData).unwrap();

      dispatch(closeModal());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-center text-lg font-semibold mt-4 mb-4">Login</h2>
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
        <span className="text-center text-red-500">{isError && serverErrorMessage}</span>
        <button type="submit">{isLoading ? 'Logging in...' : 'Log in'}</button>
      </form>
    </div>
  )
}

export default Login;