import { configureStore } from "@reduxjs/toolkit";
import { authRender } from "./authSlice";
import { postsreducer } from "./postsslice";


export let store = configureStore({
    reducer: {
        auth: authRender,
        posts: postsreducer
    },
});