import React, {useContext, useEffect} from 'react';
import {Spinner} from '../../components';
import '../../styles/blog.css';
import { Button } from '../../components';
import { useHistory } from "react-router-dom";
import { VideoContext } from '../../context';
import { AuthContext } from '../../context';
import { BACK_PATH } from '../../context/api';

export const MyBlog = () => {
    const history = useHistory();
    const {myVideos, getMyVideo} = useContext(VideoContext);
    const {userInfo} = useContext(AuthContext);

    const deletePost = async (id, userInfo, e) => {
        e.preventDefault();
        const postInfo = { id: id };
        const res = await fetch(`${BACK_PATH}/deletepost`, {
            method: 'DELETE',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(postInfo)
        getMyVideo(userInfo)
    }

    return (
        <> 
            {
                myVideos.map((video, i) => (
                    <div className="cell" key={i}>
                        <div className="inner-cell">
                            <iframe 
                                width="450" 
                                height="315" 
                                src={video.url} 
                                frameborder="0" 
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                lowfullscreen 
                                className="video"
                            />
                            <span className="title">{video.title}</span>
                            <Button className="check-btn" text="Переглянути" onClick={() => history.push(`/main/post/${video.id}`)}></Button>
                            <Button className="check-btn btn-bot" text="Видалити" onClick={(e) => deletePost(video.id, userInfo, e)}></Button>
                        </div>
                    </div>  
                ))
            }

            <div className="cell">
                <div className="inner-cell">
                    <Button type="submit" className="add-btn" text="Додати запис" onClick={() => history.push("/main/create")}></Button>
                </div>
            </div> 
        </>


    );
}

// @TODO
// Handle null response

//useReducer context for fetch