import styled from 'styled-components'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { Comments } from '../components/Comments';
import { DeleteVideo } from '../components/DeleteVideo';

import { useSelector, useDispatch } from 'react-redux'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format} from 'timeago.js';
import { subscription } from '../redux/userSlice';
import axios from 'axios';
import { Recommendation } from '../components/Recommendation';

import { getStorage, ref } from "firebase/storage";
import { EditVideo } from '../components/EditVideo';



const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper =  styled.div`
`;

const Title =  styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details =  styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info =  styled.span`
  color: ${({theme}) => theme.textSoft};

`;

const Buttons =  styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};

`;

const Button =  styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin-top: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #ccc;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 20px 10px;
  cursor: pointer;

`;

const Edit = styled.button`
  background-color: #3ea6ff;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 20px 10px;
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
`;

const Delete = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 20px 10px;
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
`;


const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

export const Video = () => {

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);


  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const storage = getStorage();

  const videoRef = ref(storage, currentVideo.videoUrl);
  const imgRef = ref(storage, currentVideo.imgUrl);

  const dispatch = useDispatch();
  
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const videoRes = await axios.get(`http://localhost:8080/api/videos/find/${path}`)
        .then(
          await axios.put(`http://localhost:8080/api/videos/view/${path}`)
        );
      const channelRes = await axios.get(`http://localhost:8080/api/users/find/${videoRes.data.userId}`);
      
      setChannel(channelRes.data);
      dispatch(fetchSuccess(videoRes.data));
    } catch (err) {}
  };
  
    useEffect(() => {
      fetchData();
      blockScroll();
    }, [path, dispatch, openDelete]);

  const token = window.localStorage.getItem("auth-token") || '{}';

  const handleLike = async () => {
    if (currentUser === null){
      navigate('/signin');
    } else {
    await axios.put(`http://localhost:8080/api/users/like/${currentVideo._id}`,{},{
      headers:{
        access_token: token
      } 
    })
    dispatch(like(currentUser._id));
    }
  }

  const handleDislike = async () => {
    if (currentUser === null){
      navigate('/signin');
    } else {
    await axios.put(`http://localhost:8080/api/users/dislike/${currentVideo._id}`,{},{
      headers:{
        access_token: token
      } 
    })
    dispatch(dislike(currentUser._id));
    }
  }

  const handleSubscribe = async () => {
    if (currentUser === null){
      navigate('/signin');
    } else {
    currentUser.subscribedUsers.includes(channel._id)
    ? await axios.put(`http://localhost:8080/api/users/unsub/${channel._id}`,{},{
      headers:{
        access_token: token
      } 
    })
    : await axios.put(`http://localhost:8080/api/users/sub/${channel._id}`,{},{
      headers:{
        access_token: token
      } 
    });
    dispatch(subscription(channel._id));
  }
  }

  const blockScroll = () => {
    if (!openDelete && !openEdit) {
      window.onscroll=function(){};
    }
    else{
        window.onscroll = function () { window.scrollTo(0, 0); };
        window.scrollTo(0, 0);
    }
  }

  return (
    
    <> {currentVideo && 
    <Container>
    <Content>
      <VideoWrapper>
        <VideoFrame src={currentVideo.videoUrl} controls autoPlay={true} />
      </VideoWrapper>
      { (currentVideo.userId === currentUser?._id) && 
      <div style={{display:'flex',flexDirection:'row-reverse'}}>
        <Delete onClick={() => setOpenDelete(true)}>DELETE</Delete>
        <Edit onClick={() => setOpenEdit(true)}>EDIT</Edit>
      </div>
      }
      { openDelete &&
        <DeleteVideo setOpenDelete={setOpenDelete} videoUrl={currentVideo._id} videoRef={videoRef} imgRef={imgRef} thumbnail={currentVideo.imgUrl} title={currentVideo.title}/>
      }
      { openEdit &&
        <EditVideo setOpenEdit={setOpenEdit} videoUrl={currentVideo._id} thumbnail={currentVideo.imgUrl} title={currentVideo.title} desc={currentVideo.desc}/>
      }
      <Title>{currentVideo.title}</Title>
      <Details>
        <Info>
          {currentVideo.views} views • {format(currentVideo.createdAt)}
        </Info>
        <Buttons>
          <Button onClick={handleLike}>
            {currentVideo.likes?.includes(currentUser?._id) ? (
              <ThumbUpIcon />
            ) : (
              <ThumbUpAltOutlinedIcon />
            )}{" "}
            {currentVideo.likes?.length}
          </Button>
          <Button onClick={handleDislike}>
            {currentVideo.dislikes?.includes(currentUser?._id) ? (
              <ThumbDownIcon />
            ) : (
              <ThumbDownOutlinedIcon />
            )}{" "}
            Dislike
          </Button>
          <Button>
            <ReplyOutlinedIcon /> Share
          </Button>
          <Button>
            <AddTaskOutlinedIcon /> Save
          </Button>
        </Buttons>
      </Details>
      <Hr />
      <Channel>
        <ChannelInfo>
          <Link to={`/channel/${channel?._id}`}>
          <Image src={channel.img} />
          </Link>
          <ChannelDetail>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
            <Description>{currentVideo.desc}</Description>
          </ChannelDetail>
        </ChannelInfo>
        <Subscribe onClick={handleSubscribe}>
          {currentUser?.subscribedUsers?.includes(channel._id)
            ? "SUBSCRIBED"
            : "SUBSCRIBE"}
        </Subscribe>
      </Channel>
      <Hr />
      <Comments videoId={currentVideo._id} />
    </Content>
    <Recommendation tags={currentVideo.tags} />
  </Container>
  }</>
  )
}

