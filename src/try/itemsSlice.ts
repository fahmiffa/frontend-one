import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemState {
  items: string[];
}

const initialState: ItemState = {
  items: ["new"],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
