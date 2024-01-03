import { Note } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const noteStore = createSlice({
  name: "notes",
  initialState: [] as Note[],
  reducers: {
    init: (_state, action: PayloadAction<Note[]>) => action.payload,
    add: (state, action: PayloadAction<Note>) => {
      state.push(action.payload)
      return state;
    },
    remove: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload);
    }
  }
})

export const { init, add, remove } = noteStore.actions;
export default noteStore.reducer
