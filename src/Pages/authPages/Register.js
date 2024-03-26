import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "./auth.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userdata, Setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  /* handle change */

  const HandleChange = async (e) => {
    Setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  /* handel submit */
  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/register", {
        ...userdata,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
      console.log(userdata);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="register" style={{ margin: "0px !important" }}>
          <form onSubmit={HandleSubmit} className="mt-2 mb-2  ">
            <h5 className="text-center m-0 ">Register</h5>
            <div className="">
              <label> Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your Name"
                onChange={HandleChange}
                required
              />
            </div>
            <div className="">
              <label> Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                placeholder="Enter your Email"
                onChange={HandleChange}
                required
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
                onChange={HandleChange}
                required
              />
            </div>
            <div className="">
              <label> Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your Phone"
                onChange={HandleChange}
                required
              />
            </div>
            <div className="">
              <label> Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Enter your Answer"
                onChange={HandleChange}
                required
              />
            </div>
            <div className="">
              <label> Answer</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="answer"
                placeholder=" What is Your Favoriate COlor ? "
                onChange={HandleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-control mt-2">
              Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
