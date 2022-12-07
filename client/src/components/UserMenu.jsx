import styled from 'styled-components';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice.js';


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bg};
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
    position: absolute;
    right: 0;
    width: 200px;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    padding: 18px 26px;
    
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px;
    width: 100%;
    border-radius: 3px;
    &:hover{
        background-color: ${({theme}) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  display: flex;
  align-content: center;
  object-fit: cover;
`;

export const UserMenu = ({darkMode, setDarkMode}) => {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    window.localStorage.removeItem('auth-token');
    dispatch(logout());
    navigate('/');
  };


  return (
    <Container>
        <Wrapper>
            <Link to='/' style={{textDecoraction:'none', color:'inherit'}}>
                <Logo>
                    <Avatar src={currentUser.img} />
                </Logo>
                <div style={{textAlign: 'center'}}>
                {currentUser.name}
                </div>
                <div style={{textAlign: 'center', wordWrap: 'break-word', marginTop:'2px'}}>
                {currentUser.email}
                </div>
            </Link>
            <Link to={`/channel/${currentUser._id}`} style={{textDecoraction:'none', color:'inherit'}}>
            <Hr/>
            <Item>
                <AccountCircleOutlinedIcon/>
                Your Channel
            </Item>
            </Link>
            <Link to='settings' style={{textDecoraction:'none', color:'inherit'}}>
            <Item>
                <SettingsSuggestOutlinedIcon/>
                Settings
            </Item>
            </Link>
            <Item onClick={() => setDarkMode(!darkMode)}>
                <Brightness4OutlinedIcon/>
                Theme
            </Item>
            <Hr/>
            <Item onClick={signOut}>
                  <LogoutOutlinedIcon /> Sign Out
            </Item>
        </Wrapper>
    </Container>
  )
}
