import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
};

const Registration = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [validationError, setValidationError] = useState("");

  const validate = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = import.meta.env.VITE_email;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email)
    ) {
      errors.email = import.meta.env.VITE_email_invalid;
    }

    if (!formValues.password) {
      errors.password = import.meta.env.VITE_password;
    } else if (formValues.password.length < 6) {
      errors.password = import.meta.env.VITE_password_length;
    }

    if (!formValues.confirm_password) {
      errors.confirm_password = import.meta.env.VITE_confirm_password;
    } else if (formValues.confirm_password !== formValues.password) {
      errors.confirm_password = import.meta.env.VITE_confirm_password_mismatch;
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        const result = await response.json();
        if (!response.ok) {
          setValidationError(result.error);
          throw new Error("Network response was not ok");
        }
        setResponseData(result);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold text-red-700 hover:text-red-800"
            >
              Log in
            </Link>
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-red-700">
                Email :
                <div className="mt-1">
                  <input
                    name="email"
                    type="text"
                    value={formValues.email}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="form-error text-red-700">{errors.email}</p>
                )}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-700">
                Password :
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={formValues.password}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
                {errors.password && (
                  <p className="form-error text-red-700">{errors.password}</p>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-red-700">
                Confirm Password :
                <div className="mt-1">
                  <input
                    name="confirm_password"
                    type="password"
                    value={formValues.confirm_password}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            {errors.confirm_password && (
              <p className="form-error text-red-700">
                {errors.confirm_password}
              </p>
            )}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              {responseData?.ok
                ? "User Registered Successfully ✅"
                : "Register Account"}
            </button>
            <div className="text-red-700">{validationError}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
