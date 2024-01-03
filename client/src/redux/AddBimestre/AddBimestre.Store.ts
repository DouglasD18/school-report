import { AddBimestreNote, Note } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AddBimestreInterface {
  position: number;
  state: boolean
}

export const addBimestreStore = createSlice({
  name: "addBimestre",
  initialState: [
    false,
    false,
    false,
    false
  ] as AddBimestreNote,
  reducers: {
    change: (state, action: PayloadAction<AddBimestreInterface>) => {
      state[action.payload.position] = action.payload.state;
      return state;
    }
  }
})

export const { change } = addBimestreStore.actions;
export default addBimestreStore.reducer
