import styled from 'styled-components'
import { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  flex: 2;
`;

export const Recommendation = ({tags}) => {
    const [videos, setVideos] = useState([]);
    const path = useLocation().pathname.split("/")[2];

    const fetchVideos = async () => {
        const res= await axios.get(`http://localhost:8080/api/videos/tags?tags=${tags}`);
        
        if (res.data.length < 20){
            const random = await axios.get('http://localhost:8080/api/videos/random');

            // FILTER ID FOR UNIQUES KEYS 
            const moreVideos = res.data.concat(random.data).reduce((videos, video) =>{
                if (!videos.find(element => element._id == video._id) && video._id !== path) {
                    videos.push(video)
                }
                return videos;
            },[])

            setVideos(moreVideos);
        }
        else {
            setVideos(res.data);
        }
    }

    useEffect(() =>{
        fetchVideos();
    },[tags]);

  return (
    <Container>
        { videos.map((video) => (
            <Card key={video._id} video={video} type={'sm'}/>
        ))}
    </Container>
  )
}
