import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    listChitieu: []
};

const chitieuSlice = createSlice({
    name: 'chitieu',
    initialState,
    reducers: {
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
    }
});

// Selector để lấy danh sách chi tiêu
const selectListChitieu = (state) => state.chitieu.listChitieu;

// Selector memoized để tính tổng thu
const selectTotalThu = createSelector(
    [selectListChitieu],
    (listChitieu) => listChitieu.filter(item => item.type === 'thu').reduce((total, item) => total + item.amount, 0)
);

// Selector memoized để tính tổng chi
const selectTotalChi = createSelector(
    [selectListChitieu],
    (listChitieu) => listChitieu.filter(item => item.type === 'chi').reduce((total, item) => total + item.amount, 0)
);

export const { addChiTieu, deleteChiTieu, updateChiTieu, searchChiTieu } = chitieuSlice.actions;
export { selectTotalThu, selectTotalChi };
export default chitieuSlice.reducer;
