import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../features/auth/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, "Password must have more than 5 letters")
        .required("Enter your Password"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter your Email"),
    }),
  });

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    }
  }, [user, isError, isLoading, isSuccess, message]);

  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login your account to continue</p>
        <div className="error text-center">
          {message.message ==="Rejected" ?  "You are not admin": ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Email Address"
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange("email")}
            value={formik.values.email}
          />
          <div className="error">
            {formik.touched.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <CustomInput
            label="Password"
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
          />
          <div className="error">
            {formik.touched.password ? (
              <div className="text-danger d-flex">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link
              to="forgot-password"
              className="text-decoration-none text-black"
            >
              Forgot Password
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white rounded-2 fw-bold w-100 text-center text-decoration-none fs-5"
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
