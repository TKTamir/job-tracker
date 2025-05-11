import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../state/modal/modalSlice.ts";
import {useRegisterMutation} from "../../state/api/authApi.ts";
import {validateAuthForm} from "../../utils/auth/validators.ts";
import {getServerError} from "../../utils/auth/error.ts";
import {AppDispatch} from "../../state/store.ts";
import {UserData} from "./Interfaces.ts";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [register, {isLoading, isError, error}] = useRegisterMutation();
  const [localErrors, setLocalErrors] = useState<{ email?: string; password?: string }>({});
  const [formData, setFormData] = useState<UserData>({
    name: "",
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

    const newLocalErrors: typeof localErrors = validateAuthForm(formData.email, formData.password);
    if (Object.keys(newLocalErrors).length > 0) {
      setLocalErrors(newLocalErrors);
      return;
    }

    setLocalErrors({});

    try {
      await register(formData).unwrap();

      dispatch(closeModal());

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
        {localErrors.email && <span className="text-red-500 text-sm">{localErrors.email}</span>}
        {localErrors.password && <span className="text-red-500 text-sm">{localErrors.password}</span>}
        <span className="text-center text-red-500">{isError && serverErrorMessage}</span>
        <button type="submit">{isLoading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  )
}

export default Register;