/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Posts from '@/app/_Component/posts/posts';
import Loading from '@/app/loading';
import { getPost } from '@/lib/postsslice';
import { store } from '@/lib/store';
import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function page(props: string) {
    let dispatch = useDispatch<typeof store.dispatch>();
    let { singlePost } = useSelector((state: ReturnType<typeof store.getState>) => state.posts);
    // console.log("Props", props.params.id);
    
    useEffect(() => {
        dispatch(getPost(props.params.id))
    },[])
    
    return singlePost ? <Box sx={{ width: "50%", mx: "auto" }}>
        <Posts post={singlePost} allComment={true} /> </Box>
        : <Loading />
}
