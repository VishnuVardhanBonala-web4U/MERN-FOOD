import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./auth.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [userdata, Setuserdata] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    Setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", {
        ...userdata,
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res && res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="register" style={{ margin: "0px !important" }}>
          <form onSubmit={HandleSubmit}>
            <h5 className="text-center m-0 ">Login</h5>

            <div className="">
              <label> Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                placeholder="Enter your Email"
                required
                onChange={HandleChange}
              />
            </div>
            <div className="">
              <label> Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your Password"
                required
                onChange={HandleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary form-control mt-2">
              Login
            </button>
            <Link className="btn btn-dark form-control mt-2 " to="/forget-pass">
              Forget Password
            </Link>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
