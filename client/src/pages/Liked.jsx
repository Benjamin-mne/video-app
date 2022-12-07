import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Card } from '../components/Card';
import axios from "axios";


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

export const Liked = () => {
    const path = useLocation().pathname.split("/")[2];
    const [videos, setVideos] = useState([]);
    const token = window.localStorage.getItem("auth-token") || '{}';

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/videos/liked/${path}`,{
                headers:{
                  access_token: token
                } 
              })
            setVideos(res.data)   
        } catch (error) {
            
        }
    } 

    useEffect(() => {
        fetchData();
    },[path])

  return (
    <Container>
    {videos.map(video => (
      <Card key={video._id} video={video}/>
    ))}
  </Container>
  )
}
