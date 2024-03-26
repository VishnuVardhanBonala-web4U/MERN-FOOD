import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";

import toast from "react-hot-toast";
import { useCart } from "../Context/cart";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, Setcategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-category");

      if (data?.success) {
        Setcategories(data?.category);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:4000/getall-product`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/filter-product",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {}
  };
  return (
    <>
      <Layout title="ALl Products - Best offers ">
        <h4 className="text-center text-muted ">Welcome to Homepage</h4>
        <div className="container-fluid row mt-3 home-page">
          {/* fiters */}
          <div className="col-md-3  filters">
            <h4 className="text-default">filter Product</h4>
            <h4 className="text">Filter By Category</h4>
            <div className="d-flex shadow rounded-1 flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className=" m-1"
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text- mt-4">Filter By Price</h4>
            <div className="d-flex flex-column shadow rounded">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array} className=" m-1">
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>

          {/* products */}

          <div className="col-md-9  ">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card shadow m-2 mb-3 shadow"
                  style={{ width: "15rem" }}
                >
                  <img
                    src={`http://localhost:4000/get-photo/${p._id}`}
                    className="card-img-top vh-25"
                    style={{ height: "15rem" }}
                    alt={p.name}
                  />

                  <div className="card-body ">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <div className="d-flex justify-content-around">
                      <p className="card-text ">$ {p.price}</p>
                      <p className="card-text ">RS {p.price * 83}</p>
                    </div>
                    <div className="d-flex flex-column ">
                      <button
                        className="btn btn-info m-1 "
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>

                      <button
                        className="btn btn-secondary m-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
