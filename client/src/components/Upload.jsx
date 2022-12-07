import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    gap: 20px;
    position: relative;
    z-index: 999;
    border-radius: 10px;

`;

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const Title = styled.h1`
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const TextArea = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Button = styled.button`
    background-color: ${({theme}) => theme.soft};
    color:  ${({theme}) => theme.text};
    font-weight: 500;
    border: none;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
`;

const Label = styled.label`
    font-size: 14px;
`;

export const Upload = ({setOpen}) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setInputs(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleTags = (e) => {
        setTags(e.target.value.split(','));
    }

    const uploadFile = (file, urlType) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
                default:
                    break;
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                    return { ...prev, [urlType]: downloadURL };
                });
                });
            }
            );
    }

    const token = window.localStorage.getItem("auth-token") || '{}';


    const handleUpload = async (e) =>{
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/api/videos', {...inputs, tags},{
            headers:{
                access_token: token
              } 
        });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    useEffect(() =>{
        video && uploadFile(video, 'videoUrl');
    },[video]);

    useEffect(() =>{
        img && uploadFile(img, 'imgUrl');
    },[img]);

  return (
    <Container>
        <Wrapper>
            <Close onClick={() => setOpen(false)} >X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            {videoPerc > 0 ? ('Uploading:' + videoPerc + "%") : (<Input type='file' accept='video/*' onChange={e => setVideo(e.target.files[0])}/>)}
            <Input type='text' placeholder='Title' name='title' onChange={handleChange}/>
            <TextArea type='text' name='desc' placeholder='Description...' rows={8} onChange={handleChange}/>
            <Input type='text' placeholder='Separate the tags with commas!' onChange={handleTags}/>
            <Label>Image:</Label>
            {imgPerc > 0 ? ('Uploading:' + imgPerc + "%") : (<Input type='file' accept='img/*' onChange={e => setImg(e.target.files[0])}/>)}
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}
