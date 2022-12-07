import axios from 'axios';
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { Card } from '../components/Card';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

export const GetByTags = ({tags}) => {
    const [videos, setVideos] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/videos/tags?tags=${tags}`)
            setVideos(res.data)   
        } catch (error) {
            
        }
    } 

    useEffect(() => {
        fetchData();
    },[tags])

    return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}
