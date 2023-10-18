import React from "react";
import CustomInput from "../components/CustomInput";

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please Enter your New Password</p>
        <form action="">
          <CustomInput
            type="password"
            label="New Password"
            id="pass"
          ></CustomInput>
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpass"
          ></CustomInput>
          <button
            className="border-0 px-3 py-2 text-white rounded-2 fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
