import { PpostType } from "@/app/_interface/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let initialState: {
    Allposts: PpostType[] | null,
    singlePost: PpostType | null
} = {
    Allposts: null,
    singlePost:null
};

export let createPost = createAsyncThunk("postsSlice/createPost", (data: FormData ) =>{
    return axios.post(`https://linked-posts.routemisr.com/posts`, data, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
        .then((res) => {
            console.log(res);
            return res
        })
        .catch((err) => {
            console.log(err);
            return err
    })
})

export let userPosts = createAsyncThunk("postsSlice/userPosts", (id:any) => {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=5`, {
        headers: {
            token:localStorage.getItem("userToken")
        }
    })
        .then((res) => {
            console.log(res);
            return res
        })
        .catch((err) => {
            console.log(err);
            return err
        
    })
})

export let getAllPosts = createAsyncThunk(
    "postsSlice/getAllPosts",
    async (limit?:number) => {
    return await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit || 25}`, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
    .then((res) => res)
    .catch((err) => err)
    });

export let getPost = createAsyncThunk(
    "postsSlice/getPost",
    async (id:string) => {
        return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
            .then((res) => res)
            .catch((err) => err)
    });

export let createComment = createAsyncThunk("postsSlice/createComment", (data: {
    content: string,
    post:string
}) => {
    return axios.post(`https://linked-posts.routemisr.com/comments`, data, {
        headers: {
            token:localStorage.getItem("userToken")
        }
    })
        .then((res) => res)
        .catch((err) => err)
})

export let deleteComment = createAsyncThunk("postsSlice/deleteComment", (id:string) => {
    return axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    })
        .then((res) => {
            console.log(res);
            return res
        })
        .catch((err) => {
            console.log(err);
            return err
    })
})

    
let postsSlice = createSlice({
    name: "postsSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.fulfilled, (state,action) => {
            console.log("action", action.payload.data.posts);
            state.Allposts = action.payload.data.posts;
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            console.log("action", action.payload.data.post);
            state.singlePost = action.payload.data.post;
        })
    },
    reducers:{}
})
export let postsreducer=postsSlice.reducer