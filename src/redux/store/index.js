import { configureStore } from "@reduxjs/toolkit";
import chitieuReducer from "../reducer/chitieuReducer";

export default configureStore({
    reducer: {
        chitieu: chitieuReducer
    }
});
