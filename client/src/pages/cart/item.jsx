import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppName } from "../../config/variable";
import Book from "../../components/Book"
import { toast } from "react-toastify";

function CartItem(props) {
    const [book, setBook] = useState(undefined);
    const [visible, setVisible] = useState(true);

    const cartItem = props.cartItem

    const handleDelete = async (event) => {
        try {
            const data = await axios({
                method: "DELETE",
                url: "/cartItems",
                data: { id: cartItem.id },
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
                },
            });
            if (data.data) {
                toast.success("Da xoa", { position: "bottom-right", theme: "colored" });
                setVisible(false)
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    return (
        <div>
            {visible && 
            <div className="container flex-wrap">
                <div style={{ 'margin-top': '70px'}}>
                    <div className="card-body">
                        <Book book={async () => await axios.post("/getBook", { id: cartItem.bookID })}/>
                    </div>
                    <div>ID: {cartItem.id}</div>
                    <div>Quantity: {cartItem.quantity}</div>
                    <button className="btn btn-danger" onClick={ handleDelete }>Delete</button>
                </div>
            </div>
            }
        </div>
    );
}

export default CartItem;
