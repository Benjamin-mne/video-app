import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSuccess } from '../redux/videoSlice';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000b0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    background-color: ${({theme}) => theme.bgLighter};
    color:  ${({theme}) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    z-index: 9999;
`;

const Confirmation = styled.h1`
    text-align: center;
`;

const Title = styled.h4`
    text-align: center;
`;

const Image = styled.img`
    height: 250px;
    display: flex;
    align-items: center;
    align-content: center;
    object-fit: cover;
`;

const Edit = styled.button`
    background-color: #3ea6ff;
    color:  ${({theme}) => theme.text};
    font-weight: 500;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
`;

const Cancel = styled.button`
    background-color: ${({theme}) => theme.soft};
    color:  ${({theme}) => theme.text};
    font-weight: 500;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
`;

const Input  = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};
`;


export const EditVideo = ({setOpenEdit, videoUrl, thumbnail, title, desc}) => {

  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState(title);
  const [videoDesc, setVideoDesc] = useState(desc);
  const dispatch = useDispatch();

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleRef = () => {
    titleRef.current.value = title;
    descRef.current.value = desc;
  }

  const token = window.localStorage.getItem("auth-token") || '{}';

  const handleEdit = async (videoUrl, videoTitle, videoDesc) =>{

    if (videoTitle !== ''){
        try {
        await axios.put(`http://localhost:8080/api/videos/${videoUrl}`,{
            title: videoTitle,
            desc: videoDesc
        },{
            headers:{
            access_token: token
        }
        }).then(res => dispatch(fetchSuccess(res.data)))

        setOpenEdit(false);
        } catch (error) {
        
        } 
        }
  }

  useEffect(() =>{
    handleRef();
  },[]);


  return (
    <Container>
        <Wrapper>
            <Confirmation>Update Video Data</Confirmation>
            <Input ref={titleRef} type='text' placeholder='Title' onChange={(e) => setVideoTitle(e.target.value)} />
            <Input ref={descRef} type='text' placeholder='Description' onChange={(e) => setVideoDesc(e.target.value) } />
            <Image src={thumbnail} alt="thumbnail" />
            <Title>{title}</Title>
            <Edit onClick={() => handleEdit(videoUrl, videoTitle, videoDesc)}>Update</Edit>
            <Cancel onClick={() => setOpenEdit(false)}>Cancel</Cancel>
        </Wrapper>
    </Container>

  )
}
