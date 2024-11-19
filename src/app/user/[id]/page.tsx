import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}


// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react-hooks/rules-of-hooks */
// 'use client'
// import changepassword from '@/app/changepassword/page';
// import Loading from '@/app/loading';
// import { profileData, uploadProfile } from '@/lib/authSlice';
// import { store } from '@/lib/store';
// import { Button, Grid, TextField, Typography } from '@mui/material';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import ShortcutIcon from '@mui/icons-material/Shortcut';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';

// export default function profile() {
//     const [User, setUser] = useState([]);
//     let dispatch = useDispatch<typeof store.dispatch>();
//     let route = useRouter();
    

//     let formik = useFormik({
//         initialValues: {
//             photo:null,
//         },
//         onSubmit: async (values) => {
//             const formData = new FormData();
//             formData.append('photo', values.photo); // Append the file

//             try {
//                 const response = await dispatch(uploadProfile(formData)).unwrap();
//                 console.log("Response Photo:", response);
//                 toast.success(response.message)
//                 route.push('/');
//             } catch (error) {
//                 console.log("Error Photo:", error);
//                 toast.error(error.payload.error)
//             }
//         }
//         // onSubmit: (values) => {
//         //     dispatch(uploadProfile(values))
//         //         .then((res) => {
//         //         console.log("Res Photo :",res);
//         //         })
//         //         .catch((err) => {
//         //         console.log("err photo",err);
//         //     })
//         // }
//     })

//     const handleFileChange = (event:any) => {
//         formik.setFieldValue('photo', event.currentTarget.files[0]);
//         // console.log(event.currentTarget.files[0]);

//     };
    

//     useEffect(() => {
//         dispatch(profileData())
//             .then((res) => {
//                 console.log(res.payload.user)
//                 setUser(res.payload.user)
//             })
//             .catch((err) => {
//                 console.log(err);
//                 toast.error(err.payload.message);
            
//         })

//     },[])
//     return <>
//         {User ? <>
//             <Grid container spacing={3} gap={'5px'}
//                 sx={{ marginBlock: "80px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <Grid item sm={5} sx={{ borderLeft: "3px solid #eee" }}>
//                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                         <img src={User.photo} alt={User.name}
//                             style={{ border: '1px solid #ddd', borderRadius: '10px' }} />
//                     </div>
//                     <form style={{ marginBlock: '10px' }} onSubmit={formik.handleSubmit}>
//                         <label className='file-upload'>
//                             <input
//                                 type="file"
//                                 name="photo"
//                                 onChange={handleFileChange}
//                                 accept="image/*"
//                                 required
//                             />
//                             <span className="icon">📁</span>
//                             <span className="text">Upload Photo</span>
//                         </label>
                        
//                         <Button type='submit' sx={{
//                             marginBlock:'10px',
//                             width: '50%',
//                             backgroundColor: "#1976d2",
//                             borderRadius: "10px",
//                             color: "white",
//                             border: "1px solid transparent",
//                             ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
//                         }}>Done</Button>
//                     </form>
//                 </Grid>
//                 <Grid item sm={5} sx={{ borderRight: "3px solid #eee" }}>
//                     <Typography component={"p"} variant='h5'
//                         sx={{ fontWeight: 'semibold', marginBlock: '5px' }}>
//                         Name: <span
//                             style={{
//                                 display: "block", color: "darkgray",
//                                 fontSize: '17px', fontWeight: 'normal'
//                             }}>{User.name}</span>
//                     </Typography>
//                     <Typography component={"p"} variant='h5'
//                         sx={{ fontWeight: 'semibold', marginBlock: '5px' }}>
//                         Email: <span style={{
//                             display: "block", color: "darkgray",
//                             fontSize: '17px', fontWeight: 'normal'
//                         }}>{User.email}</span>
//                     </Typography>
//                     <Typography component={"p"} variant='h5'
//                         sx={{ fontWeight: 'semibold', marginBlock: '5px' }}>
//                         Gender: <span style={{
//                             display: "block", color: "darkgray",
//                             fontSize: '17px', fontWeight: 'normal'
//                         }}>{User.gender}</span>
//                     </Typography>
//                     <Typography component={"p"} variant='h5'
//                         sx={{ fontWeight: 'semibold', marginBlock: '10px' }}>
//                         Birthday: <span style={{
//                             display: "block", color: "darkgray",
//                             fontSize: '17px', fontWeight: 'normal'
//                         }}>{User.dateOfBirth}</span>
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <Typography component={"h5"} variant='h5'
//                 sx={{ padding:'20px',fontFamily:'cursive' }}>
//                 Dear , {User.name} 😊
//                 <div >
//                     <Link style={{ textDecorationLine: 'none', color: 'gray' }}
//                         href={'/changepassword'}><ShortcutIcon/> Do You Want To Change The Password</Link>
//                 </div>
//             </Typography>
            
//         </> : <Loading />}

        
//     </>
// }
