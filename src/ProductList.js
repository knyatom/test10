import React from 'react';

 const ProductList = ({ products, onProductClick,onDelete }) => {
  return (
    <div>
      <h2>상품 목록</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div
            key={product.id}
            onClick={() => onProductClick(product.id)}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '200px',
              textAlign: 'center',
              position: 'relative' // 삭제 버튼 위치를 위해 추가
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.price}원</p>
              {/* 삭제 버튼 */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // 부모 요소의 onClick 이벤트 방지
                if(window.confirm('정말 삭제하시겠습니까?')) {
                  onDelete(product.id);
                }
              }}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>

  );

};

 

export default ProductList;