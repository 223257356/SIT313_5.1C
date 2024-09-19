import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import PostPage from './components/PostPage';
import QuestionList from './components/QuestionList';
import QuestionDetails from './components/QuestionDetails';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<PostPage />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/:id" element={<QuestionDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
