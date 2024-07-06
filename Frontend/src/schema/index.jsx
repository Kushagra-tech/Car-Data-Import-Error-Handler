import * as Yup from "yup";
export const SignupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too short")
    .max(20, "Too Long,Give shorter name")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/\.com$/, { message: "Email must end with .com" })
    .required("Please Enter Email"),

  password: Yup.string()
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    )
    .matches(/\d/, "Password must contain at least one numeric character")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
