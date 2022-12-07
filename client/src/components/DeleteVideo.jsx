import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteObject } from "firebase/storage";
import axios from 'axios'

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
    height: 300px;
    display: flex;
    align-items: center;
    align-content: center;
    object-fit: cover;
`;

const Delete = styled.button`
    background-color: #cc1a00;
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

export const DeleteVideo = ({setOpenDelete, videoUrl, videoRef, imgRef, thumbnail, title}) => {

  const navigate = useNavigate();
  const token = window.localStorage.getItem("auth-token") || '{}';

  const handleDelete = async (videoUrl, videoRef, imgRef) =>{
    try {
      await axios.delete(`http://localhost:8080/api/videos/delete/${videoUrl}`,{
        headers:{
          access_token: token
      }
     })
     await deleteObject(videoRef);
     await deleteObject(imgRef);
     setOpenDelete(false);
     navigate('/');
    } catch (error) {
      
    }
  }

  return (
    <Container>
        <Wrapper>
            <Confirmation>Do you want to delete the current video?</Confirmation>
            <Image src={thumbnail} alt="thumbnail" />
            <Title>{title}</Title>
            <Delete onClick={() => handleDelete(videoUrl, videoRef, imgRef)}>Delete</Delete>
            <Cancel onClick={() => setOpenDelete(false)}>Cancel</Cancel>
        </Wrapper>
    </Container>

  )
}
