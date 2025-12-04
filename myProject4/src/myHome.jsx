import React, { useState, useEffect } from "react";
import Order from "./myOrder";

export default function Home({ orderHistory, setOrderHistory }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("productlist.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 주문 처리 함수 (자식에게 내려줄 콜백)
  const handleOrder = (product, quantity) => {
    const totalPrice = product.가격 * quantity;
    const discount = product.할인; // null일 수도 있음

    const newOrder = {
      이름: product.이름,
      이미지: product.이미지,
      가격: product.가격,
      수량: quantity,
      금액: totalPrice,
      할인정보: discount,
    };
    setOrderHistory((prev) => [...prev, newOrder]); // 배열에 추가[web:115][web:121]
    setSelectedProduct(null); // 주문 후 다시 Home 화면으로
  };

  return (
    <div className="app-container">
      <h1>나의 쇼핑몰에 오신 것을 환영합니다!</h1>
      {!selectedProduct ? (
        <div className="product-grid">
          {products.map((prod, idx) => (
            <div key={idx} className="product-card">
              <img
                className="product-image"
                src={`${prod.이미지}`}
                alt={prod.이름}
              />
              <div
                className="product-name"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedProduct(prod)}
              >
                <b>{prod.이름}</b>
              </div>
              <div className="product-price">
                <b>{prod.가격.toLocaleString()}원</b>
              </div>
              <div className="badge-container">
                {prod.할인 !== null && (
                  <div className="badge sale">{`${prod.할인}%`} 할인</div>
                )}
                {prod.품절 === "품절" && (
                  <div className="badge soldout">품절</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Order
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
}
