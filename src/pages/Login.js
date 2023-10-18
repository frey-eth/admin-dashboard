import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login your account to continue</p>
        <form action="">
          <CustomInput type="text" label="Email" id="email"></CustomInput>
          <CustomInput type="password" label="Password" id="pass"></CustomInput>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="text-decoration-none text-black">
              Forgot Password
            </Link>
          </div>
          <Link
            className="border-0 px-3 py-2 text-white rounded-2 fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
            to="/admin"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
