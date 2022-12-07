import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Card } from "../components/Card";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
`;

export const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    const fetchVideos = async () =>{
        const res= await axios.get(`http://localhost:8080/api/videos/search${query}`);
        setVideos(res. data);
    }

    useEffect(() => {
        fetchVideos();
    },[query]);

    return (
    <Container>
        {videos.map(video => (
            <Card key={video._id} video={video}/>))}
    </Container>
  )
}
