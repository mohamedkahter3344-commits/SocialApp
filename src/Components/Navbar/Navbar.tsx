import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/TokenContext/TokenContext";

const Navbar = () => {
  const { userToken, isAuthnticated,logOutContext } = useContext(tokenContext);
  const navigate = useNavigate()
  function logOut() {
    logOutContext();
    navigate("/login")
  }
  return (
    <nav className=" py-5  my-3 bg-white shadow-xl  mx-auto ">
      <ul className="w-3/4 mx-auto flex justify-center items-center ">
        <li>
          {isAuthnticated && userToken ? (
            <>
            <NavLink
              className={({ isActive }) =>
                `mx-3 font-extrabold ${
                  isActive
                    ? "text-white bg-red-700 p-2 rounded"
                    : "text-slate-500"
                }`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `mx-3 font-extrabold ${
                  isActive
                    ? "text-white bg-red-700 p-2 rounded"
                    : "text-slate-500"
                }`
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
            onClick={logOut}
              className={({ isActive }) =>
                `mx-3 font-extrabold ${
                  isActive
                    ? "text-white bg-red-700 p-2 rounded"
                    : "text-slate-500"
                }`
              }
              to="/login"
            >
              LogOut
            </NavLink>
            </>
          ) : (
            <>
              <NavLink

                className={({ isActive }) =>
                  `mx-3 font-extrabold ${
                    isActive
                      ? "text-white bg-red-700 p-2 rounded"
                      : "text-slate-500"
                  }`
                }
                to="/login"
              >
                Login
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `mx-3 font-extrabold ${
                    isActive
                      ? "text-white bg-red-700 p-2 rounded"
                      : "text-slate-500"
                  }`
                }
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
