import React from "react";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login your account to continue</p>
        <form action="">
          <CustomInput
            type="text"
            label="Email"
            placeholder="Email Address"
            id="email"
          ></CustomInput>
          <CustomInput
            type="password"
            label="Password"
            placeholder="Password"
            id="pass"
          ></CustomInput>
          <button
            className="border-0 px-3 py-2 text-white rounded-2 fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
