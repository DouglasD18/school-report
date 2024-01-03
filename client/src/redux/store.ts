import { configureStore } from '@reduxjs/toolkit';
import notesReducer from "./Notes/Notes.Store";
import addBimestreStore from './AddBimestre/AddBimestre.Store';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    addBimestre: addBimestreStore
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
