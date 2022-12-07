import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../components/Card";
import axios from 'axios';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

export const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const token = window.localStorage.getItem("auth-token") || '{}';

  const fetchData = async () =>{
    const res = await axios.get(`http://localhost:8080/api/videos/${type}`,{
      headers:{
        access_token: token
      } 
    });
    setVideos(res.data)
  }
  
  useEffect(() => {
    fetchData();
  },[type])
  
  return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}
