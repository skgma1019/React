import { useState } from "react";

export default function Cart({ orderHistory, onChangeQty, onRemove }) {
  return (
    <div className="cart-container">
      <h1>장바구니</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>id</th>
            <th>상품이미지</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                장바구니가 비어 있습니다.
              </td>
            </tr>
          ) : (
            orderHistory.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={`${item.이미지 || ""}`}
                    alt={item.이름}
                    className="cart-image"
                  />
                </td>
                <td>{item.이름}</td>
                <td>{item.수량}</td>
                {console.log(item.할인)}
                <td>
                  <button
                    className="qty-btn plus"
                    onClick={() => onChangeQty(idx, item.수량 + 1)}
                  >
                    +
                  </button>
                  <button
                    className="qty-btn minus"
                    onClick={() =>
                      item.수량 > 1 && onChangeQty(idx, item.수량 - 1)
                    }
                  >
                    -
                  </button>
                  <button className="delete-btn" onClick={() => onRemove(idx)}>
                    상품삭제
                  </button>
                </td>
                {item.할인정보 === null ? (
                  <td>{item.가격 * item.수량.toLocaleString()}원</td>
                ) : (
                  <td>
                    {item.가격 *
                      item.수량 *
                      ((100 - item.할인정보) / 100).toLocaleString()}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
