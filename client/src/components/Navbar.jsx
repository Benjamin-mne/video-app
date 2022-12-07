import styled from 'styled-components'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Upload } from './Upload.jsx';
import { UserMenu } from './UserMenu.jsx';


import { useOutsideClick } from './UseOutSideClick.jsx';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bg};
  height: 56px;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({theme}) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({theme}) => theme.text};
  width: 100%;
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #3ea6ff;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  object-fit: cover;
`;

export const Navbar = ({darkMode, setDarkMode}) => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const handleSearch = (e, type) => {
    if (q !== ''){
      if(type === 'key'){
        e.key === 'Enter' && navigate(`/search?q=${q}`);
      }

      if(type === 'button'){
        navigate(`/search?q=${q}`)
      }
    }
  }
  
  const blockScroll = () => {
    if(open){
      window.onscroll = function () { window.scrollTo(0, 0); };
      window.scrollTo(0, 0);
    }
    else {
      window.onscroll=function(){};
    }
  }


  const handleClickOutside = () => {
    setOpenUserMenu(false);
  }
  const ref = useOutsideClick(handleClickOutside);

  useEffect(() =>{
    blockScroll();
    
  },[open])

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search' onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => handleSearch(e, 'key')}>
          </Input>
          <SearchOutlinedIcon onClick={(e) => handleSearch(e, 'button')}/>
        </Search>
        {currentUser ? (
            <User ref={ref}>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} onClick={() => setOpenUserMenu(!openUserMenu)}/>
              {openUserMenu && 
              <UserMenu darkMode={darkMode} setDarkMode={setDarkMode}/>}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none"}}>
              <Button>
                <AccountCircleOutlinedIcon/>
                SIGN IN
              </Button>
            </Link>
          )}
      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  )
}
