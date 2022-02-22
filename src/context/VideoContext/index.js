import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "./../../context";
import { BACK_PATH } from '../api'

export const VideoContext = React.createContext();

export const VideoProvider = ({children}) => {
    const {userInfo} = useContext(AuthContext);
    const [videos, setVideos] = useState([])
    const [myVideos, setMyVideos] = useState([])
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const handleAddVideo = async (title, description, url, owner, owner_id) => {
        const videoInfo = { title: title, description: description, url: url, owner_name: owner, owner_id: owner_id };
        const res = await fetch(`${BACK_PATH}/addpost`, {
            method: 'POST',
            body: JSON.stringify(videoInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getAllVideo();
        getMyVideo(userInfo);
    }

    useEffect(() => {
        getAllVideo();
        getMyVideo(userInfo);
    }, [])

    const getAllVideo = async () => {
        const res = await fetch(`${BACK_PATH}/getposts`);
        const videoData = await res.json();
        console.log(videoData)
        setVideos(videoData);
    }

    const getMyVideo = async (userInfo) => {
        const user_id = { owner_id: userInfo.user_id };
        const res = await fetch(`${BACK_PATH}/myposts`, {
            method: 'POST',
            body: JSON.stringify(user_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const videoData = await res.json();
        setMyVideos(videoData);
    }

    const getVideo = async (id) => {
        const post_id = { id: id };
        const res = await fetch(`${BACK_PATH}/post`, {
            method: 'POST',
            body: JSON.stringify(post_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const postData = await res.json();
        setPost(postData)
    }

    const getComments = async (post_id) => {
        const postInfo = { post_id: post_id };
        const res = await fetch(`${BACK_PATH}/comments`, {
            method: 'POST',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const commentsData = await res.json();
        console.log(commentsData)
        setComments(commentsData)
    }

    return (
        <VideoContext.Provider value={{
            handleAddVideo,
            videos,
            myVideos,
            post,
            getVideo,
            getComments,
            comments,
            getMyVideo,
        }}>
            {children}
        </VideoContext.Provider>
    )
}