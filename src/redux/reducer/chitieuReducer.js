import { createSlice } from '@reduxjs/toolkit';
import { addChiTieuAPI, deleteChiTieuAPI, updateChiTieuAPI } from '../Action/Action';

const initialState = {
    listChitieu: [],
    searchResults: [],  // Thêm thuộc tính này
};

const chitieuSlice = createSlice({
    name: 'chitieu',
    initialState,
    reducers: {
        setChiTieu(state, action) {
            state.listChitieu = action.payload;
        },
        addChiTieu(state, action) {
            state.listChitieu.push(action.payload);
        },
        deleteChiTieu(state, action) {
            state.listChitieu = state.listChitieu.filter(item => item.id !== action.payload);
        },
        updateChiTieu(state, action) {
            const index = state.listChitieu.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.listChitieu[index] = action.payload;
            }
        },
        searchChiTieu(state, action) {
            state.searchResults = state.listChitieu.filter(item => item.title.includes(action.payload));
        },
    },
    extraReducers: builder => {
        // Xử lý khi API xóa thành công
        builder.addCase(deleteChiTieuAPI.fulfilled, (state, action) => {
            state.listChitieu = state.listChitieu.filter(row => row.id !== action.payload);
        })
        .addCase(deleteChiTieuAPI.rejected, (state, action) => {
            console.log('Xóa không thành công', action.error.message);
        });

        // Xử lý khi API thêm thành công
        builder.addCase(addChiTieuAPI.fulfilled, (state, action) => {
            state.listChitieu.push(action.payload);
        })
        .addCase(addChiTieuAPI.rejected, (state, action) => {
            console.log('Thêm không thành công', action.error.message);
        });

        // Xử lý khi API cập nhật thành công
        builder.addCase(updateChiTieuAPI.fulfilled, (state, action) => {
            const { id, title, description, date, type, amount } = action.payload;
            const chitieu = state.listChitieu.find(row => row.id === id);
            if (chitieu) {
                Object.assign(chitieu, { title, description, date, type, amount });
            }
        })
        .addCase(updateChiTieuAPI.rejected, (state, action) => {
            console.log('Sửa thất bại', action.error.message);
        });
    },
});

export const { setChiTieu, addChiTieu, deleteChiTieu, updateChiTieu, searchChiTieu } = chitieuSlice.actions;

export const selectListChitieu = (state) => state.chitieu.listChitieu;

export const selectTotalThu = (state) =>
    state.chitieu.listChitieu.filter(item => item.type === 'thu').reduce((total, item) => total + item.amount, 0);

export const selectTotalChi = (state) =>
    state.chitieu.listChitieu.filter(item => item.type === 'chi').reduce((total, item) => total + item.amount, 0);

export default chitieuSlice.reducer;
