import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import verifyToken from "../helpers/verify";

const Login = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    response: {},
    result: {},
  });
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (!response.ok) {
        const result = await response.json();

        setStatus({
          ...status,
          response: response,
          result: result,
        });
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result.token);
      const token = result.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log("Error Sending Data", error.message);
    }
  };
  useEffect(() => {
    verifyToken().then((res) => {
      if (res) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-indigo-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="rounded-full overflow-hidden w-1/2 mx-auto"></div>
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Login Page
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium leading-6 text-red-900"
            >
              Email address :
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 p-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-lg font-medium leading-6 text-red-900"
              >
                Password :
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-red-700 text-lg"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={details.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 p-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-lg sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-700 p-4 text-lg font-semibold leading-6 text-white  hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-red-500 text-lg mt-3">
          {!status.response.ok && status.result.msg}
        </div>

        <p className="mt-10 text-center text-lg text-gray-500">
          Not registered?
          <Link
            to="/registration"
            className="font-semibold leading-6 text-red-700 hover:text-red-800 ml-4 z-50"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
