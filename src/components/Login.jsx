import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Sorry, firstname is required"),
      password: Yup.string().required("Sorry, firstname is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="bg-[url(assets/images/login-page-bg.png)] w-screen h-screen bg-cover flex items-center justify-center">
      <div className="w-[500px] h-[464px] bg-white flex flex-col rounded-xl items-center justify-center px-7">
        <div className="w-[200px]">
          <img src="src/assets/icons/hrelix-logo.svg" alt="" />
        </div>
        <p className="text-center text-[24px] font-medium text-primary-light mt-2">
          Login to your account
        </p>
        <form onSubmit={formik.handleSubmit} className="w-full mt-5">
          <input
            className={`bg-secondary/50 border ${
              formik.errors.username && formik.touched.username
                ? "border-red-500"
                : "border-secondary"
            } text-primary-dark font-medium text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5 mt-5`}
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
            } text-primary-dark font-medium text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark block w-full p-2.5 mt-5`}
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
            className="w-full h-[43px] bg-accent rounded-lg flex justify-center items-center mt-7 cursor-pointer"
            onClick={formik.handleSubmit}
          >
            <p className="text-lg font-semibold text-primary-dark">Sign In</p>
          </div>
        </form>
      </div>
    </div>
  );
}
