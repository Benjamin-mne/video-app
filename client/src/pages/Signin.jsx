import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from 'react-router-dom';

// Firebase
import {provider, auth} from '../firebase.js'
import { signInWithPopup } from 'firebase/auth'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.bgLighter};
  border: 1px solid ${({theme}) => theme.soft};
  padding: 20px 50px ;
  gap: 10px;
`;

const Title  = styled.h1`
  font-size: 24px;
`;

const Subtitle  = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input  = styled.input`
  border: 1px solid ${({theme}) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({theme}) => theme.text};
`;

const Button  = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({theme}) => theme.soft};
  color: ${({theme}) => theme.textSoft};
`;

const More  = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({theme}) => theme.textSoft};
`;

const Links  = styled.div`
  margin-left: 50px;
`;

const Link  = styled.span`
  margin-left: 30px;
`;



export const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const setToken = (token) => {
    window.localStorage.setItem('auth-token', token);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signin", { name, password });
      dispatch(loginSuccess(res.data.userData));
      setToken(res.data.token);
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleClear = () => {
    inputRef.current.value = name;
    inputRef1.current.value = '';
    inputRef2.current.value = '';
    inputRef3.current.value = '';
  };

  const handleSingUp = async () => {
    try {
      const res = axios.post("http://localhost:8080/api/auth/signup",{
          name,
          email,
          password
      }).then( () => {
        handleClear();
      }
      )
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (currentUser){
      navigate('/');
    }
  },[currentUser])

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        axios.post('http://localhost:8080/api/auth/google',{
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL
        })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            setToken(res.data.token);
          })
      })
      .catch(err => {
        dispatch(loginFailure());
      });
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Subtitle>to continue to MneTube</Subtitle>
        <Input ref={inputRef} placeholder='username' onChange={(e) => setName(e.target.value)} ></Input>
        <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></Input>
        <Button onClick={handleLogin}>Sing in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Input ref={inputRef1} placeholder='username' onChange={(e) => setName(e.target.value)}></Input>
        <Input ref={inputRef2} placeholder='email' onChange={(e) => setEmail(e.target.value)}></Input>
        <Input ref={inputRef3} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></Input>
        <Button onClick={handleSingUp}>Sing up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}
