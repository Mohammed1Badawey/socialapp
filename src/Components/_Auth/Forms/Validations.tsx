import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth must be in the past"),
    gender: Yup.string().required("Gender is required"),
  });

  export const signInValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });