import React from 'react';
import { Form, TextArea, Input, Button } from 'semantic-ui-react';

const QuestionForm = () => {
  return (
    <>
      <Form.Field>
        <label>Title</label>
        <Input placeholder='Start your question with how, what, why, etc.' />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <TextArea placeholder='Describe your problem' />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input placeholder='Please add up to 3 tags to describe what your question is about e.g., Java' />
      </Form.Field>
      <Button type='submit'>Post</Button>
    </>
  );
};

export default QuestionForm;
