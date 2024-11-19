/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

let initialState:
    {
        userToken: null | string,
        userData: null | any,
        isLoading: boolean | string,
        isError: boolean | string 
    } =
{
    userToken: null,
    userData: null,
    isLoading: false,
    isError:false
};


export let userLogin = createAsyncThunk("authSlice/userLogin", 
    async (formData: {
        email: string,
        password: string
    }) => {
    return await axios
    .post(`https://linked-posts.routemisr.com/users/signin`, formData)
        .then((res) => {
            console.log(res.data.token);
            return res.data
        })
        .catch((err) => {
            console.log(err.response.data.error);
            return err.response.data.error
    })
})

export let userRegister = createAsyncThunk("authSlice/userRegister", (Data: {
    name: string,
    email:string,
    password: string,
    rePassword: string,
    dateOfBirth: string,
    gender:string
}) => {
    return axios.post(`https://linked-posts.routemisr.com/users/signup`, Data)
        .then((res) => {
            console.log(res);
            return res.data
    })
        .catch((err) => {
            console.log(err);
            return err.response.data
        })
})

export let profileData = createAsyncThunk("authSlice/profileData", () => {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
        .then((res) => {
            console.log(res)
            return res.data
        })
        .catch((err) => {
            console.log(err.message)
            return err.message
        })
})

export let changePassword = createAsyncThunk("authSlice/changePassword", (data: {
    password: string,
    newPassword:string
}) => {
    return axios.patch(`https://linked-posts.routemisr.com/users/change-password`, data, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
        .then((res) => {
        console.log(res);
        return res.data
        })
        .catch((err) => {
        console.log(err);
            return err.response.data
    })
}) 

export let uploadProfile = createAsyncThunk("authSlice/uploadProfile", (data: FormData) => {
    return axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            token:localStorage.getItem("userToken")
        }
    })
        .then((res) => {
            console.log(res);
            return res.data
        })
        .catch((err) => {
            console.log(err);
            return err.response.data
    })
})

let authSlice=createSlice({
    name: "authSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled,(state , action)=> {
            state.userToken = action.payload;
            state.isLoading = false;
        })
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isError = action.payload;
            state.isLoading = false;
        })
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.userToken = action.payload;
            state.isLoading = false;
        })
        builder.addCase(userRegister.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.isError = action.payload;
            state.isLoading = false;
        })
    },
    reducers: {
        cleanData: function (state, action) {
            state.userData = null;
            state.userToken = null;
        }
    }
})

export let authRender = authSlice.reducer;
export let { cleanData } = authSlice.actions;
