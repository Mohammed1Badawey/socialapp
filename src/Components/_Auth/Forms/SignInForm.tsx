import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signInValidation } from "./Validations";
import Loading from "./../../Shared/Loading";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/Redux/store";
import { signIn } from "@/lib/Redux/Slices/User/signInSlice";
import { loggedUser } from "@/lib/Redux/Slices/User/userDataSlice";

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const auth = useSelector((state: any) => state.signIn.isAuthenticated);
  const { isLoading } = useSelector((state: any) => state.signIn);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidation,
    onSubmit: (values) => {
      console.log(values);
      dispatch(signIn(values)).then(() => {
        dispatch(loggedUser());
        navigate("/");
        console.log(auth);
      });
    },
  });

  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-4xl m-6">Bird App</h1>
      </div>

      <form className="w-[40%]" onSubmit={formik.handleSubmit}>
        <div className="p-8 flex flex-col rounded-xl shadow-lg w-full m-auto bg-gray-100 dark:bg-gray-800 gap-6">
          <h2 className="text-black dark:text-white text-2xl font-bold mb-6">
            Sign In
          </h2>

          <div className="relative bg-inherit">
            <input
              type="text"
              {...formik.getFieldProps("email")}
              id="email"
              placeholder=""
              className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded peer bg-inherit"
            />
            <label
              htmlFor="email"
              className="absolute bg-inherit transition-all duration-300 left-1 p-1 top-1 text-gray-400 dark:text-gray-400 cursor-text peer-focus:-top-4 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm"
            >
              Enter your email
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="relative bg-inherit">
            <input
              type="password"
              {...formik.getFieldProps("password")}
              id="password"
              placeholder=""
              className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded peer bg-inherit"
            />
            <label
              htmlFor="password"
              className="absolute bg-inherit transition-all duration-300 left-1 p-1 top-1 text-gray-400 dark:text-gray-400 cursor-text peer-focus:-top-4 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm"
            >
              Enter password
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 dark:disabled:bg-blue-700 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 rounded-2xl cursor-pointer mt-3 w-1/3"
          >
            {isLoading ? <Loading /> : "Sign In"}
          </button>

          <p className="text-gray-400 dark:text-gray-300 text-sm mt-3">
            New user ?{" "}
            <Link
              to="/sign-in"
              className="text-blue-400 dark:text-blue-300 underline"
            >
              SignUp here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SigninForm;
