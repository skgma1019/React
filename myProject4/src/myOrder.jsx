import React, { useState } from "react";

export default function Order(props) {
  const { product, onBack, onOrder } = props;
  const [quantity, setQuantity] = useState(1); // 주문 수량

  return (
    <>
      {product.이미지 !== "yeomgi.jpg" ? (
        <div className="detail-page">
          {/* <div className="detail-banner">
                <img src={'banner.png'} alt="banner" />
            </div> */}
          <div className="detail-content">
            {/* 왼쪽: 상품 사진 */}
            <div className="detail-image-wrap">
              <img src={`${product.이미지}`} alt={product.이름} />
            </div>

            {/* 오른쪽: 상품 정보 */}
            <div className="detail-right">
              <div className="detail-info">
                <h2>{product.이름}</h2>
                <p className="detail-price">
                  {product.가격.toLocaleString()}원
                </p>
                <p>주문 수량: {quantity}개</p>
              </div>
              <div className="detail-buttons">
                <label>
                  수량:
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="quantity"
                  />
                </label>
                <button
                  className="btn order"
                  onClick={() => onOrder(product, quantity)}
                >
                  주문하기
                </button>

                <button className="btn cancel" onClick={onBack}>
                  취소하기
                </button>
              </div>
              <p className="order-amount">
                주문금액 :{" "}
                {product.할인 == null
                  ? product.가격 * quantity.toLocaleString()
                  : (
                      (product.가격 * quantity * (100 - product.할인)) /
                      100
                    ).toLocaleString()}
                원
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>염기를 구매해주셔서 갑사합니노</h1>
          <img src="yeomgi.jpg" alt="" />
        </div>
      )}
    </>
  );
}
