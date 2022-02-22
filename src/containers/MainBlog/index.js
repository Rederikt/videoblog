import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/blog.css';
import {VideoContext} from '../../context';
import { Button } from '../../components';
import { useHistory } from "react-router-dom";

export const MainBlog = () => {
    const history = useHistory();
    const {videos} = useContext(VideoContext);
    //const videos = getAllVideo();



    return(
        <>
            {
                videos.map((video,i) => (
                    <div className="cell">
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
                        <Button type="button" className="check-btn" text="Переглянути" onClick={() => history.push(`/main/post/${video.id}`)}></Button>
                        <span className="creator-text">Автор: {video.owner_name}</span>
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
        //<div className="table-dog">
        //    {loading ? 
        //        <Spinner />
        //        :( dogs == null ?
        //            <Alert />
        //            :
        //            dogs.map((dog, i) => (
        //            <div className="cell" key={i}>
        //                <img src={dog || placeholder} alt=''/>
        //                <h4>{
        //                    dog
        //                        .slice(30)
        //                        .charAt(0)
        //                        .toUpperCase() 
        //                    + 
        //                    dog
        //                        .slice(30)
        //                        .substring(1, dog.slice(30)
        //                        .indexOf('/'))
        //                        .replace('-', ' ')
        //                }</h4>
        //            </div>
        //        )
        //        )
        //        )}
        //</div>
    )
}

// @TODO
// Handle null response