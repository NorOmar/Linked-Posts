/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { userRegister } from '@/lib/authSlice';
import { store } from '@/lib/store';
import { Button, Container, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'



export default function page() {
    let dispatch = useDispatch<typeof store.dispatch>();
    let router = useRouter();
    
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender:""
        },
        onSubmit: (val) => {
            console.log(val);
            dispatch(userRegister(val))
                .then((res) => {
                    console.log(res.payload.message);
                    if (res.payload.message == 'success') {
                        toast.success(`${res.payload.message} Login Now..`);
                        router.push('/login')
                    }
                    else {
                        // console.log("EEERORR :",res.payload);
                        toast.error(res.payload.error);
                }
            })
                .catch((err) => {
            console.log(err);
            })
        }
    })
    
    return <>
        <Container maxWidth="sm" sx={{ marginBlock: "50px" }}>
            <Paper sx={{ padding: "20px" }} elevation={20}>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <TextField
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='name'
                        type='text'
                        id="Name" label="Name" variant="outlined" />
                    <TextField value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='email'
                        type='email'
                        id="Email" label="Email" variant="outlined" />
                    <TextField
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='password'
                        type='password'
                        id="Password" label="Password" variant="outlined" />
                    <TextField
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='rePassword'
                        type='password'
                        id="RePassword" label="RePassword" variant="outlined" />
                    <TextField
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='dateOfBirth'
                        type='text'
                        placeholder='DD/MM/YY'
                        id="dateOfBirth" label="DateOfBirth" variant="outlined" />
                    {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
                    <Select
                        id="gender"
                        value={formik.values.gender}
                        label="Gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='gender'
                    >
                        <MenuItem value={"male"} selected>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                    <Button type='submit' sx={{
                        backgroundColor: "#1976d2",
                        borderRadius: "10px",
                        color: "white",
                        border: "1px solid transparent",
                        ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
                    }}>Register</Button>
                </form>
            </Paper>
        </Container>
    </>
}
