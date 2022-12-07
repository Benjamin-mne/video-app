import styled, { ThemeProvider } from 'styled-components';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { darkTheme, lightTheme } from './utils/Theme';
import { useState } from 'react';

// Components
import { Menu } from './components/Menu';
import { Navbar } from './components/Navbar';


// Pages
import { Home } from './pages/Home';
import { Video } from './pages/Video';
import { Signin } from './pages/Signin';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { Channel } from './pages/Channel';
import { GetByTags } from './pages/GetByTags';
import { Liked } from './pages/Liked';

const Container = styled.div`
  display: flex;
  background-color: #181818;
`;

const Main = styled.div`
  background-color:  ${({theme}) => theme.bg};
  flex:7;
`;

const Wrapper = styled.div`
  padding: 0 22px 96px;
`;



function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Main>
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
              <Wrapper>
                <Routes>
                  <Route path='/' element={<Home type='random'/>}/>
                  <Route path='/trends' element={<Home type='trend'/>}/>
                  <Route path='/subscriptions' element={<Home type='sub'/>}/>
                  <Route path='/search' element={<Search/>}/>
                  
                  <Route path="video">
                  <Route path=":id" element={<Video/>} />
                  </Route>

                  <Route path="channel">
                  <Route path=":id" element={<Channel/>} />
                  </Route>

                  <Route path='/music' element={<GetByTags tags={'music'}/>}/>
                  <Route path='/gaming' element={<GetByTags tags={'gaming'}/>}/>
                  <Route path='/sport' element={<GetByTags tags={'sport'}/>}/>

                  <Route path='settings' element={<Settings/>}/>
                  <Route path='/signin' element={<Signin/>}/>

                  <Route path="liked">
                  <Route path=":id" element={<Liked/>} />
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>

  )
}

export default App
