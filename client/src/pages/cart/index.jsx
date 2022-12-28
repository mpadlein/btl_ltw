import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { AppName } from "../../config/variable";
import CartItem from "./item"
import { ToastContainer, toast } from "react-toastify";

function Cart() {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([])

  const getCartItems = async () => {
    const data = await axios({
      method: "GET",
      url: "/cartItems",
      // data: { id, quantity },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
      },
    });
    setCartItems(data.data);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <Header />
        <div className="container"></div>

        <div className="cart">
            {cartItems.map(item => {
              return <CartItem cartItem={item} />
            })}
        </div>

        <ToastContainer />
      <Footer />
    </div>
  );
}

export default Cart;
