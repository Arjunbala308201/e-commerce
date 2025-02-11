import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{},
    reducers:{
        setUser(state,action){
            return action.payload
        },
        clearStore(){
            return false;
        }
    }
})
export const {setUser,clearStore} = userSlice.actions
export default userSlice.reducer