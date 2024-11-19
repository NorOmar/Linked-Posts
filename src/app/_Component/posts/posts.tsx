/* eslint-disable react/jsx-key */
"use client"
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PpostType } from '@/app/_interface/home';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField } from '@mui/material';
import img from "../../../assets/images/image 55.png"
import { useDispatch } from 'react-redux';
import { store } from '@/lib/store';
import { useFormik } from 'formik';
import { createComment, deleteComment } from '@/lib/postsslice';
import SendIcon from '@mui/icons-material/Send';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';


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
    // variants: [
    //     {
    //         props: ({ expand }) => !expand,
    //         style: {
    //             transform: 'rotate(0deg)',
    //         },
    //     },
    //     {
    //         props: ({ expand }) => !!expand,
    //         style: {
    //             transform: 'rotate(180deg)',
    //         },
    //     },
    // ],
}));

export default function Posts({ post, allComment = false }: { post: PpostType, allComment?: boolean }) {
    let dispatch = useDispatch<typeof store.dispatch>();
    const [expanded, setExpanded] = React.useState(false);
    let route = useRouter();

    let formik = useFormik({
        initialValues: {
            content: "",
            post:"",
        },
        onSubmit: (values) => {
            dispatch(createComment(values))
                .then((res) => {
                    console.log('Result', res.payload.data.message);
                    toast.success(res.payload.data.message);
                })
                .catch((err) => {
                console.log('Error',err);
            })
        }
    })

    function handleNavigate(id: string) {
        route.push(`/user/${id}`)
    }

    function handleImg(imgSrc: string) {
        let myKeysWords = imgSrc.split("/");
        let lastKey = myKeysWords[myKeysWords.length - 1];

        if (lastKey == "undefined") {
            return img
        }
        else {
            return imgSrc
        }
    }

    function handleDetails(id: string) {
        route.push(`/post/${id}`);
    }

    const handleExpandClick = (id: string) => {
        formik.values.post = id;
        setExpanded(!expanded);
        
    };

    // const DeleteComment = (id: string) => {
    //     dispatch(deleteComment(id))
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // how create delete comment with API https://linked-posts.routemisr.com/comments/664d447dc99473930fa0ed94    in react js
    
    // useEffect(() => {

    //     const DeleteComment = (id:string) => {
    //         dispatch(deleteComment(id))
    //         .then((res)=>{
    //             console.log(res);
    //         })
    //             .catch((err) => {
    //             console.log(err);
    //         })
    //     }

    // },[])

    return (
        <Card sx={{ width: "100%", margin:"20px" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], cursor: "pointer" }}
                        aria-label="recipe"
                        onClick={()=>handleNavigate(post.user._id)}
                    >
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
                    sx: { cursor: "pointer", width: "fit-content" , fontWeight:"bold" },
                    onClick: () => handleNavigate(post.user._id)
                }}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' , fontFamily:"cursive" }}>
                    {post.body}
                </Typography>
            </CardContent>
            {post.image ? <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt="Paella dish"
            /> : ""}
            <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
                <IconButton aria-label="add to favorites">
                    <ThumbUpIcon /> 
                    <Typography variant="body2"
                        sx={{ color: 'text.secondary', fontFamily: "cursive" , marginLeft:"10px" }}>
                        Like
                    </Typography>
                </IconButton>
                {/* Comments */}
                <ExpandMore
                    expand={expanded}
                    onClick={()=>handleExpandClick(post._id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <IconButton
                        aria-label="comment">
                        <CommentIcon />
                        <Typography variant="body2"
                            
                            sx={{ color: 'text.secondary', fontFamily: "cursive", marginLeft: "10px" }}
                        >
                            Comment
                        </Typography>
                    </IconButton>
                </ExpandMore>
            

                <IconButton aria-label="share">
                    <ShareIcon />
                    <Typography variant="body2"
                        sx={{ color: 'text.secondary', fontFamily: "cursive", marginLeft: "10px" }}>
                        Share
                    </Typography>
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <form style={{ display: 'flex',gap:'5px'}} onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                        name='content'
                        placeholder='Add Your Comment'
                    />
                    <Button type='submit' sx={{
                        padding: '13px',
                        width: '10%',
                        backgroundColor: "#1976d2",
                        borderRadius: "10px",
                        color: "white",
                        border: "1px solid transparent",
                        ":hover": { border: "1px solid #1976d2", color: "#1976d2", backgroundColor: "white" }
                    }}>
                        <SendIcon />
                    </Button>
                </form>
            </Collapse>
            
            
            {post.comments.length > 0 && allComment == false ? <Box
                sx={{ backgroundColor: "whitesmoke"}}>
                <CardHeader
                    
                    avatar={
                        <Avatar sx={{ bgcolor: red[500], cursor: "pointer" }}
                            aria-label="recipe"
                            onClick={() => handleNavigate(post.comments[0].commentCreator._id)}
                        >
                            <Image src={handleImg(post.comments[0].commentCreator.photo)} alt={post.comments[0].commentCreator.name} width={50} height={50} />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                            {/* <div onClick={()=> DeleteComment(post._id)}>
                                <DeleteIcon />
                            </div> */}
                        </IconButton>
                    }
                    title={post.comments[0].commentCreator.name}
                    subheader={post.comments[0].createdAt}
                    titleTypographyProps={{
                        sx: { cursor: "pointer", width: "fit-content",fontWeight:"bold" },
                        onClick: () => handleNavigate(post.comments[0].commentCreator._id)
                    }}
                />
                <CardContent sx={{padding:"0" , paddingLeft:"20px"}}>
                    <Typography variant="body2"
                        sx={{
                            color: 'text.secondary', fontFamily: "cursive",
                            fontSize: "18px", textTransform: "capitalize"
                        }}>
                    {post.comments[0].content}
                </Typography>
            </CardContent>
            </Box>
                : post.comments?.map((comment) => <Box
                    sx={{ backgroundColor: "whitesmoke",borderBottom:"5px solid #eee"}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500], cursor: "pointer" }}
                                aria-label="recipe"
                                onClick={() => handleNavigate(comment.commentCreator._id)}
                            >
                                <Image src={handleImg(comment.commentCreator.photo)} alt={comment.commentCreator.name} width={50} height={50} />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                                {/* {comment.commentCreator.name == "Noor omar" ? <div
                                    onClick={() => DeleteComment(comment._id)}>
                                    <DeleteIcon />
                                </div>
                                    :
                                    <MoreVertIcon />
                                } */}
                                
                            </IconButton>
                        }
                        title={comment.commentCreator.name}
                        subheader={comment.createdAt}
                        titleTypographyProps={{
                            sx: { cursor: "pointer", width: "fit-content", fontWeight: "bold" },
                            onClick: () => handleNavigate(comment.commentCreator._id)
                        }}
                    />
                    <CardContent sx={{ padding: "0", paddingLeft: "20px" }}>
                        <Typography variant="body2" sx={{
                            color: 'text.secondary', fontFamily: "cursive",
                            fontSize: "18px", textTransform: "capitalize"
                        }}>
                            {comment.content}
                        </Typography>
                    </CardContent>
                </Box>) }



            {post.comments.length > 1 && allComment == false ? <Typography component={"p"}
                sx={{
                    cursor: "pointer", paddingLeft: "20px", fontFamily: "cursive",
                    ":hover": { color: "gray" }
                }}
                onClick={() => handleDetails(post._id)}
            >
                View More Comments...
            </Typography>: ""}
        </Card>
    );
}

