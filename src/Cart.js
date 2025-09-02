// src/Cart.js

import React from 'react';

const Cart = ({ cartItems, onRemove, onPurchase, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>{item.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <p>{item.price}원</p>
                  {/* 🛍️ 수량 조절 버튼 추가 */}
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <p>수량: {item.quantity}</p>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>삭제</button>
            </div>
          ))}
          <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
            총 가격: {total}원
          </div>
          <button onClick={onPurchase} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
            전체 상품 구매하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;