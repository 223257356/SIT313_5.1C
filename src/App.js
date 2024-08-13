import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import PostPage from './components/PostPage';

function App() {
  return (
    <div className="App">
      <Container>
        <PostPage /> 
      </Container>
    </div>
  );
}

export default App;
