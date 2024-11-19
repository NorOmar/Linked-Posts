/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { changePassword } from '@/lib/authSlice';
import { store } from '@/lib/store';
import { Button, Container, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function changepassword() {
    let dispatch = useDispatch<typeof store.dispatch>();

    let formik = useFormik({
        initialValues: {
            password: "",
            newPassword:""
        },
        onSubmit: (values) => {
            dispatch(changePassword(values))
                .then((res) => {
                    // log
                toast.success(res.payload.message)
            })
                .catch((err) => {
                toast.error(err.payload.error)
            })
        }
    })
    

    return <>
        <Container maxWidth="sm" sx={{ marginBlock: "50px" }}>
            <Paper sx={{ padding: "20px" }} elevation={20}>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <TextField value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='password'
                        id="Password" label="Password" variant="outlined" />
                    <TextField
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='newPassword'
                        id="NewPassword" label="NewPassword" variant="outlined" />
                    <Button type='submit' sx={{
                        backgroundColor: "#1976d2",
                        borderRadius: "10px",
                        color: "white",
                        border: "1px solid transparent",
                        ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
                    }}>Change</Button>
                </form>
            </Paper>
        </Container>
    </>
}
