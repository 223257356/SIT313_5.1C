import React, { useState } from 'react';
import { Form, TextArea, Input, Button } from 'semantic-ui-react';
import { firestore, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [articleText, setArticleText] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Function to handle image change
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        if (!image) {
            alert('Please select an image before submitting.');
            return;
        }

        setUploading(true);

        try {
            // Upload image to Firebase Storage
            const storageRef = ref(storage, `articles/${image.name}`); // Use ref from Firebase storage module
            await uploadBytes(storageRef, image); // Use uploadBytes to upload image
            const imageUrl = await getDownloadURL(storageRef); // Get the download URL
            // Convert comma-separated tags into an array
            const tagArray = tags.split(',').map(tag => tag.trim());

            // Save article data to Firestore
            await addDoc(collection(firestore, 'articles'), { // Use addDoc and collection
                title,
                abstract,
                articleText,
                tags: tagArray,
                imageUrl,
                createdAt: new Date()
            });

            alert('Article posted successfully');
        } catch (error) {
            console.error('Error posting article:', error);
            alert('Failed to post the article');
        }

        setUploading(false);
    };

    return (
        <>
          <Form.Field>
            <label>Title</label>
            <Input
              placeholder='Enter a descriptive title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Add an image:</label>
            <Input type='file' onChange={handleImageChange} />
          </Form.Field>
          <Form.Field>
            <label>Abstract</label>
            <TextArea
              placeholder='Enter a 1-paragraph abstract'
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Article Text</label>
            <TextArea
              placeholder='Enter the full article text'
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Tags (comma separated)</label>
            <Input
              placeholder='Please add up to 3 tags to describe what your article is about e.g., Java'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Field>
          <Button type='submit' onClick={handleSubmit} loading={uploading}>
            Post
          </Button>
        </>
    );
};

export default ArticleForm;
