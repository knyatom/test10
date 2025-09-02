// src/ProductDetail.js
import React from 'react';

const ProductDetail = ({ product, onBack, onDelete, onEdit, onSave, isEditing, editingProduct, setEditingProduct, onAddToCart }) => {
  if (!product) {
    return <div>상품을 선택해주세요.</div>;
  }
  
  if (isEditing) {
    return (
      <div>
        <h2>상품 수정</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave(editingProduct);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
            상품 이름:
            <input 
              type="text" 
              value={editingProduct.name} 
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} 
            />
          </label>
          <label>
            가격:
            <input 
              type="number" 
              value={editingProduct.price} 
              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value, 10) })} 
            />
          </label>
          <label>
            설명:
            <textarea 
              value={editingProduct.description} 
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} 
            />
          </label>
          <div style={{ marginTop: '10px' }}>
            <button type="submit" style={{ marginRight: '10px' }}>저장</button>
            <button type="button" onClick={() => setEditingProduct(null)}>취소</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack}>목록으로 돌아가기</button>
        <div>
          <button 
            onClick={() => onEdit(product)}
            style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
          >
            상품 수정
          </button>
          <button 
            onClick={() => {
              if (window.confirm('정말 삭제하시겠습니까?')) {
                onDelete(product.id);
              }
            }}
            style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
          >
            상품 삭제
          </button>
        </div>
      </div>
      <h2>{product.name}</h2>
      <p><strong>가격:</strong> {product.price}원</p>
      <p><strong>설명:</strong> {product.description}</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => onAddToCart(product)}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
        >
          장바구니에 담기
        </button>
        <button 
          onClick={() => {
            if (window.confirm('바로 구매하시겠습니까?')) {
              alert('구매가 완료되었습니다! 🛍️');
            }
          }}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          바로 구매
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;