import styled from 'styled-components';
import logoImg from '../img/vite.svg';
import HomeIcon from '@mui/icons-material/Home';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import YouTubeIcon from '@mui/icons-material/YouTube';


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bg};
    height: 100vh;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
`;

const Wrapper = styled.div`
    padding: 18px 26px;
    
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px;
    &:hover{
        background-color: ${({theme}) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const Login = styled.div`

`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Title= styled.h2`
    font-size: 12px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 3px;
`;

export const Menu = ({darkMode, setDarkMode}) => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <Container>
        <Wrapper>
            <Link to='/' style={{textDecoraction:'none', color:'inherit'}}>
                <Logo>
                    <YouTubeIcon style={{fontSize:'3rem', color:'red'}} />VideoApp
                </Logo>
            </Link>
            <Link to='/' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <HomeOutlinedIcon/>
                Home
            </Item>
            </Link>
            <Link to='trends' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <LocalFireDepartmentOutlinedIcon/>
                Trend
            </Item>
            </Link>
            {currentUser ? (
            <Link to='subscriptions' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <SubscriptionsOutlinedIcon/>
                Subscriptions
            </Item>
            </Link>) : (
            <Link to='signin' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <HomeIcon/>
                Subscriptions
            </Item>
            </Link>
            )}
            { !currentUser &&
            <>
            <Hr/>
            <Login>
                Sing in to like videos, comment, and subscribe
                <Link to='/signin' style={{textDecoraction:'none', color:'inherit'}}>
                    <Button> <AccountCircleOutlinedIcon/> SIGN IN</Button>
                </Link>
            </Login>
            </>}
            <Hr/>
            <Title>BEST OF MNETUBE</Title>
            <Link to='/music' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <MusicNoteOutlinedIcon/>
                Music
            </Item>
            </Link>
            <Link to='/gaming' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <SportsEsportsOutlinedIcon/>
                Gaming
            </Item>
            </Link>
            <Link to='/sport' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <EmojiEventsOutlinedIcon/>
                Sport
            </Item>
            </Link>
            <Hr/>
            <Item>
                <HistoryOutlinedIcon/>
                History
            </Item>
            {currentUser && 
                <Link to={`/liked/${currentUser._id}`} style={{textDecoraction:'none', color:'inherit'}}>
                    <Item>
                        <ThumbUpIcon/>
                        Liked
                    </Item>
                </Link>}

            <Item onClick={() => setDarkMode(!darkMode)}>
                <Brightness4OutlinedIcon/>
                Theme
            </Item>
        </Wrapper>
    </Container>
  )
}
