import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import verifyToken from "../helpers/verify";
import Navbar from "../pages/NavigationBar";

const Protected = () => {
  const navigate = useNavigate();

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
    <div className="flex items-start justify-start">
      <div className="w-[15%]">
        <Navbar />
      </div>
      <div className="w-[85%] py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Protected;
//this page run first time to check if the token hasnt expired by checking users toke verification then it allows to Navbars and other outlets means all nested components .
