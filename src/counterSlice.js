import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter', // slice 이름 (액션 타입 생성에 사용)
  initialState: {
    value: 0, // 초기 상태
  },
  reducers: {
    increment: (state) => {
      // 'increment' 액션이 호출되면 상태를 1 증가
      state.value += 1;
    },
    decrement: (state) => {
      // 'decrement' 액션이 호출되면 상태를 1 감소
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // 'incrementByAmount' 액션과 함께 전달된 값만큼 상태를 증가
      state.value += action.payload;
    },
  },
});

// 리듀서에서 생성된 액션들을 export
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 리듀서 자체를 export
export default counterSlice.reducer;