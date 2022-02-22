import React, { useState, useContext } from 'react';
import '../../styles/post.css';
import {Button} from '../../components';
import { useHistory } from "react-router-dom";
import { VideoContext } from "./../../context";
import { AuthContext } from "./../../context";

export const CreatePost = () => {
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const {currentUser, userInfo} = useContext(AuthContext);
    const {handleAddVideo} = useContext(VideoContext)
    const [validation, setValidation] = useState(false);
    const history = useHistory();
    const owner = currentUser;
    const owner_id = userInfo.user_id;


    const youtubeUrlConvert = (url) => {
        let res = url.split("=");
        return("https://www.youtube.com/embed/"+res[1]);
    }

    const validate = (title, text, url, owner, owner_id, userInfo, e) => {
        e.preventDefault();
        const valid = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (valid.test(url) == true) {
            const validUrl = youtubeUrlConvert(url);
            handleAddVideo(title, text, validUrl, owner, owner_id, userInfo);
            history.push("/main/myblog")
        }
        else {  
            setValidation(true);
        }
    }
    

    return (
        <>
            <div className="post"> 
                <span className='video-title'>Додати запис</span>
                <form className="post-form" onSubmit={(e) => validate(title, text, url, owner, owner_id, userInfo, e)}>
                    {
                        validation ?
                        <div className="alert alert-danger" role="alert">
                            Невірний формат ссилки! Приклад: https://www.youtube.com/watch?id
                        </div>
                        :
                        null
                    }
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Youtube-ссилка</label>
                        <input className="form-control" id="exampleFormControlInput1" placeholder="https://www.youtube.com/watch?v=id" onChange={(e) => setUrl(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Назва</label>
                        <input className="form-control" id="exampleFormControlInput1" placeholder="Назва" onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Текст</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" onChange={(e) => setText(e.target.value)} required></textarea>
                    </div>
                    <Button type="submit" text={'Додати'}></Button>
                </form>
            </div>
        </>

    )
} 