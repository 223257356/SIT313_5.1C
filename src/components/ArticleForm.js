import React from 'react';
import { Form, TextArea, Input, Button } from 'semantic-ui-react';

const ArticleForm = () => {
  return (
    <>
      <Form.Field>
        <label>Title</label>
        <Input placeholder='Enter a descriptive title' />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea placeholder='Enter a 1-paragraph abstract' />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea placeholder='Enter the full article text' />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <Input placeholder='Please add up to 3 tags to describe what your article is about e.g., Java' />
      </Form.Field>
      <Button type='submit'>Post</Button>
    </>
  );
};

export default ArticleForm;
