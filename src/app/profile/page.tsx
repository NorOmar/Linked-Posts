/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import changepassword from '@/app/changepassword/page';
import Loading from '@/app/loading';
import { profileData, uploadProfile } from '@/lib/authSlice';
import { store } from '@/lib/store';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import PersonIcon from '@mui/icons-material/Person';
import UTurnRightIcon from '@mui/icons-material/UTurnRight';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GirlIcon from '@mui/icons-material/Girl';
import BoyIcon from '@mui/icons-material/Boy';
import { userPosts } from '@/lib/postsslice';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function profile() {
  const [User, setUser] = useState([]);
  const [posts, setposts] = useState([]);
  let dispatch = useDispatch<typeof store.dispatch>();
  let route = useRouter();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  let formik = useFormik({
    initialValues: {
      photo: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('photo', values.photo); // Append the file

      try {
        const response = await dispatch(uploadProfile(formData)).unwrap();
        console.log("Response Photo:", response);
        toast.success(response.message)
        route.push('/');
      } catch (error) {
        console.log("Error Photo:", error);
        toast.error(error.payload.error)
      }
    }
    // onSubmit: (values) => {
    //     dispatch(uploadProfile(values))
    //         .then((res) => {
    //         console.log("Res Photo :",res);
    //         })
    //         .catch((err) => {
    //         console.log("err photo",err);
    //     })
    // }
  })

  const handleFileChange = (event: any) => {
    formik.setFieldValue('photo', event.currentTarget.files[0]);
    // console.log(event.currentTarget.files[0]);

  };


  useEffect(() => {
    dispatch(profileData())
      .then((res) => {
        console.log(res.payload.user)
        setUser(res.payload.user)
        // const id = res.payload.user._id;
        dispatch(userPosts(res.payload.user._id))
          .then((res) => {
            console.log('RESULT : ', res.payload.data.posts);
            setposts(res.payload.data.posts);
          })
          .catch((err) => {
            console.log('ERROR : ', err);
          })
        
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.payload.message);
      })
    
    

  }, [])
  return <>
    {User ? <>
      <Grid container spacing={3} gap={'5px'}
        sx={{ marginBlock: "50px" }}>
        <Grid item sm={3} sx={{ marginLeft: '20px', borderRight: "3px solid #eee" }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={User.photo} alt={User.name}
              style={{ border: '1px solid #ddd', borderRadius: '10px' }} />
          </div>
          <form style={{ marginBlock: '10px' }} onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <label className='file-upload'>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              <span className="icon"><CameraAltIcon/></span>
              <span className="text">Upload Photo</span>
            </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button type='submit' sx={{
                marginBlock: '10px',
                width: '10%',
                backgroundColor: "#1976d2",
                borderRadius: "10px",
                color: "white",
                border: "1px solid transparent",
                ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
              }}>
                <HowToRegSharpIcon />
              </Button>
            </div>
            
          </form>
          <h4 style={{ color: '#555', fontFamily: 'cursive' }}>Details Person <UTurnRightIcon /> :</h4>
          <div >
            <div style={{display:'flex',gap:'5px' }}>
              <PersonIcon sx={{marginBlock:'10px',fontSize:'20px'}} />
              <Typography component={"p"} variant='h6'
                sx={{ fontWeight: 'semibold', marginBlock: '5px', fontFamily: 'cursive' }}>
                Name: <span
                  style={{
                    display: "block", color: "darkgray",
                    fontSize: '17px', fontWeight: 'normal'
                  }}>{User.name}</span>
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <MarkEmailReadIcon sx={{ marginBlock: '10px', fontSize: '20px' }} />
              <Typography component={"p"} variant='h6'
                sx={{ fontWeight: 'semibold', marginBlock: '5px',fontFamily:'cursive' }}>
                Email: <span style={{
                  display: "block", color: "darkgray",
                  fontSize: '17px', fontWeight: 'normal'
                }}>{User.email}</span>
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {User.gender == 'female' ? <GirlIcon sx={{ marginBlock: '10px', fontSize: '20px' }} />
                : <BoyIcon sx={{ marginBlock: '10px', fontSize: '20px'}} />}
              <Typography component={"p"} variant='h6'
                sx={{ fontWeight: 'semibold', marginBlock: '5px', fontFamily: 'cursive' }}>
                Gender: <span style={{
                  display: "block", color: "darkgray",
                  fontSize: '17px', fontWeight: 'normal'
                }}>{User.gender}</span>
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <CelebrationIcon sx={{ marginBlock: '10px', fontSize: '20px' }} />
              <Typography component={"p"} variant='h6'
                sx={{ fontWeight: 'semibold', marginBlock: '10px', fontFamily: 'cursive' }}>
                Birthday: <span style={{
                  display: "block", color: "darkgray",
                  fontSize: '17px', fontWeight: 'normal'
                }}>{User.dateOfBirth}</span>
              </Typography>
            </div>
            </div>
        </Grid>
        <Grid item sm={6} sx={{ }}>
          
          {posts.map((post) => <Card sx={{ width: "100%", margin: "20px" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <Image src={post.user.photo} alt={post.user.name} width={50} height={50} />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.name}
              subheader={post.createdAt}
              titleTypographyProps={{
                sx: { cursor: "pointer", width: "fit-content", fontWeight: "bold" }
              }}
            />
            {post.image ? <CardMedia
              component="img"
              height="194"
              image={post.image}
              alt="Paella dish"
            /> : ""}
            {/* <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent> */}
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton aria-label="add to favorites">
                <ThumbUpIcon />
                <Typography variant="body2"
                  sx={{ color: 'text.secondary', fontFamily: "cursive", marginLeft: "10px" }}>
                  Like
                </Typography>
              </IconButton>
              {/* Comments */}
              <IconButton aria-label="comment">
                <CommentIcon />
                <Typography variant="body2"
                  sx={{ color: 'text.secondary', fontFamily: "cursive", marginLeft: "10px" }}>
                  Comment
                </Typography>
              </IconButton>

              <IconButton aria-label="share">
                <ShareIcon />
                <Typography variant="body2"
                  sx={{ color: 'text.secondary', fontFamily: "cursive", marginLeft: "10px" }}>
                  Share
                </Typography>
              </IconButton>

            </CardActions>
          </Card>)}
          

        </Grid>
      </Grid>
      <Typography component={"h5"} variant='h5'
        sx={{ padding: '20px', fontFamily: 'cursive' }}>
        Dear , {User.name} 😊
        <div >
          <Link style={{ textDecorationLine: 'none', color: 'gray' }}
            href={'/changepassword'}><ShortcutIcon /> Do You Want To Change The Password</Link>
        </div>
      </Typography>

    </> : <Loading />}


  </>
}


