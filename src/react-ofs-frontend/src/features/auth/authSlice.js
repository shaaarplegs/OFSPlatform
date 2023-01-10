
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FreelancerRegister, ServiceSeekerRegister } from './authAPI';
import jwt_decode from "jwt-decode";

const initialState = {
  isLoggedIn:false,
  userData:{},
}

export const ConfirmFreelancerRegisterationThunk = createAsyncThunk("auth/ConfirmFreelancerRegisterationThunk", async (user) => {
  const response = FreelancerRegister(user).then(
    (res) => res.data
  )
  return response;
})

export const ConfirmServiceSeekerRegistrationThunk = createAsyncThunk("auth/ConfirmServiceSeekerRegistrationThunk", async (user) => {
  const response = ServiceSeekerRegister(user).then(
    (res) => res.data
  )
  return response;
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn=false;
      state.userData = {};
    },
    login: (state,action) => {
      state.isLoggedIn = true;
      console.log(action)
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(ConfirmFreelancerRegisterationThunk.fulfilled, (state) => {
      
    })
    .addCase(ConfirmServiceSeekerRegistrationThunk.fulfilled, (state) => {
      
    })
  }
})

export const getToken = () => {
  const token = window.location.href.split("#id_token=")[1].split("&")[0]
  return token
}


export const ParseTokenInfo = (token) => {
  if (token !== "") {
    var decoded = jwt_decode(token);
    console.log(token)
    console.log(decoded)  
    return decoded
  }
  else 
  {
    return "No token yet"
  }
}

export const UrlHasToken = (token) => {
  if (window.location.href.split("id_token=").length > 1) {
    return true
  }
  else 
  {
    return false
  }
}


export const { logoutUser, login } = authSlice.actions

export default authSlice.reducer