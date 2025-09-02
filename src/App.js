// src/App.js

import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

// 가상의 상품 데이터
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: '멋진 티셔츠',
    price: 35000,
    description: '100% 면 소재로 제작된 편안한 티셔츠입니다.'
  },
  {
    id: 2,
    name: '세련된 청바지',
    price: 75000,
    description: '스트레치 소재로 활동성이 뛰어난 청바지입니다.'
  },
  {
    id: 3,
    name: '편안한 운동화',
    price: 99000,
    description: '가벼운 무게로 오래 신어도 편안한 운동화입니다.'
  },
];

const App = () => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('상품 이름과 가격을 입력해주세요.');
      return;
    }

    const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const addedProduct = {
      id: newProductId,
      name: newProduct.name,
      price: parseInt(newProduct.price, 10),
      description: newProduct.description
    };

    setProducts([...products, addedProduct]);
    setNewProduct({ name: '', price: '', description: '' });
  };

  const handleDeleteProduct = (productId) => {
    const filteredProducts = products.filter(product => product.id !== productId);
    setProducts(filteredProducts);
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = (updatedProduct) => {
    const updatedProducts = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    setSelectedProductId(updatedProduct.id);
    setEditingProduct(null);
  };

  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
    alert(`${productToAdd.name}이(가) 장바구니에 추가되었습니다.`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const handlePurchase = () => {
    alert('상품을 구매했습니다! 감사합니다.');
    setCart([]);
    setShowCart(false);
  };

  // 🛍️ 장바구니 상품 수량 조절 함수 추가
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      if (window.confirm("상품을 장바구니에서 삭제하시겠습니까?")) {
        handleRemoveFromCart(productId);
      }
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleCartView = () => {
    setShowCart(!showCart);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>My React Shop</h1>
      <button onClick={toggleCartView} style={{ position: 'absolute', top: '20px', right: '20px' }}>
        {showCart ? '상품 목록 보기' : `장바구니 보기 (${cart.reduce((total, item) => total + item.quantity, 0)})`}
      </button>

      {!showCart && (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3>상품 등록</h3>
          <form onSubmit={handleAddProduct}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="상품 이름"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="가격"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <textarea
              placeholder="설명"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <button type="submit">상품 추가</button>
          </form>
        </div>
      )}

      {showCart ? (
        <Cart 
          cartItems={cart} 
          onRemove={handleRemoveFromCart} 
          onPurchase={handlePurchase} 
          onUpdateQuantity={handleUpdateQuantity} // 🛍️ 수량 조절 함수 전달
        />
      ) : (
        selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToList}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            onSave={handleSaveProduct}
            isEditing={editingProduct && editingProduct.id === selectedProduct.id}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <ProductList
            products={products}
            onProductClick={handleProductClick}
            onDelete={handleDeleteProduct}
          />
        )
      )}
    </div>
  );
};

export default App;