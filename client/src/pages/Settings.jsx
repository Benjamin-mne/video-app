import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

import app from '../firebase.js';
import { loginSuccess } from '../redux/userSlice.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.bgLighter};
  border: 1px solid ${({theme}) => theme.soft};
  padding: 20px 50px ;
  gap: 10px;
`;

const Title  = styled.h1`
  font-size: 24px;
`;

const Input  = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};
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

const Subtitle  = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
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

const token = window.localStorage.getItem("auth-token") || '{}';


export const Settings = () => {
  const { currentUser } = useSelector(state => state.user);

  const [newName, setNewName] = useState('');
  const [img, setImg] = useState(undefined);
  const [imgUrl, setImgUrl] = useState();
  const [imgPerc, setImgPerc] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storages = getStorage();
  const imgRef = ref(storages, currentUser.img);

const uploadFile = async (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImgPerc(Math.round(progress));
        },
        (error) => {}, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            });
        }
        );
    }

    const  handleUpdateUrl = async () => {
        await axios.put(`http://localhost:8080/api/users/${currentUser._id}`,{
            img: imgUrl
        },{
            headers:{
                access_token: token
            }
        }).then(res => dispatch(loginSuccess(res.data)));
    }

    const handleUpdateName = async () => {
        await axios.put(`http://localhost:8080/api/users/${currentUser._id}`,{
            name: newName
        },{
            headers:{
                access_token: token
            }
        }).then(res => dispatch(loginSuccess(res.data)))
    }

    const deletePrevImg = async () => {
     await deleteObject(imgRef);
    }

    const handleUpdate = () => {
        if (newName !== ''){
            handleUpdateName();
            navigate('/');
        }
        if (img !== undefined){
            handleUpdateUrl();
            deletePrevImg();
            navigate('/');
        }
    }

    useEffect(() => {
        img && uploadFile(img);
    },[img])

    return (
    <Container>
        <Wrapper>
            <Title>Settings</Title>
            <Subtitle>update your data</Subtitle>
            <Input type='text' placeholder='Username' onChange={(e) => setNewName(e.target.value)}/>
            <Input type='text' placeholder='Password (TODO)' />
            <Input type='text' placeholder='Email (TODO)'/>
            <Label>Profile Image:</Label>
            {imgPerc > 0 ? ('Uploading:' + imgPerc + "%") : (<Input type='file' accept='img/*' onChange={e => setImg(e.target.files[0])}/>)}
            <Button onClick={() => {
                handleUpdate();
            }}>Update</Button>
            <Delete>Delete my Account</Delete>
        </Wrapper>
    </Container>
  )
}
