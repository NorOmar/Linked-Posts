"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Grid  from "@mui/material/Grid";
import Posts from "./_Component/posts/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createPost, getAllPosts } from "@/lib/postsslice";
import { store } from "@/lib/store";
import { PpostType } from "./_interface/home";
import Loading from "./loading";
import { useFormik } from "formik";
import { Button, Container, Paper, TextField } from "@mui/material";
import toast from "react-hot-toast";


export default function Home() {
  let dispatch = useDispatch<typeof store.dispatch>();
  let { Allposts } = useSelector((state: ReturnType<typeof store.getState>) => state.posts);

  
  const handleFileChange = (event: any) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
    // console.log(event.currentTarget.files[0]);

  };

  let formik = useFormik({
    initialValues: {
      body: "",
      image:null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('image', values.image); // Append the file

      try {
        const response = await dispatch(createPost(formData)).unwrap();
        console.log("Result:", response);
        toast.success(response.data.message)
        // route.push('/');
      } catch (error) {
        console.log("Error:", error);
        // toast.error(error.payload.error)
      }
    }
  })

  useEffect(() => {
    dispatch(getAllPosts());
    
  },[])
  return (
    <>
      {Allposts ? <Grid container spacing={3} sx={{ marginBlock: "30px" }}>
        <Grid item sm={3}></Grid>
        <Grid item sm={6}>
          <Container maxWidth="md">
            <Paper sx={{ padding: "20px" }} elevation={20}>
              <form onSubmit={formik.handleSubmit} style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <TextField
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.body}
                  name="body"
                  placeholder="Write Body Post"
                />
                <label className='file-upload1'>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  <span className="icon">📁</span>
                  <span className="text">Upload Photo</span>
                </label>

                <Button type='submit' sx={{
                  marginBlock: '10px',
                  width: '20%',
                  backgroundColor: "#1976d2",
                  borderRadius: "10px",
                  color: "white",
                  border: "1px solid transparent",
                  ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
                }}>Done</Button>
              </form>
            </Paper>
            </Container>
          {Allposts?.map((post: PpostType) => <Posts key={post._id} post={post} />)}
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid> : <Loading />}
      
    </>
  );
}
