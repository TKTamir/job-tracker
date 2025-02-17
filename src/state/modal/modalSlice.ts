import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalTypes} from "../../components/NavBar/Interfaces.ts";
import {IJobItem} from "../../components/JobItem/Interfaces.ts";

export interface ModalState {
  isModalOpen: boolean;
  modalType: ModalTypes
  modalProps?: IJobItem["id"];
}

type OpenModalPayload = {
  modalType: ModalState['modalType'];
  modalProps?: ModalState['modalProps'];
};


const initialState: ModalState = {
  isModalOpen: false,
  modalType: null,
  modalProps: undefined,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isModalOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalProps = undefined;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;