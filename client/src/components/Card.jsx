import styled from "styled-components";
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import { useEffect, useState } from "react";
import axios from 'axios';

const Container = styled.div`
    width: ${(props) => props.type === 'sm' && '360px'};
    margin-bottom: ${(props) => props.type === 'sm' ? '10px' : '45px' };
    cursor: pointer;
    display: ${(props) => props.type === 'sm' && 'grid' };
    grid-template-columns: ${(props) => props.type === 'sm' && '1fr 1fr' };
    gap:10px;
    border-radius: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === 'sm' ? '120px' : '202px' };
    background-color: #999;
    cursor: pointer;
    flex: 1;
    object-fit: cover;
    border-radius: 10px;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== 'sm' && '16px'};
    gap: 12px;
    flex: 1;

`

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div`

`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    
`;

export const Card = ({type, video}) => {
  const [channel, setChannel] = useState({});

  const fetchChannel = async () =>{
    const res = await axios.get(`http://localhost:8080/api/users/find/${video.userId}`);
    setChannel(res.data)
  }
  

  useEffect(() => {
    fetchChannel();
  },[video.userId]);
  
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Container type={type}>
          <Image type={type} src={video.imgUrl}/>
          <Details type={type}>
            <ChannelImage type={type} src={channel.img}/>
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName>{channel.name}</ChannelName>
              <Info>{video.views} views • {format(video.createdAt)}</Info>
            </Texts>
          </Details>
        </Container>
      </Link>
  )
}

