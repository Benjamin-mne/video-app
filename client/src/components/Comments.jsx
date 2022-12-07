import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { Comment } from './Comment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
`;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  border-radius: 50%;
  background-color: #ccc;
  object-fit: cover;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
`;

const Button  = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({theme}) => theme.soft};
  color: ${({theme}) => theme.textSoft};
`;

export const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [commentDesc, setCommentDesc] = useState('');  
  const [comment, setComment] = useState(false);
  const inputRef = useRef(null);

  const token = window.localStorage.getItem("auth-token") || '{}';

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/comments/${videoId}`);
      setComments(res.data);
    } catch (error) {
      
    }
  }

  const addComment = async () => {
    if (commentDesc !== ''){
      try {
        await axios.post('http://localhost:8080/api/comments/',{
          desc: commentDesc,
          videoId},
          {
            headers:{
              access_token: token
            }
          }
          )
        .then(res => {
          handleClear();
          fetchComments();
        })
      } catch (error) {
      }
    }
  }

  const handleClear = () => {
    inputRef.current.value = '';
    setCommentDesc('')
  };

  const deleteComment = async (comment) => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${comment._id}`,{
        headers:{
          access_token: token
      }
     },).then(res => {
        fetchComments();
     })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchComments();
    if(commentDesc !== ''){
      setComment(true)
    } else{
      setComment(false)
    }
  },[videoId, commentDesc])

    return(
      <Container>
        <NewComment>
          <Link to={`/channel/${currentUser?._id}`}>
            <Avatar src={currentUser?.img}/>
          </Link>
            <Input placeholder='Add a comment...' ref={inputRef} onChange={(e) => setCommentDesc(e.target.value)}/>
            {
              comment && <>
              <Button onClick={addComment}>Comment</Button>
              <Button onClick={handleClear}>Cancel</Button>
              </>
            }
        </NewComment>
        
        {comments?.map(comment => (
          <Comment key={comment._id} comment={comment} deleteComment={deleteComment}/>
        ))}
      </Container>
    )


}
