import React, { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import QuestionList from './QuestionList'; // Import QuestionList

const PostPage = () => {
  const [postType, setPostType] = useState('article');

  const handlePostTypeChange = (e, { value }) => {
    setPostType(value);
  };

  return (
    <div>
      <h2>New Post</h2>
      <Form>
        <Form.Group inline>
          <label>Select Post Type: </label>
          <Form.Field>
            <Radio
              label='Question'
              name='postType'
              value='question'
              checked={postType === 'question'}
              onChange={handlePostTypeChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Article'
              name='postType'
              value='article'
              checked={postType === 'article'}
              onChange={handlePostTypeChange}
            />
          </Form.Field>
        </Form.Group>
        <h3>What do you want to ask or share?</h3>
        {postType === 'article' ? <ArticleForm /> : <QuestionForm />} {/* Conditionally show forms */}
      </Form>

      {postType === 'question' && <QuestionList />} {/* Show question list when "Question" is selected */}
    </div>
  );
};

export default PostPage;
