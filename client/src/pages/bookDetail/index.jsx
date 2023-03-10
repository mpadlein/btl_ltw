import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import axios from "axios";
import { AppName } from "../../config/variable";
import { AiTwotoneStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function BookDetail() {
  const { id } = useParams();

  //   console.log(id);
  const [commnet, setComment] = useState(undefined);
  const [rating, setRating] = useState(5)
  const [book, setBook] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getComment = async () => {
      const data = await axios.post("/getAllComment", { id: id });
      // console.log(data.data);
      setComment(data.data);
    };
    const getBook = async () => {
      // console.log(id);
      const data = await axios.post("/getBook", { id: id });
      setBook(data.data);
    };
    getComment();
    getBook();
    const stars = document.querySelectorAll(".star");
    console.log(stars);
  }, []);
  const AddToCart = async () => {
    try {
      // console.log(id);
      const data = await axios({
        method: "POST",
        url: "/addToCart",
        data: { id, quantity },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
        },
      });
      if (data.data) {
        toast.success("Them san pham thanh cong", { position: "bottom-right", theme: "colored" });
      }
    } catch (error) {}
    };

    const handleReview = async () => {
      try {
        // console.log(id);
        const data = await axios({
          method: "POST",
          url: "/review",
          data: { 
            id, 
            rating, 
            comment: document.getElementById('comment').value 
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem(AppName)).accessToken}`,
          },
        });
        if (data.data) {
          toast.success("Da gui danh gia", { position: "bottom-right", theme: "colored" });
        }
      } catch (error) {}
      };

  return (
    <>
      {book && (
        <div>
          <Header />
          <div className="container" style={{ marginTop: "100px" }}>
            <div className="d-flex ">
              <img src={book.image} alt="" style={{ width: "300px", height: "450px" }} />
              <div className="ml-4">
                <h4>{book.title}</h4>
                <h5 className="d-flex ml-3">{book.price}??</h5>
                <div>
                  <div className="d-flex"> S??? l?????ng</div>
                  <div className="d-flex">
                    <div className="btn btn-outline-info">-</div>
                    <input
                      type="text"
                      style={{ width: "80px" }}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      value={quantity}
                    />
                    <div className="btn btn-outline-info">+</div>
                  </div>
                </div>
                <button className="btn btn-outline-success mt-3 px-5" onClick={AddToCart}>
                  Dat mua
                </button>
              </div>
              <div style={{ marginLeft: "100px" }}>
                <h5>Th??ng tin c???a s??ch</h5>
                <div>{book.description}</div>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: "80px" }}>
            <div className="form-outline mb-4">
              <h4 className="float-left">
                Nh???n x??t: 
                {Array.from({ length: 5 }).map((it, i) => {
                  if (i < rating) {
                    return <AiTwotoneStar 
                    className="star" 
                    style={{color: '#b2a900'}} 
                    onClick={() => {setRating(i+1)}}
                    />
                  }
                  return <AiTwotoneStar className="star" onClick={() => {setRating(i+1)}}/>
                })}
              </h4>

              <textarea type="date" id="comment" className="form-control form-control-lg" name="description" placeholder="Nh???n x??t" rows="4" cols="50" required></textarea>
              <div className="btn btn-outline-success" onClick={handleReview}>G???i nh???n x??t</div>
            </div>
            <div>
              {commnet.map((item) => (
                <div key={item.id}>123</div>
              ))}
            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>
      )}
    </>
  );
}

export default BookDetail;
