import { createAsyncThunk } from '@reduxjs/toolkit';
import { addChiTieu, deleteChiTieu, updateChiTieu, setChiTieu } from '../reducer/chitieuReducer';

const API_URL = 'https://6660354b5425580055b2ca1e.mockapi.io/sanpham';

export const fetchChiTieu = () =>{
    return async dispatch =>{
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            data.forEach(row => {
                dispatch(addChiTieu(row));
            });
        } catch (error) {
            console.error('Lỗi : ' + error)
        }
    }
};

export const deleteChiTieuAPI = createAsyncThunk('chitieu,deleteChiTieuAPI',
    async (id,thunkAPI)=>{
        try {
         // gửi yêu cầu DELETE đến API để xóa 
         const res = await fetch(`${API_URL}/${id}`,{
            method : 'DELETE'
         });
         // log ra res
         if(res.ok){
            // sau khi xóa thành công , trả về id của chitieu đã xóa để cập nhật store 
            // action.payload ở trong reducer sẽ chính là id 
            return id;
         }else{
            const errorData = await res.json();
            return thunkAPI.rejectWithValue(errorData);
         }
        } catch (error) {
         // xử lý lỗi nếu có bất kỳ lỗi nào xảy ra 
         return thunkAPI.rejectWithValue(error)
        }
     }
);

export const addChiTieuAPI = createAsyncThunk(
    'chitieu,addChiTieuAPI',
    async (objChitieu,thunkAPI)=>{
        console.log(objChitieu);
        try {
            // gửi yêu cầu ADD đến API
            const res = await fetch(API_URL,{
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(objChitieu)
            });
            const data = await res.json();
            // kiểm tra 
            if(res.ok){
                return data;
            }else{
                // nếu có lỗi từ phía server , trả về  lỗi 
                const errorData = await res.json();
                return thunkAPI.rejectWithValue(errorData)
            }
        } catch (error) {
            // xử lý nếu có bất kỳ lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const updateChiTieuAPI = createAsyncThunk(
    'chitieu/updateChiTieuAPI',
    async (objUpdate,thunkAPI) =>{
        try {
            const res = await fetch(`${API_URL}/${objUpdate.id}`,{
                method : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(objUpdate.data)
            });
            const data = await res.json();
            // kiểm tra nếu state code là 200 hoặc 204 thì xóa thành công 
            if(res.ok){
                return data;
            }
            else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
              }
            

        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)