import {createSlice} from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
}

const initialState: ModalState = {
  isModalOpen: false,
  modalContent: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalContent = null;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;