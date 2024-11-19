"use client"
import { userLogin } from '@/lib/authSlice'
import { store } from '@/lib/store'
import { Button, Container, Paper, TextField } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function Login() {
  let router = useRouter();
  let dispatch = useDispatch<typeof store.dispatch>();

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(userLogin(values))
        .then((res) => {
          if (res.payload.message == "success") {
            // console.log(res.payload.message);
            localStorage.setItem("userToken", res.payload.token);
          toast.success("Welcome Back :) :)");
          router.push("/")
          }
        else {
          toast.error(res.payload);
          }
        })
        .catch((err) => {
        console.log(err);
      })
    },
  });
  return <>
    <Container maxWidth="sm" sx={{marginBlock:"50px"}}>
      <Paper sx={{padding:"20px"}} elevation={20}>
        <form onSubmit={formik.handleSubmit} style={{display:"flex",gap:"10px",flexDirection:"column"}}>
          <TextField value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='email'
            id="Email" label="Email" variant="outlined" />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='password'
            id="Password" label="Password" variant="outlined" />
          <Button type='submit' sx={{
            backgroundColor: "#1976d2",
            borderRadius: "10px",
            color: "white",
            border: "1px solid transparent",
            ":hover": { border: "1px solid #1976d2", color: "#1976d2" , backgroundColor:"white" }
          }}>Login</Button>
        </form>
      </Paper>
    </Container>
  </>
}
