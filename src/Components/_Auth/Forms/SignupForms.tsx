import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth must be in the past"),
  gender: Yup.string().required("Gender is required"),
});
const SignupForms = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // State to track date components
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Initialize date fields from dateOfBirth if it exists
  useEffect(() => {
    if (formik.values.dateOfBirth) {
      const date = new Date(formik.values.dateOfBirth);
      setDay(date.getDate().toString());
      setMonth((date.getMonth() + 1).toString());
      setYear(date.getFullYear().toString());
    }
  }, [formik.values.dateOfBirth]);

  // Update dateOfBirth when day, month, or year changes
  const updateDateOfBirth = (
    newDay: string,
    newMonth: string,
    newYear: string
  ) => {
    if (newDay && newMonth && newYear) {
      const dateStr = `${newYear}-${newMonth
        .toString()
        .padStart(2, "0")}-${newDay.toString().padStart(2, "0")}`;
      formik.setFieldValue("dateOfBirth", dateStr);
    }
  };
  return (
    <form className="w-[40%]" onSubmit={formik.handleSubmit}>
      <div className="p-8 flex flex-col rounded-xl shadow-lg w-full m-auto bg-gray-100 dark:bg-gray-800 gap-6">
        <h2 className="text-black dark:text-white text-2xl font-bold mb-6">
          Create an account
        </h2>

        <div className="relative bg-inherit">
          <input
            type="text"
            {...formik.getFieldProps("name")}
            id="name"
            placeholder=""
            className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded peer bg-inherit"
          />
          <label
            htmlFor="name"
            className="absolute bg-inherit transition-all duration-300 left-1 p-1 top-1 text-gray-400 dark:text-gray-400 cursor-text peer-focus:-top-4 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm"
          >
            Enter your name
          </label>
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

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

        <div className="relative bg-inherit">
          <input
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            id="confirmPassword"
            placeholder=""
            className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded peer bg-inherit"
          />
          <label
            htmlFor="confirmPassword"
            className="absolute bg-inherit transition-all duration-300 left-1 p-1 top-1 text-gray-400 dark:text-gray-400 cursor-text peer-focus:-top-4 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-sm"
          >
            Confirm password
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 dark:text-gray-300 text-sm">
            Date of Birth
          </label>

          <div className="flex gap-2">
            <div className="relative bg-inherit flex-1">
              <select
                title="Day"
                id="day"
                value={day}
                className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded bg-inherit"
                onChange={(e) => {
                  const newDay = e.target.value;
                  setDay(newDay);
                  updateDateOfBirth(newDay, month, year);
                }}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative bg-inherit flex-1">
              <select
                title="Month"
                id="month"
                value={month}
                className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded bg-inherit"
                onChange={(e) => {
                  const newMonth = e.target.value;
                  setMonth(newMonth);
                  updateDateOfBirth(day, newMonth, year);
                }}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative bg-inherit flex-1">
              <select
                title="Year"
                id="year"
                value={year}
                className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded bg-inherit"
                onChange={(e) => {
                  const newYear = e.target.value;
                  setYear(newYear);
                  updateDateOfBirth(day, month, newYear);
                }}
              >
                <option value="">Year</option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.dateOfBirth}
            </div>
          )}
        </div>

        <div className="relative bg-inherit">
          <select
            id="gender"
            {...formik.getFieldProps("gender")}
            className="w-full p-2 text-black dark:text-white focus:outline-black dark:focus:outline-white outline outline-gray-400 dark:outline-gray-600 rounded bg-inherit"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.gender}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 rounded-2xl cursor-pointer mt-3 w-1/3"
        >
          Register
        </button>

        <p className="text-gray-400 dark:text-gray-300 text-sm mt-3">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-400 dark:text-blue-300">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForms;
