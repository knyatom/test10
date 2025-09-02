import React from 'react';

function Home({ onLogout }) {
  return (
    <div>
      <h2>로그인에 성공했습니다!</h2>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  );
}

export default Home;