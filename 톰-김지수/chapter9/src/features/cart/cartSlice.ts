import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lp } from "../../types/cart";
import cartItemsData from "../../data/cartItems";

interface CartState {
  items: Lp[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  items: cartItemsData,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 수량 증가
    increase: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    // 수량 감소
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount -= 1;
        // 수량이 1 미만이 되면 자동으로 제거
        if (item.amount < 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    // 아이템 제거
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // 장바구니 전체 삭제
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.total = 0;
    },
    // 전체 합계 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.items.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
