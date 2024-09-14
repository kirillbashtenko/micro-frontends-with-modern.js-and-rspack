import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from '@modern-js/runtime/router';
import styled from '@modern-js/runtime/styled';

const Container = styled.div`
  font-size: 1.2em;
  color: #333;
`;

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const NavBar = styled.nav`
  margin-bottom: 20px;
  a {
    margin: 0 10px;
    color: #007acc;
    text-decoration: none;
  }
`;

const Contact: React.FC = () => {
  return <Container>Contact Page</Container>;
};

const Home: React.FC = () => {
  return <Container>Home Page</Container>;
};

const About: React.FC = () => {
  return <Container>About Page</Container>;
};

const App: React.FC = () => {
  return (
    <Router basename="mfe1">
      <AppContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
