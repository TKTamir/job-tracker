import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalTypes} from "../../components/NavBar/Interfaces.ts";

export interface ModalState {
  isModalOpen: boolean;
  modalType: ModalTypes;
}

const initialState: ModalState = {
  isModalOpen: false,
  modalType: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState["modalType"]>) => {
      state.isModalOpen = true;
      state.modalType = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalType = null;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;