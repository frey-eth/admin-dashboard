import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please Enter your Email to Get New Password
        </p>
        <form action="">
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
          ></CustomInput>

          <button
            className="border-0 px-3 py-2 text-white rounded-2 fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
