import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { authenticateUser } from "../utils/Thunks";
import { Alert, Spinner } from "@heroui/react";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Sorry, firstname is required"),
      password: Yup.string().required("Sorry, firstname is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values.username, values.password);
    },
  });

  const handleLogin = (username, password) => {
    dispatch(authenticateUser({ username: username, password: password }));
  };

  return (
    <div className="bg-[url(images/login-page-bg.png)] w-screen h-screen bg-cover flex items-center justify-center">
      <div className="w-[500px] h-[550px] bg-white flex flex-col rounded-xl items-center justify-center px-7">
        <div className="w-[200px]">
          <img src="icons/hrelix-logo.svg" alt="" />
        </div>
        <p className="text-center text-[24px] font-medium text-primaryLight mt-2">
          Login to your account
        </p>
        <form onSubmit={formik.handleSubmit} className="w-full mt-5">
          <input
            className={`bg-secondary/50 border ${
              formik.errors.username && formik.touched.username
                ? "border-red-500"
                : "border-secondary"
            } text-primaryDark font-medium text-sm rounded-lg focus:ring-primaryDark focus:border-primaryDark block w-full p-2.5 mt-5`}
            type="text"
            name="username"
            placeholder="Employee Id / Email"
            {...formik.getFieldProps("username")}
          />
          {formik.errors.username && formik.touched.username && (
            <span className="text-red-500 text-sm">
              {formik.errors.username}
            </span>
          )}
          <input
            className={`bg-secondary/50 border ${
              formik.errors.password && formik.touched.password
                ? "border-red-500"
                : "border-secondary"
            } text-primaryDark font-medium text-sm rounded-lg focus:ring-primaryDark focus:border-primaryDark block w-full p-2.5 mt-5`}
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          )}

          <div
            className={`w-full h-[43px] bg-accent rounded-lg flex justify-center items-center mt-7 cursor-pointer ${
              auth.loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={!auth.loading ? formik.handleSubmit : undefined}
          >
            {auth.loading ? (
              <Spinner size="sm" color="danger" variant="gradient" />
            ) : (
              <p className="text-lg font-semibold text-primaryDark">Sign In</p>
            )}
          </div>
          <div>
            {auth.error != null ? (
              <Alert
                hideIconWrapper
                color={"danger"}
                title={`Error: ${auth.error}`}
                className="mt-4"
              />
            ) : null}
          </div>
        </form>
        <p className="pt-4 italic text-pink-400">
          For testing, email:{" "}
          <span className="text-green-500 font-bold">test.user@hrelix.com</span>{" "}
          pass: <span className="text-green-500 font-bold">test@123</span>
        </p>
      </div>
    </div>
  );
}
