import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLoginUser } from '../../actions/userAction';

const initialState = {
  isLoading: false,
  isError:false,
  isSuccess:false,
  user:null,
  errorMessage:""
}

export const addLoginUserData = createAsyncThunk(
    'user/getLoginUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getLoginUser();
            //console.log("response2", response);
            return response.data;
        } catch (error) {
          console.log(error);
          return rejectWithValue(error.response.data);
        }
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.user = null;
        state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addLoginUserData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.user = null;
        state.errorMessage = "";
    });
    builder.addCase(addLoginUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = true;
    });
    builder.addCase(addLoginUserData.rejected, (state, action) => {
        //console.log("action", action);
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
    });
  },

});

export const { logout } = userSlice.actions;

export default userSlice.reducer