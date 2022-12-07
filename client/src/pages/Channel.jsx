import styled from 'styled-components'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Wrapper =  styled.div`
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 30px;
`;

const Image = styled.img`
    max-height: 200px;
    object-fit: cover;
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h1`
    color: ${({theme}) => theme.text};
`;

const UserImg = styled.img`
    max-height: 100px;
    max-width: 100px;
    min-width: 100px;
    object-fit: cover;
    border-radius: 50%;
`;

const UserSubs = styled.div`
    color: ${({theme}) => theme.soft};
`;

const Hr = styled.hr`
    margin: 1px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
`;

export const Channel = () => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const path = useLocation().pathname.split("/")[2];

    const fetchData = async () => {
        try {
            const user = await axios.get(`http://localhost:8080/api/users/find/${path}`);
            setChannel(user.data);
            const videos = await axios.get(`http://localhost:8080/api/videos/channel/${path}`,);
            setVideos(videos.data);
        } catch (error) {
            
        }
    };

      useEffect(() =>{
        fetchData();
      },[path])

  return (
    <Container>
        <Image src={channel.img}/>
        <Wrapper>
            <UserImg src={channel.img}/>
            <UserProfile>
                <UserName>{channel?.name}</UserName>
                <UserSubs>{channel.subscribers} Subscribers</UserSubs>
            </UserProfile>
        </Wrapper>
        <Hr/>
        <VideoContainer>
            {videos.map(video => (
            <Card key={video._id} video={video}/>))}
        </VideoContainer>
    </Container>
  )
}
