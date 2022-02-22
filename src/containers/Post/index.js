import React, {useContext, useState, useEffect} from 'react';
import { Button } from '../../components';
import { VideoContext, AuthContext } from "./../../context";
import { BACK_PATH } from '../../context/api';


export const Post = ({ match }) => {
    const path = match.params.id;
    const {post, getVideo, getComments, comments} = useContext(VideoContext);
    const {currentUser, userInfo} = useContext(AuthContext);
    const [text, setText] = useState('');
    const [validate, setValidate] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const username = userInfo.username;

    const addComment = async (text, username, post_id, e) => {
        e.preventDefault();
        if (!text){
            setValidate(true)
        } else {
            const postInfo = { text: text, username: username, post_id: post_id };
            const res = await fetch(`${BACK_PATH}/addcomment`, {
                method: 'POST',
                body: JSON.stringify(postInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            getComments(path)
            setText('')
            setValidate(false)
        }
    }

    const deleteComment = async(comment_id, e) => {
        e.preventDefault();
        const postInfo = { comment_id: comment_id };
        const res = await fetch(`${BACK_PATH}/deletecomment`, {
            method: 'DELETE',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getComments(path)
        
    }

    const editPost = async (title, description, id, e) => {
        e.preventDefault();
        const postInfo = { title: title, description: description, id: id };
        const res = await fetch(`${BACK_PATH}/editpost`, {
            method: 'PATCH',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getVideo(path);
        setEditStatus(false)
        setTitle('')
        setDescription('')
    }

    const addLike = async (id, likes, e) => {
        e.preventDefault();
        const likes_count = Number(likes) + 1;
        const postInfo = { id: id, likes: likes_count };
        const res = await fetch(`${BACK_PATH}/likepost`, {
            method: 'PATCH',
            body: JSON.stringify(postInfo),
                headers: {
                'Content-Type': 'application/json'
            }
        });
        getVideo(path);
    }

    useEffect(() => {
        getVideo(path);
        getComments(path);
    }, [])

    return (
        <div className="post"> 
            <div className="post-form" >
                <iframe 
                    width="100%" 
                    height="435" 
                    src={post.url} 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    lowfullscreen 
                    className="video"
                />
                {editStatus ?
                    <div>
                        <input className="form-control" placeholder="Title" onChange={ (e) => setTitle(e.target.value) }/>
                        <button style={{ marginLeft: '20px', fontSize: '12px' }}  onClick={(e) => editPost(title, description, path, e)}>Підтвердити</button>
                    </div>
                    :
                    <div>
                        <span className="video-title">{post.title}</span> 
                        { currentUser == post.owner_name ?
                            <button style={{ marginLeft: '20px', fontSize: '12px' }} onClick={() => setEditStatus(true)}>
                                Редагувати
                            </button>
                            : 
                            null
                        }
                    </div>
                }
                <div className="title-field">
                    <span>Сподобалося: {post.likes}</span>
                    <Button text="Вподобайка" onClick={(e) => addLike(path, post.likes, e)}></Button> 
                </div>
                {editStatus ?
                    <textarea className="form-control" placeholder="Description" rows="6" onChange={ (e) => setDescription(e.target.value) } style={{ marginTop: '10px' }}></textarea>
                    :
                    <p>{post.description}</p>
                }
                <hr />
                <p className="comment-title">Коментарі: </p>
                {
                    comments[0] ? comments.map((comment, i) => (
                            <div key={i}>
                                <div className='comment-header'>
                                    <p className="comment-name">{comment.username}</p> 
                                    <div>
                                        {currentUser == post.owner_name ? 
                                            <Button text='x' onClick={(e) => deleteComment(comment.comment_id, e)} />
                                            : 
                                            null 
                                        }
                                    </div>
                                </div>
                                <p>{comment.text}</p>
                                <hr />
                            </div>
                            
                    ))
                    :
                    <p>Напишіть свій перший коментар!</p>
                }
                <form onSubmit={(e) => addComment(text, username, path, e)}>
                    {
                        validate ?
                        <div className="alert alert-danger" role="alert">
                            Не можна відправити пустий коментар!
                        </div>
                        :
                        null
                    }
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1" className="comment-title">Коментар</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" value={text} onChange={ (e) => setText(e.target.value) }></textarea>
                    </div>
                    <Button type="submit" className="btn-like" text="Коментувати" />
                </form>

            </div>
        </div>
    )
}