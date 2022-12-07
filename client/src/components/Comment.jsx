import { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import {format} from 'timeago.js';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    gap:10px;
    margin: 30px 0px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ccc;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({theme}) => theme.text};
`;

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.soft};
    margin-left: 5px;
`;

const Text = styled.p`

`;

const Delete =  styled.div`
    display: flex;
      cursor: pointer;
    gap: 10px;
    color: ${({theme}) => theme.text};
`;

export const Comment = ({comment, deleteComment}) => {
const [user, setUser] = useState({});    
const { currentUser } = useSelector(state => state.user);
const token = window.localStorage.getItem("auth-token") || '{}';

  const fetchComment = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/find/${comment.userId}`);
      setUser(res.data);
        
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchComment();
  },[])

  return (
    <Container>
        <Link to={`/channel/${user?._id}`}>
          <Avatar src={user.img}/>
        </Link>
        <Details>
            <Name>{user.name}
                <Date>{format(comment.createdAt)}</Date>           
            </Name>          
            <Text>{comment.desc}</Text>
        </Details>
        {currentUser?._id === comment.userId &&
        <Delete onClick={() => deleteComment(comment)} >
          <DeleteOutlineOutlinedIcon/>
        </Delete>
        }
    </Container>
  )
}
